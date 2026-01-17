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
  {
    path: 'instrutores',
    title: 'Institucional - Instrutores',
    loadComponent: () =>
      import('./pages/institucional-instrutor/institucional-instrutor.component').then(
        (m) => m.InstitucionalInstrutorComponent
      ),
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
      {
        path: 'meus-cursos',
        title: 'Meus Cursos',
        loadComponent: () =>
          import('./pages/sistema/aluno/meus-cursos/meus-cursos.component').then(
            (m) => m.MeusCursosComponent
          ),
      },
      {
        path: 'loja',
        title: 'Loja de Cursos',
        loadComponent: () =>
          import('./pages/sistema/aluno/loja-cursos/loja-cursos.component').then(
            (m) => m.LojaCursosComponent
          ),
      },
      {
        path: 'curso/:id',
        title: 'Detalhes do Curso',
        loadComponent: () =>
          import('./pages/sistema/aluno/curso-detalhe/curso-detalhe.component').then(
            (m) => m.CursoDetalheComponent
          ),
      },
      {
        path: 'curso/:id/aula/:aulaId',
        title: 'Aula',
        loadComponent: () =>
          import('./pages/sistema/aluno/curso-player/curso-player.component').then(
            (m) => m.CursoPlayerComponent
          ),
      },
      {
        path: 'prova/:id',
        title: 'Prova',
        loadComponent: () =>
          import('./pages/sistema/aluno/prova/prova.component').then((m) => m.ProvaComponent),
      },
    ],
  },

  // ========================================
  // SISTEMA - INSTRUTOR
  // ========================================
  {
    path: 'instrutor',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard do Instrutor',
        loadComponent: () =>
          import('./pages/sistema/instrutor/dashboard/dashboard.component').then(
            (m) => m.InstrutorDashboardComponent
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
    ],
  },
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
      {
        path: 'meus-cursos',
        title: 'Meus Cursos',
        loadComponent: () =>
          import('./pages/sistema/aluno/meus-cursos/meus-cursos.component').then(
            (m) => m.MeusCursosComponent
          ),
      },
      {
        path: 'loja',
        title: 'Loja de Cursos',
        loadComponent: () =>
          import('./pages/sistema/aluno/loja-cursos/loja-cursos.component').then(
            (m) => m.LojaCursosComponent
          ),
      },
      {
        path: 'curso/:id',
        title: 'Detalhes do Curso',
        loadComponent: () =>
          import('./pages/sistema/aluno/curso-detalhe/curso-detalhe.component').then(
            (m) => m.CursoDetalheComponent
          ),
      },
      {
        path: 'curso/:id/aula/:aulaId',
        title: 'Aula',
        loadComponent: () =>
          import('./pages/sistema/aluno/curso-player/curso-player.component').then(
            (m) => m.CursoPlayerComponent
          ),
      },
      {
        path: 'prova/:id',
        title: 'Prova',
        loadComponent: () =>
          import('./pages/sistema/aluno/prova/prova.component').then((m) => m.ProvaComponent),
      },
    ],
  },
  {
    path: 'instrutor',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard do Instrutor',
        loadComponent: () =>
          import('./pages/sistema/instrutor/dashboard/dashboard.component').then(
            (m) => m.InstrutorDashboardComponent
          ),
      },
      {
        path: 'configuracoes',
        title: 'Configurações do Instrutor',
        loadComponent: () =>
          import('./pages/sistema/instrutor/configuracoes/configuracoes.component').then(
            (m) => m.ConfiguracoesComponent
          ),
      },
    ],
  },
];
