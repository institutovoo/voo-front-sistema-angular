import { Injectable, inject, signal } from '@angular/core';
import { AutenticacaoApi } from '../api/autenticacao-api.service';
import { CadastroRequest, LoginRequest, Usuario, AuthResponse } from '../model/autenticacao.model';
import { tap } from 'rxjs/operators';
import { lerJsonDoStorage, salvarJsonNoStorage } from '../utils/armazenamento';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private api = inject(AutenticacaoApi);

  usuarioLogado = signal<Usuario | null>(lerJsonDoStorage<Usuario | null>('usuario', null));

  cadastrar(dados: CadastroRequest) {
    return this.api.cadastrar(dados);
  }

  login(dados: LoginRequest) {
    return this.api.login(dados).pipe(
      tap((response: AuthResponse) => {
        if (response.sucesso && response.token && response.usuario) {
          localStorage.setItem('token', response.token);
          salvarJsonNoStorage('usuario', response.usuario);
          this.usuarioLogado.set(response.usuario);
        }
      })
    );
  }

  esqueciSenha(email: string) {
    return this.api.esqueciSenha({ email });
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
