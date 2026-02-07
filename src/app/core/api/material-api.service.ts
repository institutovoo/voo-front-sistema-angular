import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class MaterialApi {
  private http = inject(HttpClient);
  private readonly API_URL = API_CONFIG.BASE_URL;

  listarMateriais(): Observable<any> {
    return this.http.get(`${this.API_URL}/materiais`);
  }

  criarMaterial(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/materiais`, dados);
  }
}
