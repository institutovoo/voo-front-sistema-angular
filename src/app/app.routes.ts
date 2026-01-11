import { Routes } from '@angular/router';

export const routes: Routes = [
  // ========================================
  // PÁGINAS PÚBLICAS
  // ========================================
  {
    path: '',
    title: 'Institucional',
    loadComponent: () =>
      import('./pages/institucional/institucional.component').then((m) => m.InstitucionalComponent),
  },

  // ========================================
  // AUTENTICAÇÃO
  // ========================================
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./pages/autenticacao/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'cadastro',
    title: 'Cadastro',
    loadComponent: () =>
      import('./pages/autenticacao/cadastro/cadastro.component').then((m) => m.CadastroComponent),
  },
  {
    path: 'esqueci-senha',
    title: 'Recuperar Senha',
    loadComponent: () =>
      import('./pages/autenticacao/esqueci-senha/esqueci-senha.component').then(
        (m) => m.EsqueciSenhaComponent
      ),
  },
  {
    path: 'admin/login',
    title: 'Login Administrativo',
    loadComponent: () =>
      import('./pages/autenticacao/admin-login/admin-login.component').then(
        (m) => m.AdminLoginComponent
      ),
  },

  // ========================================
  // SISTEMA - ALUNO
  // ========================================
  {
    path: 'aluno',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./pages/sistema/aluno/dashboard/dashboard.component').then(
            (m) => m.AlunoDashboardComponent
          ),
      },
      {
        path: 'configuracoes',
        title: 'Configurações',
        loadComponent: () =>
          import('./pages/sistema/aluno/configuracoes/configuracoes.component').then(
            (m) => m.ConfiguracoesComponent
          ),
      },
      {
        path: 'certificados',
        title: 'Meus Certificados',
        loadComponent: () =>
          import('./pages/sistema/aluno/certificados/certificados.component').then(
            (m) => m.CertificadosComponent
          ),
      },
    ],
  },
];
