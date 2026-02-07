import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './base-api';
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
  private readonly API_URL = API_CONFIG.BASE_URL;

  cadastrar(dados: CadastroRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/usuarios`, dados);
  }

  login(dados: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, dados);
  }

  esqueciSenha(dados: EsqueciSenhaRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/esqueci-senha`, dados);
  }

  resetSenha(dados: ResetSenhaRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/reset-senha`, dados);
  }

  me(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.API_URL}/me`);
  }

  adicionarPerfil(dados: {
    cpf_cnpj: string;
    perfil: string;
    dadosExtras?: any;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/perfil`, dados);
  }

  solicitarPerfil(dados: {
    cpf_cnpj: string;
    perfil: string;
    dadosExtras?: any;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/solicitar-perfil`, dados);
  }

  listarSolicitacoes(): Observable<{ sucesso: boolean; solicitacoes: any[] }> {
    return this.http.get<{ sucesso: boolean; solicitacoes: any[] }>(
      `${this.API_URL}/solicitacoes`,
    );
  }

  decidirSolicitacao(dados: {
    id: string;
    decisao: 'aprovado' | 'rejeitado';
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/decidir-solicitacao`, dados);
  }

  bloquearUsuario(dados: { cpf_cnpj: string; motivo: string }): Observable<AuthResponse> {
    return this.http.patch<AuthResponse>(`${this.API_URL}/status`, {
      cpf_cnpj: dados.cpf_cnpj,
      status: 'bloqueado',
      motivo: dados.motivo,
    });
  }

  desbloquearUsuario(cpf_cnpj: string): Observable<AuthResponse> {
    return this.http.patch<AuthResponse>(`${this.API_URL}/status`, {
      cpf_cnpj,
      status: 'ativo',
    });
  }

  excluirUsuario(cpf_cnpj: string): Observable<AuthResponse> {
    return this.http.delete<AuthResponse>(`${this.API_URL}/usuarios`, {
      body: { cpf_cnpj },
    });
  }

  listarUsuarios(): Observable<{ sucesso: boolean; usuarios: any[] }> {
    return this.http.get<{ sucesso: boolean; usuarios: any[] }>(`${this.API_URL}/usuarios`);
  }

  alterarSenha(dados: { cpf_cnpj: string; novaSenha: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/alterar-senha`, dados);
  }
}
