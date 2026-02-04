import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../../components/sistema/header/header.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { BarraProgressoComponent } from '../../../../components/sistema/barra-progresso/barra-progresso.component';

import { FormsModule } from '@angular/forms';

export interface Aula {
  id: number;
  titulo: string;
  duracao: string;
  tipo: 'video' | 'quiz' | 'material';
  concluida: boolean;
  bloqueada?: boolean;
}

export interface Modulo {
  id: number;
  titulo: string;
  aulas: Aula[];
  expandido?: boolean;
}

export interface CursoCompleto {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  categoriaColor: string;
  instrutor: {
    nome: string;
    avatar: string;
    bio?: string;
  };
  imagem: string;
  videoPreview?: string;
  preco: number;
  precoOriginal?: number;
  gratuito: boolean;
  totalAulas: number;
  duracao: string;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  avaliacao: number;
  totalAvaliacoes: number;
  totalAlunos: number;
  modulos: Modulo[];
  inclui: string[];
  certificado: boolean;
  atualizado: Date;
  idioma: string;
}

export interface Avaliacao {
  id: number;
  aluno: string;
  nota: number;
  data: Date;
  comentario: string;
  resposta?: string;
}

@Component({
  selector: 'app-curso-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    BarraProgressoComponent,
    FormsModule,
  ],
  templateUrl: './curso-detalhe.component.html',
  styleUrl: './curso-detalhe.component.scss',
})
export class CursoDetalheComponent {
  usuario: Usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
  };

  cursoId = signal<number>(1);
  inscrito = signal<boolean>(false);

  // Avaliação do aluno
  novaNota = 0;
  novoComentario = '';
  avaliacaoEnviada = false;

  avaliacoesMock: Avaliacao[] = [
    {
      id: 1,
      aluno: 'Marcos Silva',
      nota: 5,
      data: new Date('2026-01-02'),
      comentario:
        'Curso excelente! O conteúdo é muito bem explicado e os projetos práticos ajudam muito.',
      resposta: 'Olá Marcos! Que bom que gostou. Bons estudos!',
    },
    {
      id: 2,
      aluno: 'Julia Costa',
      nota: 4,
      data: new Date('2025-12-28'),
      comentario: 'Gostei muito, mas senti falta de mais exemplos sobre autenticação.',
      resposta:
        'Olá Julia! Obrigado pelo feedback. Vamos adicionar uma aula extra sobre isso em breve!',
    },
  ];

  // Curso mockado - seria carregado via API
  curso: CursoCompleto = {
    id: 1,
    titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
    descricao:
      'Aprenda a criar aplicações web completas com React, Node.js e bancos de dados modernos. Este curso abrangente vai te levar desde os fundamentos do desenvolvimento web até a construção de aplicações profissionais completas. Você aprenderá HTML, CSS, JavaScript, React, Node.js, Express, MongoDB e muito mais!',
    categoria: 'Programação',
    categoriaColor: '#3b82f6',
    instrutor: {
      nome: 'Prof. Carlos Mendes',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      bio: 'Desenvolvedor Full Stack com mais de 10 anos de experiência',
    },
    imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    preco: 0,
    gratuito: true,
    totalAulas: 45,
    duracao: '48h',
    nivel: 'iniciante',
    avaliacao: 4.8,
    totalAvaliacoes: 234,
    totalAlunos: 1234,
    certificado: true,
    atualizado: new Date('2026-01-05'),
    idioma: 'Português',
    inclui: [
      '48h de vídeo sob demanda',
      '15 materiais em PDF',
      '9 quizzes',
      'Certificado de conclusão',
    ],
    modulos: [
      {
        id: 1,
        titulo: 'Introdução ao Desenvolvimento Web',
        expandido: true,
        aulas: [
          { id: 1, titulo: 'Bem-vindo ao curso', duracao: '5:30', tipo: 'video', concluida: true },
          {
            id: 2,
            titulo: 'O que você vai aprender',
            duracao: '8:45',
            tipo: 'video',
            concluida: true,
          },
          {
            id: 3,
            titulo: 'Configurando o ambiente',
            duracao: '15:20',
            tipo: 'video',
            concluida: true,
          },
        ],
      },
      {
        id: 2,
        titulo: 'HTML Fundamental',
        expandido: true,
        aulas: [
          {
            id: 4,
            titulo: 'Estrutura básica do HTML',
            duracao: '12:30',
            tipo: 'video',
            concluida: true,
          },
          { id: 5, titulo: 'Tags e elementos', duracao: '18:00', tipo: 'video', concluida: true },
          { id: 6, titulo: 'Formulários HTML', duracao: '22:15', tipo: 'video', concluida: true },
          { id: 7, titulo: 'HTML Semântico', duracao: '14:40', tipo: 'video', concluida: true },
        ],
      },
      {
        id: 3,
        titulo: 'CSS Moderno',
        expandido: false,
        aulas: [
          {
            id: 8,
            titulo: 'Seletores e propriedades',
            duracao: '16:00',
            tipo: 'video',
            concluida: true,
          },
          {
            id: 9,
            titulo: 'Flexbox dominado',
            duracao: '25:30',
            tipo: 'video',
            concluida: true,
          },
          {
            id: 10,
            titulo: 'CSS Grid Layout',
            duracao: '28:00',
            tipo: 'video',
            concluida: false,
          },
          {
            id: 11,
            titulo: 'Responsividade',
            duracao: '20:15',
            tipo: 'video',
            concluida: false,
          },
          {
            id: 12,
            titulo: 'Quiz: CSS',
            duracao: '10:00',
            tipo: 'quiz',
            concluida: false,
          },
        ],
      },
      {
        id: 4,
        titulo: 'JavaScript Essencial',
        expandido: false,
        aulas: [
          {
            id: 13,
            titulo: 'Variáveis e tipos de dados',
            duracao: '18:00',
            tipo: 'video',
            concluida: false,
          },
          { id: 14, titulo: 'Funções e escopo', duracao: '22:30', tipo: 'video', concluida: false },
          {
            id: 15,
            titulo: 'Arrays e Objetos',
            duracao: '25:00',
            tipo: 'video',
            concluida: false,
          },
          { id: 16, titulo: 'DOM Manipulation', duracao: '30:00', tipo: 'video', concluida: false },
        ],
      },
      {
        id: 5,
        titulo: 'React Fundamentos',
        expandido: false,
        aulas: [
          { id: 17, titulo: 'O que é React?', duracao: '12:00', tipo: 'video', concluida: false },
          {
            id: 18,
            titulo: 'Componentes e Props',
            duracao: '20:00',
            tipo: 'video',
            concluida: false,
          },
          { id: 19, titulo: 'State e Hooks', duracao: '28:00', tipo: 'video', concluida: false },
          { id: 20, titulo: 'Projeto prático', duracao: '45:00', tipo: 'video', concluida: false },
        ],
      },
    ],
  };

  sugestoes = [
    {
      id: 2,
      titulo: 'React Avançado com TypeScript',
      instrutor: 'Prof. Carlos Mendes',
      imagem: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      avaliacao: 4.9,
      totalAlunos: 850,
      gratuito: false,
      preco: 149.9,
    },
    {
      id: 3,
      titulo: 'Node.js e MongoDB: Backend Completo',
      instrutor: 'Mariana Costa',
      imagem: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
      avaliacao: 4.7,
      totalAlunos: 1200,
      gratuito: true,
      preco: 0,
    },
    {
      id: 4,
      titulo: 'UI/UX Design para Desenvolvedores',
      instrutor: 'Ricardo Alves',
      imagem: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=400',
      avaliacao: 4.8,
      totalAlunos: 560,
      gratuito: false,
      preco: 129.0,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // Simula inscrição automática para demonstração
    this.inscrito.set(true);
  }

  // Computed values
  get totalAulasConcluidas(): number {
    return this.curso.modulos.reduce((total, modulo) => {
      return total + modulo.aulas.filter((a) => a.concluida).length;
    }, 0);
  }

  get totalAulas(): number {
    return this.curso.modulos.reduce((total, modulo) => {
      return total + modulo.aulas.length;
    }, 0);
  }

  get progresso(): number {
    return Math.round((this.totalAulasConcluidas / this.totalAulas) * 100);
  }

  getAulasConcluidas(modulo: Modulo): number {
    return modulo.aulas.filter((a) => a.concluida).length;
  }

  isModuloConcluido(modulo: Modulo): boolean {
    return modulo.aulas.every((a) => a.concluida);
  }

  toggleModulo(modulo: Modulo): void {
    modulo.expandido = !modulo.expandido;
  }

  getNivelLabel(nivel: string): string {
    const labels: Record<string, string> = {
      iniciante: 'Iniciante',
      intermediario: 'Intermediário',
      avancado: 'Avançado',
    };
    return labels[nivel] || nivel;
  }

  formatarData(data: Date): string {
    return data.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric',
    });
  }

  inscreverCurso(): void {
    this.inscrito.set(true);
    // Aqui faria a chamada API para inscrever
  }

  setNota(nota: number): void {
    if (!this.avaliacaoEnviada) {
      this.novaNota = nota;
    }
  }

  enviarAvaliacao(): void {
    if (this.novaNota > 0 && this.novoComentario.trim()) {
      this.avaliacaoEnviada = true;
      console.log('Avaliação enviada:', { nota: this.novaNota, comentario: this.novoComentario });

      // Adiciona ao mock para visualização imediata
      this.avaliacoesMock.unshift({
        id: Date.now(),
        aluno: this.usuario.nome,
        nota: this.novaNota,
        data: new Date(),
        comentario: this.novoComentario,
        resposta: undefined,
      });
    }
  }

  getStars(nota: number): number[] {
    return Array(nota).fill(0);
  }

  acessarAula(aula: Aula): void {
    if (!aula.bloqueada) {
      this.router.navigate(['/aluno/curso', this.curso.id, 'aula', aula.id]);
    }
  }

  continuarCurso(): void {
    // Encontra a próxima aula não concluída
    for (const modulo of this.curso.modulos) {
      const proximaAula = modulo.aulas.find((a) => !a.concluida);
      if (proximaAula) {
        this.acessarAula(proximaAula);
        return;
      }
    }
  }

  getAulaIcone(aula: Aula): string {
    if (aula.concluida) return 'check-circle';
    if (aula.tipo === 'quiz') return 'questao';
    if (aula.tipo === 'material') return 'documento';
    return 'play';
  }

  getModuloIcone(modulo: Modulo): string {
    if (this.isModuloConcluido(modulo)) return 'check-circle';
    if (this.getAulasConcluidas(modulo) > 0) return 'play';
    return 'cursos';
  }
}
