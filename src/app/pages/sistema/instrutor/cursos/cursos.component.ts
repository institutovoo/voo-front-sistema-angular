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
  styleUrl: './cursos.component.scss'
})
export class InstrutorCursosComponent implements OnInit {
  usuario = { nome: 'João Silva', avatar: '' };
  
  cursos = signal<CursoInstrutor[]>([
    {
      id: 1,
      titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
      status: 'publicado',
      totalAlunos: 456,
      receitaTotal: 12500,
      ultimaAtualizacao: '2026-01-10',
      categoria: 'Programação',
      categoriaColor: '#21b7cd'
    },
    {
      id: 2,
      titulo: 'React Avançado com TypeScript',
      status: 'publicado',
      totalAlunos: 312,
      receitaTotal: 8400,
      ultimaAtualizacao: '2026-01-08',
      categoria: 'Programação',
      categoriaColor: '#3b82f6'
    },
    {
      id: 3,
      titulo: 'Node.js e MongoDB: Backend Completo',
      status: 'revisao',
      totalAlunos: 0,
      receitaTotal: 0,
      ultimaAtualizacao: '2026-01-11',
      categoria: 'Backend',
      categoriaColor: '#22c55e'
    },
    {
      id: 4,
      titulo: 'Introdução ao Python para Data Science',
      status: 'rascunho',
      totalAlunos: 0,
      receitaTotal: 0,
      ultimaAtualizacao: '2026-01-05',
      categoria: 'Data Science',
      categoriaColor: '#f59e0b'
    }
  ]);

  ngOnInit() {}

  getStatusLabel(status: string): string {
    const labels: any = {
      publicado: 'Publicado',
      rascunho: 'Rascunho',
      revisao: 'Em Revisão',
      pausado: 'Pausado'
    };
    return labels[status] || status;
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }
}
