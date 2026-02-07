import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class ProvaApi {
  private http = inject(HttpClient);
  private readonly API_URL = API_CONFIG.BASE_URL;

  listarProvas(): Observable<any> {
    return this.http.get(`${this.API_URL}/provas`);
  }

  criarProva(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/provas`, dados);
  }

  obterProvasPorCurso(idCurso: string): Observable<any> {
    return this.http.get(`${this.API_URL}/provas/curso/${idCurso}`);
  }

  atualizarProvaPorCurso(idCurso: string, dados: any): Observable<any> {
    return this.http.put(`${this.API_URL}/provas/curso/${idCurso}`, dados);
  }

  excluirProvaPorCurso(idCurso: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/provas/curso/${idCurso}`);
  }
}
