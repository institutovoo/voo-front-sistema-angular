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

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private api = inject(AutenticacaoApi);
  private router = inject(Router);

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
        }
      }),
    );
  }

  alternarPerfil(perfil: TipoConta) {
    const usuario = this.usuarioLogado();
    if (usuario && usuario.perfis.includes(perfil)) {
      usuario.perfilAtual = perfil;
      salvarJsonNoStorage('usuario', usuario);
      this.usuarioLogado.set({ ...usuario });

      // Redireciona para o dashboard do novo perfil
      this.redirecionarParaDashboard(perfil);
    }
  }

  adicionarPerfil(perfil: TipoConta, dadosExtras?: any) {
    const usuario = this.usuarioLogado();
    if (usuario && !usuario.perfis.includes(perfil)) {
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
          } else {
            alert(response.mensagem || 'Erro ao adicionar novo perfil.');
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuarioLogado.set(null);
  }

  estaLogado(): boolean {
    return !!localStorage.getItem('token');
  }
}
