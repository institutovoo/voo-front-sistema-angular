import {
  HttpInterceptorFn,
  HttpResponse,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

function normalizeSuccessBody(body: any) {
  if (
    body &&
    typeof body === 'object' &&
    ('sucesso' in body || 'mensagem' in body || 'dados' in body)
  ) {
    return body;
  }

  return { sucesso: true, dados: body };
}

function normalizeErrorBody(error: any) {
  // Se já for um objeto normalizado pelo nosso padrão, retorna
  if (error && typeof error === 'object' && 'sucesso' in error && 'mensagem' in error) {
    return error;
  }

  let mensagem = 'Erro na requisição';
  let dados = null;

  // Extração de mensagem de um HttpErrorResponse (Angular) ou objeto similar
  const errorBody = error.error || error;
  
  if (errorBody && typeof errorBody === 'object') {
    mensagem = errorBody.mensagem || errorBody.message || error.message || mensagem;
    dados = errorBody.dados || errorBody;
  } else if (typeof errorBody === 'string') {
    try {
      const parsed = JSON.parse(errorBody);
      mensagem = parsed.mensagem || parsed.message || mensagem;
      dados = parsed.dados || parsed;
    } catch (e) {
      mensagem = errorBody || mensagem;
    }
  } else {
    mensagem = error.message || mensagem;
  }

  // Limpeza de mensagens genéricas do Angular para erros 400
  if (mensagem.includes('Http failure response') && error.status === 400) {
    mensagem = 'Dados inválidos ou credenciais incorretas.';
  }

  return { sucesso: false, mensagem, dados, status: error.status };
}

export const responseNormalizerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  // Só normaliza se for uma chamada para a nossa API
  const isApiCall =
    req.url.includes('execute-api') || req.url.includes('amazonaws.com') || req.url.startsWith('/api');

  if (!isApiCall) {
    return next(req);
  }

  return next(req).pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        const normalized = normalizeSuccessBody(event.body);
        return event.clone({ body: normalized });
      }
      return event;
    }),
    catchError((err) => {
      const normalized = normalizeErrorBody(err);
      return throwError(() => normalized);
    }),
  );
};
