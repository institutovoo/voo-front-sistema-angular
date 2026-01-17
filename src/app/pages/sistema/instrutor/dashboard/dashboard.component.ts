import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../../components/sistema/header/header.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import {
  CardKpiComponent,
  Estatistica,
} from '../../../../components/sistema/kpi-card/kpi-card.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

export interface CursoInstrutor {
  id: number;
  titulo: string;
  imagem: string;
  status: 'rascunho' | 'publicado' | 'revisao' | 'pausado';
  totalAlunos: number;
  progressoMedio: number;
  avaliacaoMedia: number;
  totalAvaliacoes: number;
  receitaTotal: number;
  receitaMensal: number;
  ultimaAtualizacao: string;
}

@Component({
  selector: 'app-instrutor-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SistemaLayoutComponent,
    CardKpiComponent,
    HeaderIconeComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class InstrutorDashboardComponent implements OnInit {
  nomeInstrutor = 'Carlos';

  usuario: Usuario = {
    nome: 'Carlos Mendes',
    email: 'carlos@email.com',
  };

  estatisticas: Estatistica[] = [];
  cursos: CursoInstrutor[] = [];
  duvidasRecentes: any[] = [];
  receitaMensal: any[] = [];

  ngOnInit() {
    this.carregarDadosMockados();
  }

  carregarDadosMockados() {
    this.estatisticas = [
      {
        icone: 'cursos',
        valor: 8,
        label: 'Cursos publicados',
        cor: 'primary',
        tendencia: { valor: 2, tipo: 'up', periodo: 'este mês' },
      },
      {
        icone: 'alunos',
        valor: 1248,
        label: 'Total de alunos',
        cor: 'success',
        tendencia: { valor: 15, tipo: 'up', periodo: 'este mês' },
      },
      {
        icone: 'estrela',
        valor: '4.8',
        label: 'Avaliação média',
        cor: 'warning',
      },
      {
        icone: 'receita',
        valor: 'R$ 24.850',
        label: 'Receita total',
        cor: 'info',
        tendencia: { valor: 12, tipo: 'up', periodo: 'este mês' },
      },
    ];

    this.cursos = [
      {
        id: 1,
        titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
        imagem: 'assets/cursos/fullstack.jpg',
        status: 'publicado',
        totalAlunos: 456,
        progressoMedio: 68,
        avaliacaoMedia: 4.9,
        totalAvaliacoes: 234,
        receitaTotal: 12500,
        receitaMensal: 1850,
        ultimaAtualizacao: '2026-01-10',
      },
      {
        id: 2,
        titulo: 'React Avançado com TypeScript',
        imagem: 'assets/cursos/react.jpg',
        status: 'publicado',
        totalAlunos: 312,
        progressoMedio: 54,
        avaliacaoMedia: 4.7,
        totalAvaliacoes: 156,
        receitaTotal: 8200,
        receitaMensal: 1200,
        ultimaAtualizacao: '2026-01-08',
      },
      {
        id: 3,
        titulo: 'Node.js e MongoDB: Backend Completo',
        imagem: 'assets/cursos/nodejs.jpg',
        status: 'revisao',
        totalAlunos: 0,
        progressoMedio: 0,
        avaliacaoMedia: 0,
        totalAvaliacoes: 0,
        receitaTotal: 0,
        receitaMensal: 0,
        ultimaAtualizacao: '2026-01-11',
      },
      {
        id: 4,
        titulo: 'Introdução ao Python para Data Science',
        imagem: 'assets/cursos/python.jpg',
        status: 'rascunho',
        totalAlunos: 0,
        progressoMedio: 0,
        avaliacaoMedia: 0,
        totalAvaliacoes: 0,
        receitaTotal: 0,
        receitaMensal: 0,
        ultimaAtualizacao: '2026-01-05',
      },
      {
        id: 5,
        titulo: 'AWS para Desenvolvedores',
        imagem: 'assets/cursos/aws.jpg',
        status: 'pausado',
        totalAlunos: 180,
        progressoMedio: 42,
        avaliacaoMedia: 4.5,
        totalAvaliacoes: 78,
        receitaTotal: 3850,
        receitaMensal: 0,
        ultimaAtualizacao: '2025-12-20',
      },
    ];

    this.duvidasRecentes = [
      {
        id: 1,
        aluno: 'Maria Silva',
        curso: 'Desenvolvimento Web Fullstack',
        aula: 'Aula 14 - React Hooks',
        pergunta: 'Como faço para usar o useEffect com cleanup function?',
        tempo: '2h atrás',
      },
      {
        id: 2,
        aluno: 'João Santos',
        curso: 'React Avançado',
        aula: 'Aula 8 - Context API',
        pergunta: 'Qual a diferença entre useContext e Redux?',
        tempo: '5h atrás',
      },
      {
        id: 3,
        aluno: 'Ana Costa',
        curso: 'Desenvolvimento Web Fullstack',
        aula: 'Aula 22 - API REST',
        pergunta: 'Como implementar autenticação JWT?',
        tempo: '1d atrás',
      },
    ];

    this.receitaMensal = [
      { mes: 'Ago', valor: 1800 },
      { mes: 'Set', valor: 2100 },
      { mes: 'Out', valor: 2400 },
      { mes: 'Nov', valor: 2850 },
      { mes: 'Dez', valor: 3200 },
      { mes: 'Jan', valor: 3050 },
    ];
  }

  get maxReceita(): number {
    if (!this.receitaMensal.length) return 0;
    return Math.max(...this.receitaMensal.map((r) => r.valor));
  }

  get cursosPublicados(): CursoInstrutor[] {
    return this.cursos.filter((c) => c.status === 'publicado');
  }

  get cursosRascunho(): CursoInstrutor[] {
    return this.cursos.filter((c) => c.status === 'rascunho');
  }

  get cursosRevisao(): CursoInstrutor[] {
    return this.cursos.filter((c) => c.status === 'revisao');
  }

  get cursosPausados(): CursoInstrutor[] {
    return this.cursos.filter((c) => c.status === 'pausado');
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      rascunho: 'Rascunho',
      publicado: 'Publicado',
      revisao: 'Em Revisão',
      pausado: 'Pausado',
    };
    return labels[status] || status;
  }

  getStatusClass(status: string): string {
    return `status--${status}`;
  }

  formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}
