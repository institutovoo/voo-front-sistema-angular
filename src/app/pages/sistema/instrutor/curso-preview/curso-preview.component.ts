import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { BarraProgressoComponent } from '../../../../components/sistema/barra-progresso/barra-progresso.component';
import { FormsModule } from '@angular/forms';

interface Aula {
  id: number;
  titulo: string;
  duracao: string;
  tipo: 'video' | 'quiz' | 'material' | 'prova';
  concluida: boolean;
  bloqueada?: boolean;
}

interface Modulo {
  id: number;
  titulo: string;
  aulas: Aula[];
  expandido?: boolean;
}

interface CursoCompleto {
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

@Component({
  selector: 'app-curso-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    BarraProgressoComponent,
    FormsModule,
  ],
  templateUrl: './curso-preview.component.html',
  styleUrl: './curso-preview.component.scss',
})
export class CursoPreviewComponent implements OnInit {
  cursoId = signal<number>(1);

  curso: CursoCompleto = {
    id: 1,
    titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
    descricao:
      'Aprenda a criar aplicações web completas do zero, dominando tanto o frontend quanto o backend. Este curso abrangente cobre HTML, CSS, JavaScript, React, Node.js e muito mais.',
    categoria: 'Programação',
    categoriaColor: '#3b82f6',
    instrutor: {
      nome: 'Ana Paula Silva',
      avatar: 'https://i.pravatar.cc/150?img=47',
      bio: 'Desenvolvedora Full Stack com 8 anos de experiência. Apaixonada por ensinar programação e ajudar pessoas a alcançarem seus objetivos na área tech.',
    },
    imagem: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    videoPreview: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    preco: 149.99,
    precoOriginal: 249.99,
    gratuito: false,
    totalAulas: 150,
    duracao: '40 horas',
    nivel: 'intermediario',
    avaliacao: 4.8,
    totalAvaliacoes: 2453,
    totalAlunos: 8924,
    modulos: [
      {
        id: 1,
        titulo: 'Introdução ao Desenvolvimento Web',
        expandido: true,
        aulas: [
          {
            id: 1,
            titulo: 'Bem-vindo ao curso',
            duracao: '5:30',
            tipo: 'video',
            concluida: false,
          },
          {
            id: 2,
            titulo: 'O que você vai aprender',
            duracao: '8:45',
            tipo: 'video',
            concluida: false,
          },
          {
            id: 3,
            titulo: 'Configurando o ambiente',
            duracao: '15:20',
            tipo: 'video',
            concluida: false,
          },
          {
            id: 4,
            titulo: 'Quiz: Fundamentos Web',
            duracao: '10:00',
            tipo: 'quiz',
            concluida: false,
          },
        ],
      },
      {
        id: 2,
        titulo: 'HTML Fundamental',
        aulas: [
          {
            id: 5,
            titulo: 'Estrutura básica do HTML',
            duracao: '12:30',
            tipo: 'video',
            concluida: false,
          },
          {
            id: 6,
            titulo: 'Tags e elementos',
            duracao: '18:00',
            tipo: 'video',
            concluida: false,
          },
          {
            id: 7,
            titulo: 'Formulários HTML',
            duracao: '22:15',
            tipo: 'video',
            concluida: false,
          },
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
            titulo: 'Flexbox e Grid Layout',
            duracao: '28:30',
            tipo: 'video',
            concluida: false,
          },
          {
            id: 10,
            titulo: 'Prova Final - CSS',
            duracao: '30:00',
            tipo: 'prova',
            concluida: false,
          },
        ],
      },
    ],
    inclui: [
      '40 horas de vídeo sob demanda',
      '150 aulas distribuídas em módulos',
      'Projetos práticos reais',
      'Certificado de conclusão',
      'Acesso vitalício',
      'Suporte do instrutor',
      'Comunidade de alunos',
    ],
    certificado: true,
    atualizado: new Date('2025-12-15'),
    idioma: 'Português',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoId.set(parseInt(id));
      // Aqui você carregaria os dados do curso da API
    }
  }

  voltarParaEstrutura() {
    this.router.navigate(['/instrutor/cursos', this.cursoId(), 'estrutura']);
  }

  toggleModulo(modulo: Modulo) {
    modulo.expandido = !modulo.expandido;
  }

  getTotalAulasModulo(modulo: Modulo): number {
    return modulo.aulas.length;
  }

  getDuracaoTotalModulo(modulo: Modulo): string {
    const totalMinutos = modulo.aulas.reduce((acc, aula) => {
      if (aula.duracao) {
        const [min, seg] = aula.duracao.split(':').map(Number);
        return acc + min + (seg > 0 ? 1 : 0);
      }
      return acc;
    }, 0);

    const horas = Math.floor(totalMinutos / 60);
    const minutos = totalMinutos % 60;

    if (horas > 0) {
      return `${horas}h ${minutos}min`;
    }
    return `${minutos}min`;
  }

  getNivelTexto(nivel: string): string {
    const niveis: { [key: string]: string } = {
      iniciante: 'Iniciante',
      intermediario: 'Intermediário',
      avancado: 'Avançado',
    };
    return niveis[nivel] || nivel;
  }

  getIconeAula(tipo: string): string {
    const icones: { [key: string]: string } = {
      video: 'video',
      quiz: 'quiz',
      material: 'documento',
      prova: 'prova',
    };
    return icones[tipo] || 'video';
  }
}
