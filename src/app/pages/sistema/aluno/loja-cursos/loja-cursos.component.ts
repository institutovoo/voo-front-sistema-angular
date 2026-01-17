import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../../components/sistema/header/header.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import {
  CardKpiComponent,
  Estatistica,
} from '../../../../components/sistema/kpi-card/kpi-card.component';
import {
  FiltrosBarraComponent,
  FiltroTab,
  OpcaoOrdenacao,
} from '../../../../components/sistema/filtros-barra/filtros-barra.component';

export interface CursoLoja {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  categoriaColor: string;
  instrutor: string;
  instrutorAvatar?: string;
  imagem: string;
  preco: number;
  precoOriginal?: number;
  gratuito: boolean;
  totalAulas: number;
  duracao: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  avaliacao: number;
  totalAvaliacoes: number;
  totalAlunos: number;
  destaque?: boolean;
  novo?: boolean;
  tags?: string[];
}

@Component({
  selector: 'app-loja-cursos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    CardKpiComponent,
    FiltrosBarraComponent,
  ],
  templateUrl: './loja-cursos.component.html',
  styleUrl: './loja-cursos.component.scss',
})
export class LojaCursosComponent {
  usuario: Usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
  };

  constructor(private router: Router) {}

  // Signals para filtros
  categoriaAtiva = signal('todas');
  termoBusca = signal('');
  ordenacao = signal('populares');
  visualizacao = signal<'grid' | 'lista'>('grid');
  tipoPreco = signal<'todos' | 'gratuito' | 'pago'>('todos');
  nivelSelecionado = signal<string>('todos');
  faixaPreco = signal<{ min: number; max: number }>({ min: 0, max: 1000 });

  // KPIs
  kpis: Estatistica[] = [
    {
      icone: 'cursos',
      valor: 156,
      label: 'Cursos disponíveis',
      cor: 'primary',
    },
    {
      icone: 'usuarios',
      valor: '12.5k',
      label: 'Alunos ativos',
      cor: 'success',
    },
    {
      icone: 'star',
      valor: '4.8',
      label: 'Avaliação média',
      cor: 'warning',
    },
    {
      icone: 'certificados',
      valor: '8.2k',
      label: 'Certificados emitidos',
      cor: 'info',
    },
  ];

  // Categorias
  get categoriasTabs(): FiltroTab[] {
    return [
      { id: 'todas', nome: 'Todas', quantidade: this.cursos.length },
      {
        id: 'desenvolvimento',
        nome: 'Desenvolvimento',
        cor: '#3b82f6',
        quantidade: this.cursos.filter((c) => c.categoria === 'Desenvolvimento').length,
      },
      {
        id: 'design',
        nome: 'Design',
        cor: '#ec4899',
        quantidade: this.cursos.filter((c) => c.categoria === 'Design').length,
      },
      {
        id: 'marketing',
        nome: 'Marketing',
        cor: '#f59e0b',
        quantidade: this.cursos.filter((c) => c.categoria === 'Marketing').length,
      },
      {
        id: 'negocios',
        nome: 'Negócios',
        cor: '#22c55e',
        quantidade: this.cursos.filter((c) => c.categoria === 'Negócios').length,
      },
      {
        id: 'dados',
        nome: 'Dados',
        cor: '#8b5cf6',
        quantidade: this.cursos.filter((c) => c.categoria === 'Dados').length,
      },
    ];
  }

  opcoesOrdenacao: OpcaoOrdenacao[] = [
    { valor: 'populares', label: 'Mais populares' },
    { valor: 'recentes', label: 'Mais recentes' },
    { valor: 'avaliacao', label: 'Melhor avaliação' },
    { valor: 'preco-menor', label: 'Menor preço' },
    { valor: 'preco-maior', label: 'Maior preço' },
    { valor: 'nome', label: 'Nome A-Z' },
  ];

  niveis = [
    { id: 'todos', nome: 'Todos os níveis' },
    { id: 'iniciante', nome: 'Iniciante' },
    { id: 'intermediario', nome: 'Intermediário' },
    { id: 'avancado', nome: 'Avançado' },
  ];

  // Cursos
  cursos: CursoLoja[] = [
    {
      id: 1,
      titulo: 'Angular 18 Completo: Do Zero ao Avançado',
      descricao:
        'Aprenda Angular do básico ao avançado com projetos práticos e as melhores práticas do mercado.',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Carlos Mendes',
      instrutorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      preco: 197.9,
      precoOriginal: 297.9,
      gratuito: false,
      totalAulas: 156,
      duracao: '42h',
      nivel: 'iniciante',
      avaliacao: 4.9,
      totalAvaliacoes: 1847,
      totalAlunos: 8542,
      destaque: true,
      novo: true,
      tags: ['Angular', 'TypeScript', 'Frontend'],
    },
    {
      id: 2,
      titulo: 'UI/UX Design: Criando Interfaces Incríveis',
      descricao: 'Domine Figma, prototipagem e crie interfaces que encantam usuários.',
      categoria: 'Design',
      categoriaColor: '#ec4899',
      instrutor: 'Ana Paula Silva',
      instrutorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      imagem: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      preco: 0,
      gratuito: true,
      totalAulas: 48,
      duracao: '12h',
      nivel: 'iniciante',
      avaliacao: 4.8,
      totalAvaliacoes: 923,
      totalAlunos: 5621,
      destaque: true,
      tags: ['Figma', 'UI Design', 'UX'],
    },
    {
      id: 3,
      titulo: 'Marketing Digital: Estratégias que Vendem',
      descricao: 'Aprenda a criar campanhas de alto impacto e aumentar suas conversões.',
      categoria: 'Marketing',
      categoriaColor: '#f59e0b',
      instrutor: 'Roberto Costa',
      instrutorAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      preco: 149.9,
      precoOriginal: 199.9,
      gratuito: false,
      totalAulas: 72,
      duracao: '18h',
      nivel: 'intermediario',
      avaliacao: 4.7,
      totalAvaliacoes: 654,
      totalAlunos: 3245,
      tags: ['Ads', 'SEO', 'Social Media'],
    },
    {
      id: 4,
      titulo: 'Python para Data Science',
      descricao: 'Entre no mundo da ciência de dados com Python, Pandas e Machine Learning.',
      categoria: 'Dados',
      categoriaColor: '#8b5cf6',
      instrutor: 'Fernando Lima',
      instrutorAvatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      imagem: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      preco: 247.9,
      gratuito: false,
      totalAulas: 124,
      duracao: '36h',
      nivel: 'intermediario',
      avaliacao: 4.9,
      totalAvaliacoes: 1234,
      totalAlunos: 6789,
      destaque: true,
      tags: ['Python', 'Pandas', 'ML'],
    },
    {
      id: 5,
      titulo: 'Empreendedorismo Digital',
      descricao: 'Transforme sua ideia em um negócio digital de sucesso.',
      categoria: 'Negócios',
      categoriaColor: '#22c55e',
      instrutor: 'Juliana Ferreira',
      instrutorAvatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      imagem: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=250&fit=crop',
      preco: 0,
      gratuito: true,
      totalAulas: 32,
      duracao: '8h',
      nivel: 'iniciante',
      avaliacao: 4.6,
      totalAvaliacoes: 456,
      totalAlunos: 2345,
      tags: ['Startup', 'Negócios', 'Vendas'],
    },
    {
      id: 6,
      titulo: 'React.js com TypeScript',
      descricao: 'Construa aplicações modernas com React, Hooks, Context API e TypeScript.',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Pedro Santos',
      instrutorAvatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      imagem: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=250&fit=crop',
      preco: 179.9,
      precoOriginal: 249.9,
      gratuito: false,
      totalAulas: 98,
      duracao: '28h',
      nivel: 'intermediario',
      avaliacao: 4.8,
      totalAvaliacoes: 789,
      totalAlunos: 4567,
      novo: true,
      tags: ['React', 'TypeScript', 'Frontend'],
    },
    {
      id: 7,
      titulo: 'Illustrator para Iniciantes',
      descricao: 'Domine o Adobe Illustrator e crie vetores profissionais.',
      categoria: 'Design',
      categoriaColor: '#ec4899',
      instrutor: 'Mariana Oliveira',
      instrutorAvatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      imagem: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop',
      preco: 89.9,
      gratuito: false,
      totalAulas: 45,
      duracao: '10h',
      nivel: 'iniciante',
      avaliacao: 4.5,
      totalAvaliacoes: 321,
      totalAlunos: 1890,
      tags: ['Illustrator', 'Vetores', 'Design'],
    },
    {
      id: 8,
      titulo: 'SQL Avançado e Performance',
      descricao: 'Otimize queries, aprenda sobre índices e torne seus bancos mais rápidos.',
      categoria: 'Dados',
      categoriaColor: '#8b5cf6',
      instrutor: 'Ricardo Alves',
      instrutorAvatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      imagem: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop',
      preco: 127.9,
      gratuito: false,
      totalAulas: 67,
      duracao: '16h',
      nivel: 'avancado',
      avaliacao: 4.7,
      totalAvaliacoes: 432,
      totalAlunos: 2134,
      tags: ['SQL', 'Database', 'Performance'],
    },
    {
      id: 9,
      titulo: 'Introdução ao JavaScript',
      descricao: 'Comece sua jornada no desenvolvimento web com JavaScript moderno.',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Lucas Martins',
      instrutorAvatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      imagem: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
      preco: 0,
      gratuito: true,
      totalAulas: 42,
      duracao: '10h',
      nivel: 'iniciante',
      avaliacao: 4.8,
      totalAvaliacoes: 1567,
      totalAlunos: 9876,
      destaque: true,
      tags: ['JavaScript', 'Web', 'Frontend'],
    },
    {
      id: 10,
      titulo: 'Gestão de Projetos com Scrum',
      descricao: 'Aprenda metodologias ágeis e lidere projetos de alta performance.',
      categoria: 'Negócios',
      categoriaColor: '#22c55e',
      instrutor: 'Carla Ribeiro',
      instrutorAvatar: 'https://randomuser.me/api/portraits/women/55.jpg',
      imagem: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=250&fit=crop',
      preco: 167.9,
      precoOriginal: 227.9,
      gratuito: false,
      totalAulas: 54,
      duracao: '14h',
      nivel: 'intermediario',
      avaliacao: 4.6,
      totalAvaliacoes: 543,
      totalAlunos: 3456,
      tags: ['Scrum', 'Agile', 'Gestão'],
    },
    {
      id: 11,
      titulo: 'SEO Completo: Domine o Google',
      descricao: 'Aprenda técnicas avançadas de SEO para ranquear seu site no topo.',
      categoria: 'Marketing',
      categoriaColor: '#f59e0b',
      instrutor: 'Thiago Souza',
      instrutorAvatar: 'https://randomuser.me/api/portraits/men/77.jpg',
      imagem: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&h=250&fit=crop',
      preco: 0,
      gratuito: true,
      totalAulas: 28,
      duracao: '6h',
      nivel: 'iniciante',
      avaliacao: 4.4,
      totalAvaliacoes: 234,
      totalAlunos: 1567,
      novo: true,
      tags: ['SEO', 'Google', 'Marketing'],
    },
    {
      id: 12,
      titulo: 'Node.js e APIs RESTful',
      descricao: 'Construa APIs robustas e escaláveis com Node.js, Express e MongoDB.',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Bruno Henrique',
      instrutorAvatar: 'https://randomuser.me/api/portraits/men/88.jpg',
      imagem: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
      preco: 217.9,
      gratuito: false,
      totalAulas: 112,
      duracao: '32h',
      nivel: 'avancado',
      avaliacao: 4.9,
      totalAvaliacoes: 876,
      totalAlunos: 5432,
      destaque: true,
      tags: ['Node.js', 'API', 'Backend'],
    },
  ];

  // Cursos filtrados
  get cursosFiltrados(): CursoLoja[] {
    let resultado = [...this.cursos];

    // Filtro por categoria
    if (this.categoriaAtiva() !== 'todas') {
      resultado = resultado.filter((c) => c.categoria.toLowerCase() === this.categoriaAtiva());
    }

    // Filtro por busca
    const termo = this.termoBusca().toLowerCase();
    if (termo) {
      resultado = resultado.filter(
        (c) =>
          c.titulo.toLowerCase().includes(termo) ||
          c.descricao.toLowerCase().includes(termo) ||
          c.instrutor.toLowerCase().includes(termo) ||
          c.tags?.some((t) => t.toLowerCase().includes(termo))
      );
    }

    // Filtro por tipo de preço
    if (this.tipoPreco() === 'gratuito') {
      resultado = resultado.filter((c) => c.gratuito);
    } else if (this.tipoPreco() === 'pago') {
      resultado = resultado.filter((c) => !c.gratuito);
    }

    // Filtro por nível
    if (this.nivelSelecionado() !== 'todos') {
      resultado = resultado.filter((c) => c.nivel === this.nivelSelecionado());
    }

    // Ordenação
    switch (this.ordenacao()) {
      case 'populares':
        resultado.sort((a, b) => b.totalAlunos - a.totalAlunos);
        break;
      case 'recentes':
        resultado.sort((a, b) => (b.novo ? 1 : 0) - (a.novo ? 1 : 0));
        break;
      case 'avaliacao':
        resultado.sort((a, b) => b.avaliacao - a.avaliacao);
        break;
      case 'preco-menor':
        resultado.sort((a, b) => a.preco - b.preco);
        break;
      case 'preco-maior':
        resultado.sort((a, b) => b.preco - a.preco);
        break;
      case 'nome':
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
    }

    return resultado;
  }

  // Cursos em destaque
  get cursosDestaque(): CursoLoja[] {
    return this.cursos.filter((c) => c.destaque).slice(0, 4);
  }

  // Estatísticas
  get totalCursos(): number {
    return this.cursosFiltrados.length;
  }

  get cursosGratuitos(): number {
    return this.cursos.filter((c) => c.gratuito).length;
  }

  get cursosPagos(): number {
    return this.cursos.filter((c) => !c.gratuito).length;
  }

  // Handlers
  onCategoriaChange(categoriaId: string): void {
    this.categoriaAtiva.set(categoriaId);
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

  setTipoPreco(tipo: 'todos' | 'gratuito' | 'pago'): void {
    this.tipoPreco.set(tipo);
  }

  setNivel(nivel: string): void {
    this.nivelSelecionado.set(nivel);
  }

  limparFiltros(): void {
    this.categoriaAtiva.set('todas');
    this.termoBusca.set('');
    this.ordenacao.set('populares');
    this.tipoPreco.set('todos');
    this.nivelSelecionado.set('todos');
  }

  get temFiltrosAtivos(): boolean {
    return (
      this.categoriaAtiva() !== 'todas' ||
      this.termoBusca() !== '' ||
      this.tipoPreco() !== 'todos' ||
      this.nivelSelecionado() !== 'todos'
    );
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getNivelLabel(nivel: string): string {
    const labels: Record<string, string> = {
      iniciante: 'Iniciante',
      intermediario: 'Intermediário',
      avancado: 'Avançado',
    };
    return labels[nivel] || nivel;
  }

  getNivelClass(nivel: string): string {
    return `nivel--${nivel}`;
  }

  onComprar(curso: CursoLoja): void {
    this.router.navigate(['/aluno/curso', curso.id]);
  }

  onVerDetalhes(curso: CursoLoja): void {
    this.router.navigate(['/aluno/curso', curso.id]);
  }
}
