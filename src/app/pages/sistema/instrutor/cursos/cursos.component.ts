import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

interface CursoInstrutor {
  id: number;
  titulo: string;
  status: 'publicado' | 'rascunho' | 'revisao' | 'pausado';
  totalAlunos: number;
  receitaTotal: number;
  ultimaAtualizacao: string;
  imagem?: string;
  categoria: string;
  categoriaColor: string;
}

@Component({
  selector: 'app-instrutor-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss',
})
export class InstrutorCursosComponent implements OnInit {
  usuario = { nome: 'João Silva', avatar: '' };

  cursos = signal<CursoInstrutor[]>([
    {
      id: 1,
      titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
      status: 'publicado',
      totalAlunos: 1256,
      receitaTotal: 65800,
      ultimaAtualizacao: '2026-02-01',
      imagem: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      categoria: 'Programação',
      categoriaColor: '#21b7cd',
    },
    {
      id: 2,
      titulo: 'React Avançado com TypeScript e Next.js',
      status: 'publicado',
      totalAlunos: 892,
      receitaTotal: 48200,
      ultimaAtualizacao: '2026-01-28',
      imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      categoria: 'Frontend',
      categoriaColor: '#3b82f6',
    },
    {
      id: 3,
      titulo: 'Node.js e MongoDB: API REST Completa',
      status: 'publicado',
      totalAlunos: 734,
      receitaTotal: 39100,
      ultimaAtualizacao: '2026-01-25',
      imagem: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
      categoria: 'Backend',
      categoriaColor: '#22c55e',
    },
    {
      id: 4,
      titulo: 'Python para Data Science e Machine Learning',
      status: 'publicado',
      totalAlunos: 1089,
      receitaTotal: 58900,
      ultimaAtualizacao: '2026-01-30',
      imagem: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
      categoria: 'Data Science',
      categoriaColor: '#f59e0b',
    },
    {
      id: 5,
      titulo: 'UI/UX Design: Do Básico ao Avançado',
      status: 'publicado',
      totalAlunos: 645,
      receitaTotal: 34500,
      ultimaAtualizacao: '2026-01-22',
      imagem: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
      categoria: 'Design',
      categoriaColor: '#ec4899',
    },
    {
      id: 6,
      titulo: 'DevOps Essencial: Docker, Kubernetes e CI/CD',
      status: 'publicado',
      totalAlunos: 512,
      receitaTotal: 28800,
      ultimaAtualizacao: '2026-01-20',
      imagem: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800',
      categoria: 'DevOps',
      categoriaColor: '#8b5cf6',
    },
    {
      id: 7,
      titulo: 'Marketing Digital e Growth Hacking 2026',
      status: 'publicado',
      totalAlunos: 923,
      receitaTotal: 49800,
      ultimaAtualizacao: '2026-01-18',
      imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      categoria: 'Marketing',
      categoriaColor: '#f43f5e',
    },
    {
      id: 8,
      titulo: 'Inglês Técnico para Desenvolvedores',
      status: 'publicado',
      totalAlunos: 1445,
      receitaTotal: 0, // Curso gratuito
      ultimaAtualizacao: '2026-02-02',
      imagem: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800',
      categoria: 'Idiomas',
      categoriaColor: '#06b6d4',
    },
  ]);

  ngOnInit() {}

  getStatusLabel(status: string): string {
    const labels: any = {
      publicado: 'Publicado',
      rascunho: 'Rascunho',
      revisao: 'Em Revisão',
      pausado: 'Pausado',
    };
    return labels[status] || status;
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  }
}
