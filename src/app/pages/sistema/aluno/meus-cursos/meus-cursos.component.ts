import { Component, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoController } from '../../../../core/controller/autenticacao.controller';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import {
  CardKpiComponent,
  Estatistica,
} from '../../../../components/sistema/kpi-card/kpi-card.component';
import { BarraProgressoComponent } from '../../../../components/sistema/barra-progresso/barra-progresso.component';
import {
  FiltrosBarraComponent,
  FiltroTab,
  OpcaoOrdenacao,
} from '../../../../components/sistema/filtros-barra/filtros-barra.component';

export interface MeuCurso {
  id: number;
  titulo: string;
  categoria: string;
  categoriaColor: string;
  instrutor: string;
  imagem: string;
  progresso: number;
  totalAulas: number;
  aulasAssistidas: number;
  duracao: string;
  avaliacao: number;
  totalAvaliacoes: number;
  dataInscricao: Date;
  dataValidade: Date;
  ultimoAcesso?: Date;
  modulo?: string;
  status: 'em-andamento' | 'concluido' | 'nao-iniciado' | 'vencido';
}

@Component({
  selector: 'app-meus-cursos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    CardKpiComponent,
    BarraProgressoComponent,
    FiltrosBarraComponent,
  ],
  templateUrl: './meus-cursos.component.html',
  styleUrl: './meus-cursos.component.scss',
})
export class MeusCursosComponent {
  private authController = inject(AutenticacaoController);
  private router = inject(Router);

  usuarioLogado = this.authController.usuarioLogado;

  usuario = computed(() => {
    const user = this.usuarioLogado();
    return {
      nome: user?.nome_completo || 'Usuário',
      email: user?.email || '',
    };
  });

  // Filtros e busca
  termoBusca = signal('');
  filtroAtivo = signal('todos');
  ordenacao = signal('recentes');
  visualizacao = signal<'grid' | 'lista'>('grid');

  // Dados mockados
  cursos: MeuCurso[] = [
    {
      id: 1,
      titulo: 'Angular Avançado: Do Zero ao Deploy',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Carlos Silva',
      imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      progresso: 65,
      totalAulas: 48,
      aulasAssistidas: 31,
      duracao: '42h',
      avaliacao: 4.9,
      totalAvaliacoes: 1250,
      dataInscricao: new Date('2025-06-15'),
      dataValidade: new Date('2026-06-15'),
      ultimoAcesso: new Date('2026-01-10'),
      modulo: 'Módulo 5: Signals e RxJS',
      status: 'em-andamento',
    },
    {
      id: 2,
      titulo: 'UI/UX Design Completo',
      categoria: 'Design',
      categoriaColor: '#ec4899',
      instrutor: 'Ana Beatriz',
      imagem: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      progresso: 100,
      totalAulas: 36,
      aulasAssistidas: 36,
      duracao: '28h',
      avaliacao: 4.8,
      totalAvaliacoes: 890,
      dataInscricao: new Date('2025-03-20'),
      dataValidade: new Date('2026-03-20'),
      ultimoAcesso: new Date('2025-11-15'),
      status: 'concluido',
    },
    {
      id: 3,
      titulo: 'Node.js e Express: API REST',
      categoria: 'Backend',
      categoriaColor: '#22c55e',
      instrutor: 'Pedro Henrique',
      imagem: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      progresso: 30,
      totalAulas: 52,
      aulasAssistidas: 16,
      duracao: '38h',
      avaliacao: 4.7,
      totalAvaliacoes: 720,
      dataInscricao: new Date('2025-09-10'),
      dataValidade: new Date('2026-09-10'),
      ultimoAcesso: new Date('2025-12-28'),
      modulo: 'Módulo 3: Middlewares',
      status: 'em-andamento',
    },
    {
      id: 4,
      titulo: 'Marketing Digital Estratégico',
      categoria: 'Marketing',
      categoriaColor: '#f59e0b',
      instrutor: 'Mariana Costa',
      imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      progresso: 0,
      totalAulas: 40,
      aulasAssistidas: 0,
      duracao: '32h',
      avaliacao: 4.6,
      totalAvaliacoes: 540,
      dataInscricao: new Date('2026-01-05'),
      dataValidade: new Date('2027-01-05'),
      status: 'nao-iniciado',
    },
    {
      id: 5,
      titulo: 'Python para Data Science',
      categoria: 'Data Science',
      categoriaColor: '#8b5cf6',
      instrutor: 'Lucas Mendes',
      imagem: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      progresso: 45,
      totalAulas: 60,
      aulasAssistidas: 27,
      duracao: '50h',
      avaliacao: 4.9,
      totalAvaliacoes: 1100,
      dataInscricao: new Date('2024-08-20'),
      dataValidade: new Date('2025-08-20'),
      ultimoAcesso: new Date('2025-07-10'),
      modulo: 'Módulo 4: Pandas e NumPy',
      status: 'vencido',
    },
    {
      id: 6,
      titulo: 'React Native: Apps Mobile',
      categoria: 'Mobile',
      categoriaColor: '#06b6d4',
      instrutor: 'Felipe Santos',
      imagem: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
      progresso: 85,
      totalAulas: 44,
      aulasAssistidas: 37,
      duracao: '36h',
      avaliacao: 4.8,
      totalAvaliacoes: 680,
      dataInscricao: new Date('2025-05-12'),
      dataValidade: new Date('2026-05-12'),
      ultimoAcesso: new Date('2026-01-09'),
      modulo: 'Módulo 7: Deploy nas Stores',
      status: 'em-andamento',
    },
  ];

