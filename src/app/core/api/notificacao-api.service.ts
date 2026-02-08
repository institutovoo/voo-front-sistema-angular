import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoApi {
  private http = inject(HttpClient);
  private readonly API_URL = API_CONFIG.BASE_URL;

  enviarEmail(dados: {
    email: string;
    assunto: string;
    template?: string;
    dados?: any;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/emails`, dados);
  }

  obterStatus(): Observable<any> {
    return this.http.get(`${this.API_URL}/status`);
  }
}
