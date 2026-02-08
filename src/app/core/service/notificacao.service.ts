import { Injectable, inject } from '@angular/core';
import { NotificacaoApi } from '../api/notificacao-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificacaoService {
  private api = inject(NotificacaoApi);

  enviarEmail(payload: {
    email: string;
    assunto: string;
    template?: string;
    dados?: any;
  }): Observable<any> {
    return this.api.enviarEmail(payload);
  }

  obterStatus(): Observable<any> {
    return this.api.obterStatus();
  }
}
