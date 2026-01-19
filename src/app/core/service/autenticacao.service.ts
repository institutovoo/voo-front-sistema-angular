import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AutenticacaoApi } from '../api/autenticacao-api.service';
import {
  CadastroRequest,
  LoginRequest,
  Usuario,
  AuthResponse,
  TipoConta,
} from '../model/autenticacao.model';
import { tap, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertaService } from './alerta.service';
import { Logger } from '../utils/logger';
import { fromEvent, merge, timer, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private api = inject(AutenticacaoApi);
  private router = inject(Router);
  private alertaService = inject(AlertaService);
  private platformId = inject(PLATFORM_ID);

  usuarioLogado = signal<Usuario | null>(this.obterUsuarioInicial());
  private inatividadeSub?: Subscription;
  private timerInatividade?: any;
  private readonly TEMPO_INATIVIDADE = 30 * 60 * 1000; // 30 minutos em ms

  perfilAtual = computed(() => {
    const usuario = this.usuarioLogado();
    return usuario?.perfilAtual || usuario?.indicador_tipo_conta || null;
  });

  constructor() {
    // Se o usuário já estiver logado e for uma sessão temporária, inicia o timer
    if (this.estaLogado() && !localStorage.getItem('token')) {
      this.iniciarMonitoramentoInatividade();
    }
  }

  private obterUsuarioInicial(): Usuario | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const raw = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');
    if (!raw) return null;

    try {
      const usuario = JSON.parse(raw) as Usuario;
      if (usuario && !usuario.perfilAtual) {
        usuario.perfilAtual = usuario.indicador_tipo_conta;
        if (!usuario.perfis) {
          usuario.perfis = [usuario.indicador_tipo_conta];
        }
      }
      return usuario;
    } catch {
      return null;
    }
  }

  cadastrar(dados: CadastroRequest) {
    return this.api.cadastrar(dados);
  }

  login(dados: LoginRequest) {
    Logger.info(`Iniciando tentativa de login`, 'Auth', { identificador: dados.identificador });
    return this.api.login(dados).pipe(
      tap((response: AuthResponse) => {
        if (response.sucesso && response.token && response.usuario) {
          const usuario = response.usuario;
          const manterConectado = !!dados.lembrar;

          if (!usuario.perfis || usuario.perfis.length === 0) {
            usuario.perfis = [usuario.indicador_tipo_conta];
          }
          usuario.perfilAtual = usuario.indicador_tipo_conta;

          // Define onde salvar baseado no "Manter conectado"
          const storage = manterConectado ? localStorage : sessionStorage;
          
          storage.setItem('token', response.token);
          storage.setItem('usuario', JSON.stringify(usuario));
          
          this.usuarioLogado.set(usuario);

          if (!manterConectado) {
            this.iniciarMonitoramentoInatividade();
          } else {
            this.pararMonitoramentoInatividade();
          }

          if (usuario.primeiroLogin) {
            this.router.navigate(['/troca-senha-obrigatoria']);
            return;
          }
          
          Logger.audit(`Usuário logado com sucesso`, 'Auth', { 
            id: usuario.id, 
            email: usuario.email, 
            perfil: usuario.perfilAtual,
            manterConectado
          });
        } else {
          Logger.warn(`Falha na tentativa de login`, 'Auth', { 
            identificador: dados.identificador, 
            mensagem: response.mensagem 
          });
        }
      }),
    );
  }

  private iniciarMonitoramentoInatividade() {
    this.pararMonitoramentoInatividade();

    // Eventos que indicam atividade do usuário
    const atividade$ = merge(
      fromEvent(document, 'click'),
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'keydown'),
      fromEvent(document, 'scroll'),
      fromEvent(document, 'touchstart')
    );

    this.inatividadeSub = atividade$.subscribe(() => {
      this.resetarTimerInatividade();
    });

    // Inicia o primeiro timer
    this.resetarTimerInatividade();
  }

  private resetarTimerInatividade() {
    if (this.timerInatividade) {
      clearTimeout(this.timerInatividade);
    }

    this.timerInatividade = setTimeout(() => {
      if (this.estaLogado() && !localStorage.getItem('token')) {
        Logger.warn('Sessão encerrada por inatividade', 'Auth');
        this.alertaService.aviso('Sessão encerrada por inatividade. Por favor, faça login novamente.');
        this.logout();
      }
    }, this.TEMPO_INATIVIDADE);
  }

  private pararMonitoramentoInatividade() {
    if (this.inatividadeSub) {
      this.inatividadeSub.unsubscribe();
      this.inatividadeSub = undefined;
    }
    if (this.timerInatividade) {
      clearTimeout(this.timerInatividade);
      this.timerInatividade = undefined;
    }
  }

  alternarPerfil(perfil: TipoConta) {
    const usuario = this.usuarioLogado();
    if (usuario && usuario.perfis.includes(perfil)) {
      const perfilAntigo = usuario.perfilAtual;
      usuario.perfilAtual = perfil;
      
      const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
      storage.setItem('usuario', JSON.stringify(usuario));
      
      this.usuarioLogado.set({ ...usuario });

      Logger.audit(`Usuário alterou o perfil ativo`, 'Auth', { 
        id: usuario.id, 
        email: usuario.email, 
        perfilAntigo, 
        perfilNovo: perfil 
      });

      this.redirecionarParaDashboard(perfil);
    }
  }

  adicionarPerfil(perfil: TipoConta, dadosExtras?: any) {
    const usuario = this.usuarioLogado();
    if (!usuario) return;

    const precisaAprovacao = perfil.includes('Instrutor') && usuario.indicador_tipo_conta !== 'Admin';

    if (precisaAprovacao) {
      this.api.solicitarPerfil({
        cpf_cnpj: usuario.cpf_cnpj,
        perfil: perfil,
        dadosExtras: dadosExtras
      }).subscribe(response => {
        if (response.sucesso) {
          this.alertaService.info('Sua solicitação para ser instrutor foi enviada para análise do administrador.', 'Solicitação Enviada');
        } else {
          this.alertaService.erro(response.mensagem || 'Erro ao enviar solicitação.');
        }
      });
      return;
    }

    if (!usuario.perfis.includes(perfil)) {
      this.api
        .adicionarPerfil({
          cpf_cnpj: usuario.cpf_cnpj,
          perfil: perfil,
          dadosExtras: dadosExtras,
        })
        .subscribe((response) => {
          if (response.sucesso && response.usuario) {
            const usuarioAtualizado = response.usuario;
            usuarioAtualizado.perfilAtual = perfil;
            
            const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
            storage.setItem('usuario', JSON.stringify(usuarioAtualizado));

            this.usuarioLogado.set({ ...usuarioAtualizado });
            this.redirecionarParaDashboard(perfil);
            this.alertaService.sucesso('Perfil adicionado com sucesso!');
          } else {
            this.alertaService.erro(response.mensagem || 'Erro ao adicionar novo perfil.');
          }
        });
    }
  }

  private redirecionarParaDashboard(perfil: TipoConta) {
    if (perfil === 'Admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (perfil.toLowerCase().includes('instrutor')) {
      this.router.navigate(['/instrutor/dashboard']);
    } else {
      this.router.navigate(['/aluno/dashboard']);
    }
  }

  esqueciSenha(email: string) {
    return this.api.esqueciSenha({ email });
  }

  resetSenha(dados: { email: string; codigo: string; novaSenha: string }) {
    return this.api.resetSenha(dados);
  }

  alterarSenhaObrigatoria(novaSenha: string) {
    const usuario = this.usuarioLogado();
    if (!usuario) return;

    return this.api.alterarSenhaObrigatoria({
      cpf_cnpj: usuario.cpf_cnpj,
      novaSenha
    }).pipe(
      tap(response => {
        if (response.sucesso) {
          usuario.primeiroLogin = false;
          const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
          storage.setItem('usuario', JSON.stringify(usuario));
          this.usuarioLogado.set({ ...usuario });
        }
      })
    );
  }

  logout() {
    const usuario = this.usuarioLogado();
    if (usuario) {
      Logger.audit(`Usuário realizou logout`, 'Auth', { 
        id: usuario.id, 
        email: usuario.email 
      });
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    
    this.usuarioLogado.set(null);
    this.pararMonitoramentoInatividade();
    this.router.navigate(['/autenticacao/login']);
  }

  estaLogado(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }
}
