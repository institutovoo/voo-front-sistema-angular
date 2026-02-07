import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class AulaApi {
  private http = inject(HttpClient);
  private readonly API_URL = API_CONFIG.BASE_URL;

  listarAulas(): Observable<any> {
    return this.http.get(`${this.API_URL}/aulas`);
  }

  obterAula(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/aulas/${id}`);
  }

  criarAula(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/aulas`, dados);
  }

  atualizarAula(id: string, dados: any): Observable<any> {
    return this.http.put(`${this.API_URL}/aulas/${id}`, dados);
  }

  excluirAula(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/aulas/${id}`);
  }
}
