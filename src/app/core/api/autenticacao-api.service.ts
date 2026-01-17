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
}
