import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AutenticacaoService } from '../service/autenticacao.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AutenticacaoService);
  const router = inject(Router);

  if (authService.estaLogado()) {
    return true;
  }

  // Se não estiver logado (sem token), redireciona para o login
  router.navigate(['/login']);
  return false;
};
