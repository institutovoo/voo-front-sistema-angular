import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { LogoComponent } from '../../../../components/logo/logo.component';

export interface Aula {
  id: number;
  titulo: string;
  duracao: string;
  tipo: 'video' | 'quiz' | 'material';
  concluida: boolean;
  videoUrl?: string;
}

export interface Modulo {
  id: number;
  titulo: string;
  aulas: Aula[];
}

@Component({
  selector: 'app-curso-player',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderIconeComponent,
    LogoComponent,
  ],
  templateUrl: './curso-player.component.html',
  styleUrl: './curso-player.component.scss',
})
export class CursoPlayerComponent {
  sidebarAberta = signal(true);
  aulaAtualId = signal(8);
  cursoId = signal(1);

  // Dados do curso
  curso = {
    id: 1,
    titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
    categoria: 'Programação',
    categoriaColor: '#3b82f6',
  };

  modulos: Modulo[] = [
    {
      id: 1,
      titulo: 'Introdução ao Desenvolvimento Web',
      aulas: [
        {
          id: 1,
          titulo: 'Bem-vindo ao curso',
          duracao: '5:30',
          tipo: 'video',
          concluida: true,
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        },
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
      aulas: [
        {
          id: 8,
          titulo: 'Seletores e propriedades',
          duracao: '16:00',
          tipo: 'video',
          concluida: false,
        },
        {
          id: 9,
          titulo: 'Flexbox dominado',
          duracao: '25:30',
          tipo: 'video',
          concluida: false,
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
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.proximaAula();
    } else if (event.key === 'ArrowLeft') {
      this.aulaAnterior();
    }
  }

  get aulaAtual(): Aula | undefined {
    for (const modulo of this.modulos) {
      const aula = modulo.aulas.find((a) => a.id === this.aulaAtualId());
      if (aula) return aula;
    }
    return undefined;
  }

  get moduloAtual(): Modulo | undefined {
    for (const modulo of this.modulos) {
      if (modulo.aulas.some((a) => a.id === this.aulaAtualId())) {
        return modulo;
      }
    }
    return undefined;
  }

  get todasAulas(): Aula[] {
    return this.modulos.flatMap((m) => m.aulas);
  }

  get aulaAtualIndex(): number {
    return this.todasAulas.findIndex((a) => a.id === this.aulaAtualId());
  }

  get totalAulasConcluidas(): number {
    return this.todasAulas.filter((a) => a.concluida).length;
  }

  get totalAulas(): number {
    return this.todasAulas.length;
  }

  get progresso(): number {
    return Math.round((this.totalAulasConcluidas / this.totalAulas) * 100);
  }

  get temProximaAula(): boolean {
    return this.aulaAtualIndex < this.todasAulas.length - 1;
  }

  get temAulaAnterior(): boolean {
    return this.aulaAtualIndex > 0;
  }

  toggleSidebar(): void {
    this.sidebarAberta.update((v) => !v);
  }

  selecionarAula(aula: Aula): void {
    this.aulaAtualId.set(aula.id);
  }

  proximaAula(): void {
    if (this.temProximaAula) {
      const proxima = this.todasAulas[this.aulaAtualIndex + 1];
      this.marcarComoConcluida();
      this.aulaAtualId.set(proxima.id);
    }
  }

  aulaAnterior(): void {
    if (this.temAulaAnterior) {
      const anterior = this.todasAulas[this.aulaAtualIndex - 1];
      this.aulaAtualId.set(anterior.id);
    }
  }

  marcarComoConcluida(): void {
    const aula = this.aulaAtual;
    if (aula) {
      aula.concluida = true;
    }
  }

  voltarParaCurso(): void {
    this.router.navigate(['/aluno/curso', this.cursoId()]);
  }

  getAulaIcone(aula: Aula): string {
    if (aula.concluida) return 'check-circle';
    if (aula.tipo === 'quiz') return 'questao';
    if (aula.tipo === 'material') return 'documento';
    return 'play';
  }

  getAulasConcluidas(modulo: Modulo): number {
    return modulo.aulas.filter((a) => a.concluida).length;
  }
}