  // Contagens
  get totalCursos(): number {
    return this.cursos.length;
  }

  get cursosEmAndamento(): number {
    return this.cursos.filter((c) => c.status === 'em-andamento').length;
  }

  get cursosConcluidos(): number {
    return this.cursos.filter((c) => c.status === 'concluido').length;
  }

  get cursosVencidos(): number {
    return this.cursos.filter((c) => c.status === 'vencido').length;
  }

  get cursosNaoIniciados(): number {
    return this.cursos.filter((c) => c.status === 'nao-iniciado').length;
  }

  // KPIs
  kpis = computed<Estatistica[]>(() => {
    return [
      {
        icone: 'cursos',
        valor: this.totalCursos,
        label: 'Total de cursos',
        cor: 'primary',
      },
      {
        icone: 'play',
        valor: this.cursosEmAndamento,
        label: 'Em andamento',
        cor: 'info',
      },
      {
        icone: 'check-circle',
        valor: this.cursosConcluidos,
        label: 'Concluídos',
        cor: 'success',
      },
      {
        icone: 'alerta',
        valor: this.cursosVencidos,
        label: 'Vencidos',
        cor: 'warning',
      },
    ];
  });

  // Filtros (tabs)
  filtroTabs = computed<FiltroTab[]>(() => {
    return [
      { id: 'todos', nome: 'Todos', icone: 'cursos', quantidade: this.totalCursos },
      {
        id: 'em-andamento',
        nome: 'Em andamento',
        icone: 'play',
        quantidade: this.cursosEmAndamento,
      },
      {
        id: 'concluido',
        nome: 'Concluídos',
        icone: 'check-circle',
        quantidade: this.cursosConcluidos,
      },
      {
        id: 'nao-iniciado',
        nome: 'Não iniciados',
        icone: 'cursos',
        quantidade: this.cursosNaoIniciados,
      },
      { id: 'vencido', nome: 'Vencidos', icone: 'alerta', quantidade: this.cursosVencidos },
    ];
  });

  // Opções de ordenação
  opcoesOrdenacao: OpcaoOrdenacao[] = [
    { valor: 'recentes', label: 'Mais recentes' },
    { valor: 'antigos', label: 'Mais antigos' },
    { valor: 'nome', label: 'Nome A-Z' },
    { valor: 'progresso', label: 'Maior progresso' },
    { valor: 'validade', label: 'Próx. a vencer' },
  ];

  // Cursos filtrados
  cursosFiltrados = computed<MeuCurso[]>(() => {
    let resultado = [...this.cursos];

    // Filtro por status
    if (this.filtroAtivo() !== 'todos') {
      resultado = resultado.filter((c) => c.status === this.filtroAtivo() as any);
    }

    // Filtro por busca
    const termo = this.termoBusca().toLowerCase().trim();
    if (termo) {
      resultado = resultado.filter(
        (c) =>
          c.titulo.toLowerCase().includes(termo) ||
          c.categoria.toLowerCase().includes(termo) ||
          c.instrutor.toLowerCase().includes(termo)
      );
    }

    // Ordenação
    switch (this.ordenacao()) {
      case 'recentes':
        resultado.sort((a, b) => b.dataInscricao.getTime() - a.dataInscricao.getTime());
        break;
      case 'antigos':
        resultado.sort((a, b) => a.dataInscricao.getTime() - b.dataInscricao.getTime());
        break;
      case 'nome':
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'progresso':
        resultado.sort((a, b) => b.progresso - a.progresso);
        break;
      case 'validade':
        resultado.sort((a, b) => a.dataValidade.getTime() - b.dataValidade.getTime());
        break;
    }

    return resultado;
  });

  // Métodos para filtros
  onTabChange(tabId: string): void {
    this.filtroAtivo.set(tabId);
  }

  onBuscaChange(termo: string): void {
    this.termoBusca.set(termo);
  }

  onOrdenacaoChange(ordem: string): void {
    this.ordenacao.set(ordem);
  }

  onVisualizacaoChange(viz: 'grid' | 'lista'): void {
    this.visualizacao.set(viz);
  }

  calcularDiasRestantes(dataValidade: Date): number {
    const hoje = new Date();
    const diff = dataValidade.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'em-andamento': 'Em andamento',
      concluido: 'Concluído',
      'nao-iniciado': 'Não iniciado',
      vencido: 'Vencido',
    };
    return labels[status] || status;
  }

  acessarCurso(curso: MeuCurso): void {
    this.router.navigate(['/aluno/curso', curso.id]);
  }

  renovarCurso(curso: MeuCurso): void {
    console.log('Renovando curso:', curso.titulo);
    // Abrir modal de renovação
  }
}
