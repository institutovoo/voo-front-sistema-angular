import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Logger } from '../utils/logger';
import { AutenticacaoService } from '../service/autenticacao.service';

export const loggerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AutenticacaoService);
  const startTime = Date.now();
  const url = req.url;
  const method = req.method;
  const usuario = authService.usuarioLogado();
  
  // Identifica se é uma chamada para Lambda/API
  const isApiCall = url.includes('execute-api') || url.includes('amazonaws.com') || url.startsWith('/api');
  const context = isApiCall ? 'LambdaAPI' : 'HTTP';

  // Log de início da requisição (Audit)
  if (isApiCall) {
    Logger.audit(`Chamando ${method} ${url}`, context, {
      usuario: usuario ? { id: usuario.id, email: usuario.email, perfil: usuario.perfilAtual } : 'Anônimo',
      params: req.params.keys().length > 0 ? req.params.toString() : undefined,
      body: method !== 'GET' ? req.body : undefined
    });
  }

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          const duration = Date.now() - startTime;
          if (isApiCall) {
            Logger.audit(`Resposta ${method} ${url} - Status: ${event.status} (${duration}ms)`, context, {
              status: event.status,
              duration: `${duration}ms`
            });
          }
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const duration = Date.now() - startTime;
      Logger.error(`Falha na requisição ${method} ${url} (${duration}ms)`, context, {
        status: error.status,
        message: error.message,
        error: error.error,
        duration: `${duration}ms`
      });
      return throwError(() => error);
    })
  );
};
