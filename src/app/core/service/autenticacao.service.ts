import { Injectable, inject, signal, computed } from '@angular/core';
import { AutenticacaoApi } from '../api/autenticacao-api.service';
import {
  CadastroRequest,
  LoginRequest,
  Usuario,
  AuthResponse,
  TipoConta,
} from '../model/autenticacao.model';
import { tap } from 'rxjs/operators';
import { lerJsonDoStorage, salvarJsonNoStorage } from '../utils/armazenamento';
import { Router } from '@angular/router';
import { AlertaService } from './alerta.service';
import { Logger } from '../utils/logger';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private api = inject(AutenticacaoApi);
  private router = inject(Router);
  private alertaService = inject(AlertaService);

  usuarioLogado = signal<Usuario | null>(this.obterUsuarioInicial());

  perfilAtual = computed(() => {
    const usuario = this.usuarioLogado();
    return usuario?.perfilAtual || usuario?.indicador_tipo_conta || null;
  });

  private obterUsuarioInicial(): Usuario | null {
    const usuario = lerJsonDoStorage<Usuario | null>('usuario', null);
    if (usuario && !usuario.perfilAtual) {
      usuario.perfilAtual = usuario.indicador_tipo_conta;
      if (!usuario.perfis) {
        usuario.perfis = [usuario.indicador_tipo_conta];
      }
    }
    return usuario;
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

          // Inicializa perfis se não vierem do back
          if (!usuario.perfis || usuario.perfis.length === 0) {
            usuario.perfis = [usuario.indicador_tipo_conta];
          }

          // Sempre loga com o primeiro perfil que ele recebeu
          usuario.perfilAtual = usuario.indicador_tipo_conta;

          localStorage.setItem('token', response.token);
          salvarJsonNoStorage('usuario', usuario);
          this.usuarioLogado.set(usuario);

          if (usuario.primeiroLogin) {
            this.router.navigate(['/troca-senha-obrigatoria']);
            return;
          }
          
          Logger.audit(`Usuário logado com sucesso`, 'Auth', { 
            id: usuario.id, 
            email: usuario.email, 
            perfil: usuario.perfilAtual 
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

  alternarPerfil(perfil: TipoConta) {
    const usuario = this.usuarioLogado();
    if (usuario && usuario.perfis.includes(perfil)) {
      const perfilAntigo = usuario.perfilAtual;
      usuario.perfilAtual = perfil;
      salvarJsonNoStorage('usuario', usuario);
      this.usuarioLogado.set({ ...usuario });

      Logger.audit(`Usuário alterou o perfil ativo`, 'Auth', { 
        id: usuario.id, 
        email: usuario.email, 
        perfilAntigo, 
        perfilNovo: perfil 
      });

      // Redireciona para o dashboard do novo perfil
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
            
            salvarJsonNoStorage('usuario', usuarioAtualizado);
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
          salvarJsonNoStorage('usuario', usuario);
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
    this.usuarioLogado.set(null);
  }

  estaLogado(): boolean {
    return !!localStorage.getItem('token');
  }
}
