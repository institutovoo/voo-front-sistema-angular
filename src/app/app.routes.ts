import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

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
        (m) => m.InstitucionalInstrutorComponent,
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
        (m) => m.EsqueciSenhaComponent,
      ),
  },
  {
    path: 'reset-senha',
    title: 'Redefinir Senha',
    loadComponent: () =>
      import('./pages/autenticacao/reset-senha/reset-senha.component').then(
        (m) => m.ResetSenhaComponent,
      ),
  },
  {
    path: 'troca-senha-obrigatoria',
    title: 'Troca de Senha Obrigatória',
    loadComponent: () =>
      import('./pages/autenticacao/troca-senha-obrigatoria/troca-senha-obrigatoria.component').then(
        (m) => m.TrocaSenhaObrigatoriaComponent,
      ),
  },

  // ========================================
  // SISTEMA - ALUNO (Pessoa Física / PJ)
  // ========================================
  {
    path: 'aluno',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./pages/sistema/aluno/dashboard/dashboard.component').then(
            (m) => m.AlunoDashboardComponent,
          ),
      },
      {
        path: 'configuracoes',
        title: 'Configurações',
        loadComponent: () =>
          import('./pages/sistema/aluno/configuracoes/configuracoes.component').then(
            (m) => m.ConfiguracoesComponent,
          ),
      },
      {
        path: 'certificados',
        title: 'Meus Certificados',
        loadComponent: () =>
          import('./pages/sistema/aluno/certificados/certificados.component').then(
            (m) => m.CertificadosComponent,
          ),
      },
      {
        path: 'meus-cursos',
        title: 'Meus Cursos',
        loadComponent: () =>
          import('./pages/sistema/aluno/meus-cursos/meus-cursos.component').then(
            (m) => m.MeusCursosComponent,
          ),
      },
      {
        path: 'loja',
        title: 'Loja de Cursos',
        loadComponent: () =>
          import('./pages/sistema/aluno/loja-cursos/loja-cursos.component').then(
            (m) => m.LojaCursosComponent,
          ),
      },
      {
        path: 'curso/:id',
        title: 'Detalhes do Curso',
        loadComponent: () =>
          import('./pages/sistema/aluno/curso-detalhe/curso-detalhe.component').then(
            (m) => m.CursoDetalheComponent,
          ),
      },
      {
        path: 'curso/:id/aula/:aulaId',
        title: 'Aula',
        loadComponent: () =>
          import('./pages/sistema/aluno/curso-player/curso-player.component').then(
            (m) => m.CursoPlayerComponent,
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
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        title: 'Dashboard do Instrutor',
        loadComponent: () =>
          import('./pages/sistema/instrutor/dashboard/dashboard.component').then(
            (m) => m.InstrutorDashboardComponent,
          ),
      },
      {
        path: 'configuracoes',
        title: 'Configurações do Instrutor',
        loadComponent: () =>
          import('./pages/sistema/instrutor/configuracoes/configuracoes.component').then(
            (m) => m.ConfiguracoesComponent,
          ),
      },
      {
        path: 'cursos',
        title: 'Meus Cursos - Instrutor',
        loadComponent: () =>
          import('./pages/sistema/instrutor/cursos/cursos.component').then(
            (m) => m.InstrutorCursosComponent,
          ),
      },
      {
        path: 'alunos',
        title: 'Meus Alunos',
        loadComponent: () =>
          import('./pages/sistema/instrutor/alunos/alunos.component').then(
            (m) => m.InstrutorAlunosComponent,
          ),
      },
      {
        path: 'receitas',
        title: 'Minhas Receitas',
        loadComponent: () =>
          import('./pages/sistema/instrutor/receitas/receitas.component').then(
            (m) => m.InstrutorReceitasComponent,
          ),
      },
    ],
  },

  // ========================================
  // SISTEMA - ADM
  // ========================================
  {
    path: 'admin',
    children: [
      // Autenticação Administrativa
      {
        path: 'login',
        title: 'Login Administrativo',
        loadComponent: () =>
          import('./pages/autenticacao/admin-login/admin-login.component').then(
            (m) => m.AdminLoginComponent,
          ),
      },
      {
        path: 'cadastro',
        title: 'Cadastro Administrativo',
        loadComponent: () =>
          import('./pages/autenticacao/admin-cadastro/admin-cadastro.component').then(
            (m) => m.AdminCadastroComponent,
          ),
      },

      // Área Logada
      {
        path: '',
        canActivate: [authGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'dashboard',
            title: 'Painel Administrativo',
            loadComponent: () =>
              import('./pages/sistema/adm/dashboard/dashboard.component').then(
                (m) => m.AdmDashboardComponent,
              ),
          },
          {
            path: 'usuarios',
            title: 'Gestão de Usuários',
            loadComponent: () =>
              import('./pages/sistema/adm/usuarios/usuarios.component').then(
                (m) => m.AdmUsuariosComponent,
              ),
          },
          {
            path: 'usuarios/novo',
            title: 'Cadastrar Novo Usuário',
            loadComponent: () =>
              import('./pages/sistema/adm/usuarios/cadastro/cadastro.component').then(
                (m) => m.AdmCadastroUsuarioComponent,
              ),
          },
          {
            path: 'cursos',
            title: 'Gestão de Cursos',
            loadComponent: () =>
              import('./pages/sistema/adm/cursos/cursos.component').then((m) => m.AdmCursosComponent),
          },
          {
            path: 'instrutores',
            title: 'Gestão de Instrutores',
            loadComponent: () =>
              import('./pages/sistema/adm/instrutores/instrutores.component').then(
                (m) => m.AdmInstrutoresComponent,
              ),
          },
          {
            path: 'relatorios',
            title: 'Relatórios Globais',
            loadComponent: () =>
              import('./pages/sistema/adm/relatorios/relatorios.component').then(
                (m) => m.AdmRelatoriosComponent,
              ),
          },
          {
            path: 'auditoria',
            title: 'Auditoria do Sistema',
            loadComponent: () =>
              import('./pages/sistema/adm/auditoria/auditoria.component').then(
                (m) => m.AdmAuditoriaComponent,
              ),
          },
          {
            path: 'solicitacoes',
            title: 'Aprovações de Acesso',
            loadComponent: () =>
              import('./pages/sistema/adm/solicitacoes-acesso/solicitacoes-acesso.component').then(
                (m) => m.AdmSolicitacoesAcessoComponent,
              ),
          },
          {
            path: 'configuracoes',
            title: 'Configurações do Sistema',
            loadComponent: () =>
              import('./pages/sistema/adm/configuracoes/configuracoes.component').then(
                (m) => m.AdmConfiguracoesComponent,
              ),
          },
        ],
      },
    ],
  },

  // ========================================
  // FALLBACK (Redireciona para home)
  // ========================================
  {
    path: '**',
    redirectTo: '',
  },
];
