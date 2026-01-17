import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../../components/sistema/header/header.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import {
  CardKpiComponent,
  Estatistica,
} from '../../../../components/sistema/kpi-card/kpi-card.component';
import {
  CursoCardComponent,
  Curso,
} from '../../../../components/sistema/curso-card/curso-card.component';
import {
  AtividadeItemComponent,
  Atividade,
} from '../../../../components/sistema/atividade-item/atividade-item.component';
import { BarraProgressoComponent } from '../../../../components/sistema/barra-progresso/barra-progresso.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

interface MetaDia {
  dia: string;
  horas: number;
  atual?: boolean;
}

@Component({
  selector: 'app-aluno-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SistemaLayoutComponent,
    CardKpiComponent,
    CursoCardComponent,
    AtividadeItemComponent,
    BarraProgressoComponent,
    HeaderIconeComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class AlunoDashboardComponent implements OnInit {
  nomeAluno = 'João';

  usuario: Usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
  };

  estatisticas: Estatistica[] = [];
  cursoAtual!: Curso;
  meusCursos: Curso[] = [];
  atividadesRecentes: Atividade[] = [];
  metaSemanal: any = {};
  diasSemana: MetaDia[] = [];

  ngOnInit() {
    this.carregarDadosMockados();
  }

  carregarDadosMockados() {
    this.estatisticas = [
      { icone: 'cursos', valor: 4, label: 'Cursos em andamento', cor: 'primary' },
      { icone: 'concluidos', valor: 12, label: 'Cursos concluídos', cor: 'success' },
      { icone: 'horas', valor: '48h', label: 'Horas estudadas', cor: 'warning' },
      { icone: 'progresso', valor: '58%', label: 'Progresso geral', cor: 'info' },
    ];

    this.cursoAtual = {
      id: 1,
      titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
      categoria: 'Programação',
      categoriaColor: '#21b7cd',
      instrutor: 'Prof. Carlos Mendes',
      imagem: 'assets/cursos/fullstack.jpg',
      progresso: 35,
      totalAulas: 45,
      aulaAtual: 14,
      duracao: '4h 20m',
      avaliacao: 4.8,
      totalAvaliacoes: 234,
      modulo: 'Módulo 3: Introdução ao React Hooks e Context API',
    };

    this.meusCursos = [
      {
        id: 1,
        titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
        categoria: 'Programação',
        categoriaColor: '#21b7cd',
        instrutor: 'Prof. Carlos Mendes',
        imagem: 'assets/cursos/fullstack.jpg',
        progresso: 35,
        totalAulas: 45,
        aulaAtual: 14,
        duracao: '48h',
        avaliacao: 4.8,
        totalAvaliacoes: 234,
        gratuito: true,
      },
      {
        id: 2,
        titulo: 'UX/UI Design Masterclass',
        categoria: 'Design',
        categoriaColor: '#8b5cf6',
        instrutor: 'Prof. Ana Souza',
        imagem: 'assets/cursos/ux-ui.jpg',
        progresso: 80,
        totalAulas: 28,
        aulaAtual: 22,
        duracao: '32h',
        avaliacao: 4.9,
        totalAvaliacoes: 512,
        gratuito: true,
      },
      {
        id: 3,
        titulo: 'Marketing Digital para Iniciantes',
        categoria: 'Marketing',
        categoriaColor: '#f59e0b',
        instrutor: 'Prof. Carlos Mendes',
        imagem: 'assets/cursos/marketing.jpg',
        progresso: 15,
        totalAulas: 20,
        aulaAtual: 3,
        duracao: '24h',
        avaliacao: 4.7,
        totalAvaliacoes: 389,
      },
    ];

    this.atividadesRecentes = [
      {
        id: 1,
        tipo: 'aula',
        titulo: 'Aula concluída',
        descricao: 'Módulo 3: Componentes React - Desenv...',
        tempo: 'Há 2 horas',
        icone: 'check',
        cor: '#22c55e',
      },
      {
        id: 2,
        tipo: 'certificado',
        titulo: 'Certificado emitido',
        descricao: 'Você concluiu o curso de Python para In...',
        tempo: 'Há 1 dia',
        icone: 'certificado',
        cor: '#21b7cd',
      },
      {
        id: 3,
        tipo: 'avaliacao',
        titulo: 'Avaliação enviada',
        descricao: 'Você avaliou o curso Marketing Digital ...',
        tempo: 'Há 2 dias',
        icone: 'star',
        cor: '#f59e0b',
      },
      {
        id: 4,
        tipo: 'curso',
        titulo: 'Novo curso iniciado',
        descricao: 'UI/UX Design Fundamentos',
        tempo: 'Há 3 dias',
        icone: 'curso',
        cor: '#8b5cf6',
      },
    ];

    this.metaSemanal = {
      horasAlvo: 20,
      horasConcluidas: 15,
      porcentagem: 75,
    };

    this.diasSemana = [
      { dia: 'Segunda', horas: 3 },
      { dia: 'Terça', horas: 2 },
      { dia: 'Quarta', horas: 4 },
      { dia: 'Hoje', horas: 6, atual: true },
    ];
  }

  get saudacao(): string {
    const hora = new Date().getHours();
    if (hora < 12) return 'Bom dia';
    if (hora < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  onAcessarCurso(curso: Curso) {
    console.log('Acessar curso:', curso);
    // Navegar para o curso
  }
}
