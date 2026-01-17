# Voo Front Sistema Angular

## Rotas do Sistema

### Públicas

- `/` — Institucional
- `/login` — Login
- `/cadastro` — Cadastro
- `/esqueci-senha` — Recuperar Senha
- `/admin/login` — Login Administrativo

### Aluno

- `/aluno/dashboard` — Dashboard do Aluno
- `/aluno/configuracoes` — Configurações do Aluno
- `/aluno/certificados` — Meus Certificados
- `/aluno/meus-cursos` — Meus Cursos
- `/aluno/loja` — Loja de Cursos
- `/aluno/curso/:id` — Detalhes do Curso
- `/aluno/curso/:id/aula/:aulaId` — Aula do Curso
- `/aluno/prova/:id` — Prova

### Instrutor

- `/instrutor/dashboard` — Dashboard do Instrutor
- `/instrutor/cursos` — Meus Cursos
- `/instrutor/cursos/novo` — Criar Novo Curso
- `/instrutor/cursos/:id/editar` — Editar Curso
- `/instrutor/cursos/:id/modulos` — Gestão de Módulos e Aulas
- `/instrutor/cursos/:id/materiais` — Conteúdos e Materiais
- `/instrutor/configuracoes` — Configurações do Instrutor

### Admin

- `/admin/login` — Login Administrativo
- (Rotas administrativas específicas podem ser adicionadas conforme necessário)

---

## Perfis de Usuário

### Aluno

- Acessa cursos adquiridos
- Realiza aulas e provas
- Visualiza certificados
- Gerencia configurações pessoais
- Navega e compra novos cursos

### Instrutor

- Cria e edita cursos
- Gerencia módulos, aulas e materiais
- Visualiza estatísticas e KPIs dos cursos
- Gerencia configurações do perfil instrutor

### Admin

- Gerencia usuários, cursos e configurações globais do sistema
- Acessa rotas administrativas exclusivas

---

## Estrutura do Projeto

- Angular standalone components
- Modularização por perfis e funcionalidades
- SCSS para estilos
- Angular CDK para drag-and-drop

---

## Como rodar o projeto

```bash
npm install
npm start
```
