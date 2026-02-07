import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from './base-api';

@Injectable({
  providedIn: 'root',
})
export class VideoApi {
  private http = inject(HttpClient);
  private readonly API_URL = API_CONFIG.BASE_URL;

  obterVideos(): Observable<any> {
    return this.http.get(`${this.API_URL}/video`);
  }

  uploadVideo(dados: any): Observable<any> {
    return this.http.post(`${this.API_URL}/video`, dados);
  }
}
