import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { ModalComponent } from '../../../../components/comum/modal/modal.component';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { PromptService } from '../../../../core/service/prompt.service';
import { AlertaService } from '../../../../core/service/alerta.service';
import { ConteudoItemComponent } from './conteudo-item/conteudo-item.component';

interface ItemConteudo {
  id: number;
  titulo: string;
  descricao?: string;
  tipo: 'aula' | 'quiz' | 'prova' | 'recurso';
  duracao?: string;
  completo: boolean;
  videoUrl?: string;
  videoFile?: File;
  recursos?: Recurso[];
  mostrarRecursos?: boolean;
  tipoRecurso?: 'documento' | 'texto' | 'link';
  conteudoTexto?: string;
  arquivoUrl?: string;
  linkExterno?: string;
  notaMinima?: number;
}

interface Recurso {
  id: number;
  titulo: string;
  tipo: 'documento' | 'texto' | 'link';
  conteudo?: string;
  arquivoUrl?: string;
  linkExterno?: string;
  tipoArquivo?: string;
}

interface Secao {
  id: number;
  titulo: string;
  aberto: boolean;
  menuAberto?: boolean;
  itens: ItemConteudo[];
}

type ModalType = 'aula' | 'quiz' | 'prova' | 'recurso' | null;

@Component({
  selector: 'app-curso-estrutura',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    ModalComponent,
    DragDropModule,
    FormsModule,
    ConteudoItemComponent,
  ],
  templateUrl: './curso-estrutura.component.html',
  styleUrl: './curso-estrutura.component.scss',
})
export class CursoEstruturaComponent implements OnInit {
  cursoId: string | null = null;
  secoes: Secao[] = [];
  statusCurso: 'rascunho' | 'em_analise' | 'aprovado' | 'rejeitado' = 'rascunho';

  // Modal
  modalAberto: ModalType = null;
  secaoAtual: Secao | null = null;
  itemEditando: ItemConteudo | null = null;

  // Form data
  novoItem = {
    id: 0,
    titulo: '',
    descricao: '',
    duracao: '',
    videoUrl: '',
    videoFile: null as File | null,
    tipoRecurso: 'documento' as 'documento' | 'texto' | 'link',
    conteudoTexto: '',
    linkExterno: '',
    notaMinima: 70,
  };

