import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AuthResponse,
  CadastroRequest,
  EsqueciSenhaRequest,
  LoginRequest,
  ResetSenhaRequest,
} from '../model/autenticacao.model';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoApi {
  private http = inject(HttpClient);
  private readonly API_URL = 'https://5axe4j6ztxumduquhtim6icgg40tlimo.lambda-url.us-east-1.on.aws';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  cadastrar(dados: CadastroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios`, dados, {
      headers: this.getHeaders(),
    });
  }

  login(dados: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios/login`, dados, {
      headers: this.getHeaders(),
    });
  }

  esqueciSenha(dados: EsqueciSenhaRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios/esqueci-senha`, dados, {
      headers: this.getHeaders(),
    });
  }

  resetSenha(dados: ResetSenhaRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios/reset-senha`, dados, {
      headers: this.getHeaders(),
    });
  }

  me(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.API_URL}/usuarios/me`, {
      headers: this.getHeaders(),
    });
  }

  adicionarPerfil(dados: { cpf_cnpj: string; perfil: string; dadosExtras?: any }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios/perfil`, dados, {
      headers: this.getHeaders(),
    });
  }

  solicitarPerfil(dados: { cpf_cnpj: string; perfil: string; dadosExtras?: any }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios/solicitar-perfil`, dados, {
      headers: this.getHeaders(),
    });
  }

  listarSolicitacoes(): Observable<{ sucesso: boolean; solicitacoes: any[] }> {
    return this.http.get<{ sucesso: boolean; solicitacoes: any[] }>(`${this.API_URL}/usuarios/solicitacoes`, {
      headers: this.getHeaders(),
    });
  }

  decidirSolicitacao(dados: { id: string; decisao: 'aprovado' | 'rejeitado' }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios/decidir-solicitacao`, dados, {
      headers: this.getHeaders(),
    });
  }

  bloquearUsuario(dados: { cpf_cnpj: string; motivo: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios/bloquear`, dados, {
      headers: this.getHeaders(),
    });
  }

  desbloquearUsuario(cpf_cnpj: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios/desbloquear`, { cpf_cnpj }, {
      headers: this.getHeaders(),
    });
  }

  excluirUsuario(cpf_cnpj: string): Observable<AuthResponse> {
    return this.http.delete<AuthResponse>(`${this.API_URL}/usuarios`, {
      headers: this.getHeaders(),
      body: { cpf_cnpj }
    });
  }

  listarUsuarios(): Observable<{ sucesso: boolean; usuarios: any[] }> {
    return this.http.get<{ sucesso: boolean; usuarios: any[] }>(`${this.API_URL}/usuarios`, {
      headers: this.getHeaders(),
    });
  }
}
