import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class CursoApi {
  private http = inject(HttpClient);
  private readonly API_URL = API_CONFIG.BASE_URL;

  listarCursos(): Observable<any> {
    return this.http.get(`${this.API_URL}/cursos`);
  }

  obterCurso(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/cursos/${id}`);
  }

  criarCurso(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/cursos`, dados);
  }

  atualizarCurso(id: string, dados: any): Observable<any> {
    return this.http.put(`${this.API_URL}/cursos/${id}`, dados);
  }

  excluirCurso(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/cursos/${id}`);
  }

  // Endpoints com prefixo /curso
  obterCursoSingular(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/curso/${id}`);
  }

  atualizarCursoSingular(id: string, dados: any): Observable<any> {
    return this.http.put(`${this.API_URL}/curso/${id}`, dados);
  }

  excluirCursoSingular(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/curso/${id}`);
  }

  // Hierarquia de Aulas dentro de Cursos
  listarAulasDoCurso(idCurso: string): Observable<any> {
    return this.http.get(`${this.API_URL}/cursos/${idCurso}/aulas`);
  }

  obterAulaDoCurso(idCurso: string, idAula: string): Observable<any> {
    return this.http.get(`${this.API_URL}/cursos/${idCurso}/aulas/${idAula}`);
  }

  criarAulaNoCurso(idCurso: string, dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/cursos/${idCurso}/aulas`, dados);
  }

  atualizarAulaNoCurso(idCurso: string, idAula: string, dados: any): Observable<any> {
    return this.http.put(`${this.API_URL}/cursos/${idCurso}/aulas/${idAula}`, dados);
  }

  excluirAulaNoCurso(idCurso: string, idAula: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/cursos/${idCurso}/aulas/${idAula}`);
  }

  // Vídeos e Materiais
  obterVideoDaAula(idCurso: string, idAula: string): Observable<any> {
    return this.http.get(`${this.API_URL}/cursos/${idCurso}/aulas/${idAula}/video`);
  }

  vincularVideoAAula(idCurso: string, idAula: string, dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/cursos/${idCurso}/aulas/${idAula}/video`, dados);
  }

  listarMateriaisDaAula(idCurso: string, idAula: string): Observable<any> {
    return this.http.get(`${this.API_URL}/cursos/${idCurso}/aulas/${idAula}/materiais`);
  }

  adicionarMaterialAAula(idCurso: string, dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/cursos/${idCurso}/aulas/${dados.idAula}/materiais`, dados);
  }
}