  dragOver = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmService: ConfirmService,
    private promptService: PromptService,
    private alertaService: AlertaService,
  ) {}

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    this.carregarStatusCurso();
    this.carregarEstrutura();
  }

  preVisualizarCurso() {
    if (this.cursoId) {
      this.router.navigate(['/instrutor/cursos', this.cursoId, 'preview']);
    }
  }

  carregarStatusCurso() {
    this.statusCurso = 'aprovado';
  }

  isCursoAprovado(): boolean {
    return this.statusCurso === 'aprovado';
  }

  verificarPermissaoEdicao(): boolean {
    if (!this.isCursoAprovado()) {
      this.alertaService.aviso(
        'Este curso precisa ser aprovado antes de adicionar conteúdo. Acesse a página de Planejamento para enviar para análise.',
      );
      return false;
    }
    return true;
  }

  carregarEstrutura() {
    this.secoes = [
      {
        id: 1,
        titulo: 'Introdução ao Curso',
        aberto: false,
        itens: [
          { id: 101, titulo: 'Bem-vindo ao curso!', tipo: 'aula', duracao: '5min', completo: true },
          {
            id: 102,
            titulo: 'Como aproveitar ao máximo este curso',
            tipo: 'aula',
            duracao: '8min',
            completo: true,
          },
          { id: 103, titulo: 'Materiais de apoio - Guia inicial', tipo: 'recurso', completo: true },
          {
            id: 104,
            titulo: 'Quiz de nivelamento',
            tipo: 'quiz',
            duracao: '10min',
            completo: true,
          },
        ],
      },
      {
        id: 2,
        titulo: 'Fundamentos e Conceitos Básicos',
        aberto: false,
        itens: [
          {
            id: 201,
            titulo: 'Conceitos fundamentais',
            tipo: 'aula',
            duracao: '15min',
            completo: true,
          },
          {
            id: 202,
            titulo: 'Primeiros passos práticos',
            tipo: 'aula',
            duracao: '20min',
            completo: true,
          },
          { id: 203, titulo: 'Slides da aula', tipo: 'recurso', completo: true },
          {
            id: 204,
            titulo: 'Exercícios práticos',
            tipo: 'quiz',
            duracao: '15min',
            completo: false,
          },
          {
            id: 205,
            titulo: 'Avaliação do módulo',
            tipo: 'prova',
            duracao: '30min',
            completo: false,
          },
        ],
      },
      {
        id: 3,
        titulo: 'Projeto Prático',
        aberto: false,
        itens: [
          {
            id: 301,
            titulo: 'Apresentação do projeto',
            tipo: 'aula',
            duracao: '12min',
            completo: false,
          },
          {
            id: 302,
            titulo: 'Parte 1: Setup inicial',
            tipo: 'aula',
            duracao: '25min',
            completo: false,
          },
          { id: 303, titulo: 'Código fonte do projeto', tipo: 'recurso', completo: false },
        ],
      },
    ];
    this.restaurarEstadoSecoes();
  }

  restaurarEstadoSecoes() {
    try {
      const estadoSalvo = localStorage.getItem(`curso-${this.cursoId}-secoes-estado`);
      if (estadoSalvo) {
        const estado = JSON.parse(estadoSalvo);
        this.secoes.forEach((secao) => {
          if (estado[secao.id] !== undefined) {
            secao.aberto = estado[secao.id];
          }
        });
      }
    } catch (error) {
      console.error('Erro ao restaurar estado das seções:', error);
    }
  }

  salvarEstadoSecoes() {
    try {
      const estado: { [key: number]: boolean } = {};
      this.secoes.forEach((secao) => {
        estado[secao.id] = secao.aberto;
      });
      localStorage.setItem(`curso-${this.cursoId}-secoes-estado`, JSON.stringify(estado));
    } catch (error) {
      console.error('Erro ao salvar estado das seções:', error);
    }
  }

  toggleSecao(secao: Secao) {
    secao.aberto = !secao.aberto;
    this.salvarEstadoSecoes();
  }

  abrirMenuAdicionar(secao: Secao, event: Event) {
    event.stopPropagation();
    this.secoes.forEach((s) => {
      if (s.id !== secao.id && s.menuAberto) {
        s.menuAberto = false;
      }
    });
    secao.menuAberto = true;
  }

  fecharTodosMenus() {
    this.secoes.forEach((s) => {
      s.menuAberto = false;
    });
  }

  async abrirModalNovoModulo() {
    if (!this.verificarPermissaoEdicao()) return;

    const titulo = await this.promptService.prompt(
      'Nova Seção',
      'Digite o título para a nova seção do curso:',
      '',
      'Ex: Fundamentos do React',
    );

    if (titulo) {
      const novaSecao: Secao = {
        id: Date.now(),
        titulo: titulo,
        aberto: false,
        itens: [],
      };
      this.secoes.push(novaSecao);
    }
  }

  async editarSecao(secao: Secao) {
    if (!this.verificarPermissaoEdicao()) return;

    const novoTitulo = await this.promptService.prompt(
      'Editar Seção',
      'Digite o novo título da seção',
      secao.titulo,
    );

    if (novoTitulo && novoTitulo !== secao.titulo) {
      secao.titulo = novoTitulo;
    }
  }

  async excluirSecao(secao: Secao) {
    if (!this.verificarPermissaoEdicao()) return;

    const confirmado = await this.confirmService.confirmar(
      'Excluir Seção',
      `Tem certeza que deseja excluir a seção "${secao.titulo}"? Todos os conteúdos desta seção serão perdidos.`,
      'Excluir',
      'Cancelar',
    );

    if (confirmado) {
      this.secoes = this.secoes.filter((s) => s.id !== secao.id);
    }
  }

  async adicionarItem(secao: Secao, tipo: 'aula' | 'quiz' | 'prova' | 'recurso', event: Event) {
    event.stopPropagation();

    if (!this.verificarPermissaoEdicao()) {
      return;
    }

    secao.menuAberto = false;

    const routeMap = {
      aula: 'aula-editor',
      quiz: 'quiz-editor',
      prova: 'prova-editor',
      recurso: 'recurso-editor',
    };

    this.router.navigate([`/instrutor/cursos/${this.cursoId}/${routeMap[tipo]}`], {
      queryParams: {
        secaoId: secao.id,
        secaoTitulo: secao.titulo,
        modo: 'criar',
      },
    });
  }

  limparForm() {
    this.novoItem = {
      id: 0,
      titulo: '',
      descricao: '',
      duracao: '',
      videoUrl: '',
      videoFile: null,
      tipoRecurso: 'documento',
      conteudoTexto: '',
      linkExterno: '',
      notaMinima: 70,
    };
    this.dragOver = false;
  }

  fecharModal() {
    this.modalAberto = null;
    this.secaoAtual = null;
    this.itemEditando = null;
    this.limparForm();
  }

  salvarItem() {
    if (!this.novoItem.titulo.trim()) {
      this.alertaService.erro('Digite o título');
      return;
    }

    if (this.modalAberto === 'aula' && !this.novoItem.descricao.trim()) {
      this.alertaService.erro('Digite a descrição da aula');
      return;
    }

    if (
      (this.modalAberto === 'quiz' || this.modalAberto === 'prova') &&
      !this.novoItem.descricao.trim()
    ) {
      this.alertaService.erro('Digite a descrição');
      return;
    }

    if (this.modalAberto === 'recurso' && !this.novoItem.descricao.trim()) {
      this.alertaService.erro('Digite a descrição do recurso');
      return;
    }

    if (this.itemEditando) {
      // Editando item existente
      this.itemEditando.titulo = this.novoItem.titulo;
      this.itemEditando.descricao = this.novoItem.descricao;

      if (this.modalAberto === 'aula') {
        this.itemEditando.duracao = this.novoItem.duracao || '0min';
        this.itemEditando.videoUrl = this.novoItem.videoUrl;
        this.itemEditando.videoFile = this.novoItem.videoFile || undefined;
      } else if (this.modalAberto === 'quiz' || this.modalAberto === 'prova') {
        this.itemEditando.duracao = this.novoItem.duracao || '0min';
        this.itemEditando.notaMinima = this.novoItem.notaMinima;
      } else if (this.modalAberto === 'recurso') {
        this.itemEditando.tipoRecurso = this.novoItem.tipoRecurso;
        if (this.novoItem.tipoRecurso === 'texto') {
          this.itemEditando.conteudoTexto = this.novoItem.conteudoTexto;
        } else if (this.novoItem.tipoRecurso === 'link') {
          this.itemEditando.linkExterno = this.novoItem.linkExterno;
        }
      }

      this.alertaService.sucesso('Item atualizado com sucesso!');
    } else {
      // Criando novo item
      const novoItemConteudo: ItemConteudo = {
        id: Date.now(),
        titulo: this.novoItem.titulo,
        descricao: this.novoItem.descricao,
        tipo: this.modalAberto!,
        completo: false,
      };

      if (this.modalAberto === 'aula') {
        novoItemConteudo.duracao = this.novoItem.duracao || '0min';
        novoItemConteudo.videoUrl = this.novoItem.videoUrl;
        novoItemConteudo.videoFile = this.novoItem.videoFile || undefined;
      } else if (this.modalAberto === 'quiz' || this.modalAberto === 'prova') {
        novoItemConteudo.duracao = this.novoItem.duracao || '0min';
        novoItemConteudo.notaMinima = this.novoItem.notaMinima;
      } else if (this.modalAberto === 'recurso') {
        novoItemConteudo.tipoRecurso = this.novoItem.tipoRecurso;
        if (this.novoItem.tipoRecurso === 'texto') {
          novoItemConteudo.conteudoTexto = this.novoItem.conteudoTexto;
        } else if (this.novoItem.tipoRecurso === 'link') {
          novoItemConteudo.linkExterno = this.novoItem.linkExterno;
        }
      }

      this.secaoAtual?.itens.push(novoItemConteudo);
      this.alertaService.sucesso('Item adicionado com sucesso!');
    }

    this.fecharModal();
  }

  onVideoFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      this.novoItem.videoFile = file;
      this.novoItem.videoUrl = URL.createObjectURL(file);
    } else {
      this.alertaService.erro('Por favor, selecione um arquivo de vídeo válido');
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  onVideoDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
        this.novoItem.videoFile = file;
        this.novoItem.videoUrl = URL.createObjectURL(file);
      } else {
        this.alertaService.erro('Por favor, solte um arquivo de vídeo válido');
      }
    }
  }

  onArquivoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const tiposPermitidos = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      ];

      if (tiposPermitidos.includes(file.type)) {
        // Simula upload do arquivo
        this.novoItem.linkExterno = URL.createObjectURL(file);
        this.alertaService.sucesso(`Arquivo "${file.name}" carregado com sucesso!`);
      } else {
        this.alertaService.erro(
          'Tipo de arquivo não permitido. Envie PDF, Word, Excel ou PowerPoint.',
        );
      }
    }
  }

  editarItem(secao: Secao, item: ItemConteudo) {
    if (!this.verificarPermissaoEdicao()) return;

    const routeMap = {
      aula: 'aula-editor',
      quiz: 'quiz-editor',
      prova: 'prova-editor',
      recurso: 'recurso-editor',
    };

    this.router.navigate([`/instrutor/cursos/${this.cursoId}/${routeMap[item.tipo]}`], {
      queryParams: {
        secaoId: secao.id,
        secaoTitulo: secao.titulo,
        itemId: item.id,
        modo: 'editar',
      },
    });
  }

  async excluirItem(secao: Secao, item: ItemConteudo) {
    if (!this.verificarPermissaoEdicao()) return;

    const confirmado = await this.confirmService.confirmar(
      'Excluir Item',
      `Deseja realmente excluir "${item.titulo}"?`,
    );

    if (confirmado) {
      secao.itens = secao.itens.filter((i) => i.id !== item.id);
    }
  }

  getIconeItem(tipo: string): string {
    const icones: Record<string, string> = {
      aula: 'video',
      quiz: 'certificados',
      prova: 'verificar',
      recurso: 'documento',
    };
    return icones[tipo] || 'documento';
  }

  getTipoLabel(tipo: string): string {
    const labels: Record<string, string> = {
      aula: 'Aula',
      quiz: 'Quiz',
      prova: 'Prova',
      recurso: 'Recurso',
    };
    return labels[tipo] || tipo;
  }

  calcularDuracaoSecao(secao: Secao): string {
    const totalMinutos = secao.itens.reduce((total, item) => {
      if (item.duracao) {
        const min = parseInt(item.duracao.replace('min', ''));
        return total + (isNaN(min) ? 0 : min);
      }
      return total;
    }, 0);

    if (totalMinutos >= 60) {
      const horas = Math.floor(totalMinutos / 60);
      const minutos = totalMinutos % 60;
      return `${horas}h ${minutos}min`;
    }
    return `${totalMinutos}min`;
  }

  getTotalSecoes(): number {
    return this.secoes.length;
  }

  getTotalAulas(): number {
    return this.secoes.reduce((total, secao) => {
      return total + secao.itens.filter((i) => i.tipo === 'aula').length;
    }, 0);
  }

  getTotalQuizzes(): number {
    return this.secoes.reduce((total, secao) => {
      return total + secao.itens.filter((i) => i.tipo === 'quiz' || i.tipo === 'prova').length;
    }, 0);
  }

  getTotalRecursos(): number {
    let total = 0;
    this.secoes.forEach((secao) => {
      secao.itens.forEach((item) => {
        if (item.tipo === 'recurso') {
          total++;
        }
        // Conta recursos anexados em aulas
        if (item.recursos && item.recursos.length > 0) {
          total += item.recursos.length;
        }
      });
    });
    return total;
  }

  dropSecao(event: CdkDragDrop<Secao[]>) {
    moveItemInArray(this.secoes, event.previousIndex, event.currentIndex);
  }

  dropItem(event: CdkDragDrop<ItemConteudo[]>, secao: Secao) {
    moveItemInArray(secao.itens, event.previousIndex, event.currentIndex);
  }

  toggleRecursosAula(item: ItemConteudo) {
    item.mostrarRecursos = !item.mostrarRecursos;
  }

  adicionarRecursoAula(item: ItemConteudo) {
    if (!this.verificarPermissaoEdicao()) return;
    this.modalAberto = 'recurso';
    this.limparForm();
  }

  async excluirRecursoAula(item: ItemConteudo, recurso: Recurso) {
    if (!this.verificarPermissaoEdicao()) return;

    const confirmado = await this.confirmService.confirmar(
      'Excluir Recurso',
      `Tem certeza que deseja excluir "${recurso.titulo}"?`,
    );

    if (confirmado) {
      if (item.recursos) {
        item.recursos = item.recursos.filter((r) => r.id !== recurso.id);
      }
    }
  }
}
