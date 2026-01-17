import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../../../components/sistema/header/header.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { BarraProgressoComponent } from '../../../../components/sistema/barra-progresso/barra-progresso.component';
import {
  QuestaoComponent,
  Questao,
  RespostaQuestao,
  TipoQuestao,
} from '../../../../components/sistema/questao/questao.component';

interface Prova {
  id: number;
  titulo: string;
  descricao: string;
  curso: string;
  instrutor: string;
  tempoLimite: number; // em minutos
  tentativasRestantes: number;
  notaMinima: number;
  totalQuestoes: number;
  pontuacaoTotal: number;
  questoes: Questao[];
}

type StatusProva = 'instrucoes' | 'em-andamento' | 'revisao' | 'finalizada';

interface ResultadoProva {
  acertos: number;
  erros: number;
  emBranco: number;
  pontuacao: number;
  aprovado: boolean;
  tempoGasto: number;
}

@Component({
  selector: 'app-prova',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    BarraProgressoComponent,
    QuestaoComponent,
  ],
  templateUrl: './prova.component.html',
  styleUrl: './prova.component.scss',
})
export class ProvaComponent implements OnInit, OnDestroy {
  usuario: Usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
  };

  // Estado da prova
  statusProva = signal<StatusProva>('instrucoes');
  questaoAtualIndex = signal(0);
  respostas = signal<Map<number, string[]>>(new Map());
  tempoRestante = signal(0); // em segundos
  tempoInicial = 0;
  timerInterval: ReturnType<typeof setInterval> | null = null;
  mostrarNavegacao = signal(false);
  resultado = signal<ResultadoProva | null>(null);

  // Prova de exemplo (virá da API)
  prova: Prova = {
    id: 1,
    titulo: 'Avaliação Final - Angular Avançado',
    descricao:
      'Esta prova avalia seus conhecimentos em Angular, incluindo componentes, serviços, roteamento e boas práticas de desenvolvimento.',
    curso: 'Angular 18 Completo: Do Zero ao Avançado',
    instrutor: 'Carlos Mendes',
    tempoLimite: 30,
    tentativasRestantes: 2,
    notaMinima: 70,
    totalQuestoes: 10,
    pontuacaoTotal: 100,
    questoes: [
      {
        id: 1,
        numero: 1,
        enunciado: 'Qual decorator é utilizado para definir um componente em Angular?',
        tipo: 'unica',
        pontos: 10,
        alternativas: [
          { id: 'a', texto: '@NgModule', correta: false },
          { id: 'b', texto: '@Component', correta: true },
          { id: 'c', texto: '@Injectable', correta: false },
          { id: 'd', texto: '@Directive', correta: false },
        ],
        explicacao:
          'O decorator @Component é usado para definir uma classe como um componente Angular, incluindo seu template, estilos e seletor.',
      },
      {
        id: 2,
        numero: 2,
        enunciado:
          'Em Angular, os Signals são uma forma reativa de gerenciar estado que foi introduzida na versão 16.',
        tipo: 'verdadeiro-falso',
        pontos: 10,
        alternativas: [
          { id: 'v', texto: 'Verdadeiro', correta: true },
          { id: 'f', texto: 'Falso', correta: false },
        ],
        explicacao:
          'Correto! Os Signals foram introduzidos no Angular 16 como uma nova primitiva reativa para gerenciamento de estado.',
      },
      {
        id: 3,
        numero: 3,
        enunciado:
          'Quais dos seguintes são hooks de ciclo de vida válidos em Angular? (Selecione todos que se aplicam)',
        tipo: 'multipla',
        pontos: 10,
        alternativas: [
          { id: 'a', texto: 'ngOnInit', correta: true },
          { id: 'b', texto: 'ngOnMount', correta: false },
          { id: 'c', texto: 'ngOnDestroy', correta: true },
          { id: 'd', texto: 'ngAfterViewInit', correta: true },
          { id: 'e', texto: 'ngOnRender', correta: false },
        ],
        explicacao:
          'ngOnInit, ngOnDestroy e ngAfterViewInit são hooks válidos. ngOnMount e ngOnRender não existem no Angular.',
      },
      {
        id: 4,
        numero: 4,
        enunciado: 'Qual é a principal função do Angular Router?',
        tipo: 'unica',
        pontos: 10,
        alternativas: [
          { id: 'a', texto: 'Gerenciar estado da aplicação', correta: false },
          { id: 'b', texto: 'Fazer requisições HTTP', correta: false },
          {
            id: 'c',
            texto: 'Navegar entre diferentes views/componentes',
            correta: true,
          },
          { id: 'd', texto: 'Validar formulários', correta: false },
        ],
        explicacao:
          'O Angular Router é responsável por gerenciar a navegação entre diferentes views e componentes da aplicação.',
      },
      {
        id: 5,
        numero: 5,
        enunciado: 'Standalone components podem ser usados sem declarar em um NgModule.',
        tipo: 'verdadeiro-falso',
        pontos: 10,
        alternativas: [
          { id: 'v', texto: 'Verdadeiro', correta: true },
          { id: 'f', texto: 'Falso', correta: false },
        ],
        explicacao:
          'Standalone components são auto-suficientes e não precisam ser declarados em um NgModule.',
      },
      {
        id: 6,
        numero: 6,
        enunciado:
          'Quais são formas válidas de passar dados para um componente filho? (Selecione todos que se aplicam)',
        tipo: 'multipla',
        pontos: 10,
        alternativas: [
          { id: 'a', texto: '@Input()', correta: true },
          { id: 'b', texto: '@Output()', correta: false },
          { id: 'c', texto: 'Serviço compartilhado', correta: true },
          { id: 'd', texto: 'Content projection', correta: true },
        ],
        explicacao:
          '@Input() recebe dados do pai, serviços compartilhados permitem compartilhar estado, e content projection projeta conteúdo. @Output() é para enviar dados DO filho PARA o pai.',
      },
      {
        id: 7,
        numero: 7,
        enunciado:
          'Qual operador RxJS é usado para transformar os dados emitidos por um Observable?',
        tipo: 'unica',
        pontos: 10,
        alternativas: [
          { id: 'a', texto: 'filter', correta: false },
          { id: 'b', texto: 'map', correta: true },
          { id: 'c', texto: 'subscribe', correta: false },
          { id: 'd', texto: 'tap', correta: false },
        ],
        explicacao:
          'O operador map transforma os dados emitidos. filter filtra, tap executa efeitos colaterais, e subscribe se inscreve no Observable.',
      },
      {
        id: 8,
        numero: 8,
        enunciado: 'O HttpClient do Angular retorna Promises por padrão.',
        tipo: 'verdadeiro-falso',
        pontos: 10,
        alternativas: [
          { id: 'v', texto: 'Verdadeiro', correta: false },
          { id: 'f', texto: 'Falso', correta: true },
        ],
        explicacao:
          'O HttpClient retorna Observables por padrão, não Promises. Isso permite cancelamento, retry e outras funcionalidades reativas.',
      },
      {
        id: 9,
        numero: 9,
        enunciado:
          'Quais são características de um Pipe puro (pure pipe) em Angular? (Selecione todos que se aplicam)',
        tipo: 'multipla',
        pontos: 10,
        alternativas: [
          {
            id: 'a',
            texto: 'É executado apenas quando a referência do input muda',
            correta: true,
          },
          {
            id: 'b',
            texto: 'É executado a cada ciclo de detecção de mudanças',
            correta: false,
          },
          { id: 'c', texto: 'É mais performático', correta: true },
          { id: 'd', texto: 'É o comportamento padrão', correta: true },
        ],
        explicacao:
          'Pure pipes são executados apenas quando a referência muda, são mais performáticos e são o padrão no Angular.',
      },
      {
        id: 10,
        numero: 10,
        enunciado: 'Qual diretiva estrutural é usada para renderizar uma lista de itens?',
        tipo: 'unica',
        pontos: 10,
        alternativas: [
          { id: 'a', texto: '*ngIf', correta: false },
          { id: 'b', texto: '*ngFor', correta: true },
          { id: 'c', texto: '*ngSwitch', correta: false },
          { id: 'd', texto: '*ngClass', correta: false },
        ],
        explicacao: '*ngFor itera sobre uma coleção e renderiza um template para cada item.',
      },
    ],
  };

  // Computed values
  questaoAtual = computed(() => this.prova.questoes[this.questaoAtualIndex()]);

  progresso = computed(() => {
    const respondidas = this.respostas().size;
    return Math.round((respondidas / this.prova.totalQuestoes) * 100);
  });

  tempoFormatado = computed(() => {
    const segundos = this.tempoRestante();
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
  });

  tempoGastoFormatado = computed(() => {
    if (!this.resultado()) return '';
    const segundos = this.resultado()!.tempoGasto;
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min}min ${seg}s`;
  });

  isTempoEsgotando = computed(() => {
    return this.tempoRestante() <= 60; // Último minuto
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.tempoRestante.set(this.prova.tempoLimite * 60);
    this.tempoInicial = this.prova.tempoLimite * 60;
  }

  ngOnDestroy(): void {
    this.pararTimer();
  }

  // Timer
  iniciarTimer(): void {
    this.timerInterval = setInterval(() => {
      const atual = this.tempoRestante();
      if (atual <= 0) {
        this.finalizarProva();
      } else {
        this.tempoRestante.set(atual - 1);
      }
    }, 1000);
  }

  pararTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  // Navegação
  iniciarProva(): void {
    this.statusProva.set('em-andamento');
    this.iniciarTimer();
  }

  irParaQuestao(index: number): void {
    this.questaoAtualIndex.set(index);
    this.mostrarNavegacao.set(false);
  }

  proximaQuestao(): void {
    if (this.questaoAtualIndex() < this.prova.totalQuestoes - 1) {
      this.questaoAtualIndex.update((i) => i + 1);
    }
  }

  questaoAnterior(): void {
    if (this.questaoAtualIndex() > 0) {
      this.questaoAtualIndex.update((i) => i - 1);
    }
  }

  toggleNavegacao(): void {
    this.mostrarNavegacao.update((v) => !v);
  }

  // Respostas
  onRespostaChange(resposta: RespostaQuestao): void {
    this.respostas.update((map) => {
      const novoMap = new Map(map);
      novoMap.set(resposta.questaoId, resposta.respostas);
      return novoMap;
    });
  }

  getRespostaQuestao(questaoId: number): string[] {
    return this.respostas().get(questaoId) || [];
  }

  isQuestaoRespondida(questaoId: number): boolean {
    const resposta = this.respostas().get(questaoId);
    return resposta !== undefined && resposta.length > 0;
  }

  getStatusQuestao(questao: Questao): 'respondida' | 'atual' | 'pendente' {
    if (questao.id === this.questaoAtual().id) return 'atual';
    if (this.isQuestaoRespondida(questao.id)) return 'respondida';
    return 'pendente';
  }

  // Revisão
  irParaRevisao(): void {
    this.pararTimer();
    this.statusProva.set('revisao');
    this.questaoAtualIndex.set(0);
  }

  voltarParaProva(): void {
    this.statusProva.set('em-andamento');
    this.iniciarTimer();
  }

  // Finalização
  finalizarProva(): void {
    this.pararTimer();
    this.calcularResultado();
    this.statusProva.set('finalizada');
  }

  calcularResultado(): void {
    let acertos = 0;
    let erros = 0;
    let emBranco = 0;
    let pontuacao = 0;

    for (const questao of this.prova.questoes) {
      const respostaAluno = this.respostas().get(questao.id) || [];

      if (respostaAluno.length === 0) {
        emBranco++;
        continue;
      }

      const alternativasCorretas = questao.alternativas.filter((a) => a.correta).map((a) => a.id);

      const acertou =
        alternativasCorretas.length === respostaAluno.length &&
        alternativasCorretas.every((id) => respostaAluno.includes(id));

      if (acertou) {
        acertos++;
        pontuacao += questao.pontos;
      } else {
        erros++;
      }
    }

    const tempoGasto = this.tempoInicial - this.tempoRestante();

    this.resultado.set({
      acertos,
      erros,
      emBranco,
      pontuacao,
      aprovado: pontuacao >= this.prova.notaMinima,
      tempoGasto,
    });
  }

  refazerProva(): void {
    this.respostas.set(new Map());
    this.tempoRestante.set(this.prova.tempoLimite * 60);
    this.questaoAtualIndex.set(0);
    this.resultado.set(null);
    this.statusProva.set('instrucoes');
  }

  voltarParaCurso(): void {
    this.router.navigate(['/aluno/meus-cursos']);
  }

  // Helpers
  get questoesNaoRespondidas(): number {
    return this.prova.totalQuestoes - this.respostas().size;
  }
}
