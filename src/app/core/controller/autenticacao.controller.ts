import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../service/autenticacao.service';
import { CadastroRequest, LoginRequest, AuthResponse } from '../model/autenticacao.model';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoController {
  private service = inject(AutenticacaoService);
  private router = inject(Router);

  get usuarioLogado() {
    return this.service.usuarioLogado;
  }

  async login(dados: LoginRequest): Promise<{ sucesso: boolean; mensagem?: string }> {
    try {
      console.log('[AutenticacaoController] Iniciando tentativa de login para:', dados.cpf_cnpj);
      return new Promise((resolve) => {
        this.service.login(dados).subscribe({
          next: (response: AuthResponse) => {
            console.log('[AutenticacaoController] Resposta da API recebida:', response);
            if (response.sucesso) {
              console.log('[AutenticacaoController] Login bem-sucedido! Redirecionando...');
              this.router.navigate(['/']);
              resolve({ sucesso: true });
            } else {
              console.warn('[AutenticacaoController] Falha no login:', response.mensagem);
              resolve({ sucesso: false, mensagem: response.mensagem || 'Erro ao realizar login' });
            }
          },
          error: (err: any) => {
            console.error('[AutenticacaoController] Erro de rede ou servidor ao logar:', err);
            resolve({ sucesso: false, mensagem: 'Erro de conexão ou credenciais inválidas' });
          }
        });
      });
    } catch (error) {
      console.error('[AutenticacaoController] Erro inesperado no método login:', error);
      return { sucesso: false, mensagem: 'Erro inesperado' };
    }
  }

  async cadastrar(dados: CadastroRequest): Promise<{ sucesso: boolean; mensagem?: string }> {
    console.log('[AutenticacaoController] Iniciando cadastro para:', dados.cpf_cnpj);
    return new Promise((resolve) => {
      this.service.cadastrar(dados).subscribe({
        next: (response: AuthResponse) => {
          console.log('[AutenticacaoController] Resposta do cadastro:', response);
          if (response.sucesso || (response as any).id) {
            console.log('[AutenticacaoController] Cadastro OK. Redirecionando para login em 2s...');
            setTimeout(() => this.router.navigate(['/autenticacao/login']), 2000);
            resolve({ sucesso: true, mensagem: 'Cadastro realizado com sucesso! Redirecionando...' });
          } else {
            console.warn('[AutenticacaoController] Falha no cadastro:', response.mensagem);
            resolve({ sucesso: false, mensagem: response.mensagem || 'Erro ao realizar cadastro' });
          }
        },
        error: (err: any) => {
          console.error('[AutenticacaoController] Erro de rede ou servidor ao cadastrar:', err);
          resolve({ sucesso: false, mensagem: 'Erro ao realizar cadastro. Tente novamente.' });
        }
      });
    });
  }

  async esqueciSenha(email: string): Promise<{ sucesso: boolean; mensagem?: string }> {
    console.log('[AutenticacaoController] Solicitando recuperação de senha para:', email);
    return new Promise((resolve) => {
      this.service.esqueciSenha(email).subscribe({
        next: (response: AuthResponse) => {
          console.log('[AutenticacaoController] Resposta da recuperação:', response);
          resolve({ 
            sucesso: true, 
            mensagem: response.mensagem || 'Se o e-mail estiver cadastrado, você receberá instruções.' 
          });
        },
        error: (err: any) => {
          console.error('[AutenticacaoController] Erro ao solicitar recuperação:', err);
          resolve({ sucesso: false, mensagem: 'Erro ao solicitar recuperação. Tente novamente.' });
        }
      });
    });
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/autenticacao/login']);
  }
}
