import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const platformId = inject(PLATFORM_ID);
  
  // Só executa no browser para acessar localStorage/sessionStorage
  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    
    // Se tiver token e for uma chamada para a nossa API
    const isApiCall = req.url.includes('execute-api') || req.url.includes('amazonaws.com');
    
    if (token && isApiCall) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }
  }

  return next(req);
};
