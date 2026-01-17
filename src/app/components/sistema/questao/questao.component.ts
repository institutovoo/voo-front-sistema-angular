import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderIconeComponent } from '../header/components/icone/icone.component';

export type TipoQuestao = 'unica' | 'multipla' | 'verdadeiro-falso';

export interface Alternativa {
  id: string;
  texto: string;
  correta?: boolean;
}

export interface Questao {
  id: number;
  numero: number;
  enunciado: string;
  tipo: TipoQuestao;
  alternativas: Alternativa[];
  pontos: number;
  explicacao?: string;
  imagemUrl?: string;
}

export interface RespostaQuestao {
  questaoId: number;
  respostas: string[]; // IDs das alternativas selecionadas
}

@Component({
  selector: 'app-questao',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderIconeComponent],
  templateUrl: './questao.component.html',
  styleUrl: './questao.component.scss',
})
export class QuestaoComponent {
  @Input() questao!: Questao;
  @Input() respostaAtual: string[] = [];
  @Input() modoRevisao: boolean = false;
  @Input() mostrarResposta: boolean = false;

  @Output() respostaChange = new EventEmitter<RespostaQuestao>();

  get tipoLabel(): string {
    const labels: Record<TipoQuestao, string> = {
      unica: 'Escolha única',
      multipla: 'Múltipla escolha',
      'verdadeiro-falso': 'Verdadeiro ou Falso',
    };
    return labels[this.questao.tipo];
  }

  get tipoIcone(): string {
    const icones: Record<TipoQuestao, string> = {
      unica: 'check-circle',
      multipla: 'check',
      'verdadeiro-falso': 'check',
    };
    return icones[this.questao.tipo];
  }

  isSelected(alternativaId: string): boolean {
    return this.respostaAtual.includes(alternativaId);
  }

  isCorreta(alternativa: Alternativa): boolean {
    return alternativa.correta === true;
  }

  getAlternativaClass(alternativa: Alternativa): string {
    const classes: string[] = ['questao__alternativa'];

    if (this.isSelected(alternativa.id)) {
      classes.push('questao__alternativa--selecionada');
    }

    if (this.mostrarResposta) {
      if (alternativa.correta) {
        classes.push('questao__alternativa--correta');
      } else if (this.isSelected(alternativa.id) && !alternativa.correta) {
        classes.push('questao__alternativa--incorreta');
      }
    }

    return classes.join(' ');
  }

  onAlternativaClick(alternativa: Alternativa): void {
    if (this.modoRevisao && this.mostrarResposta) return;

    let novasRespostas: string[];

    if (this.questao.tipo === 'multipla') {
      // Múltipla escolha: toggle da seleção
      if (this.isSelected(alternativa.id)) {
        novasRespostas = this.respostaAtual.filter((id) => id !== alternativa.id);
      } else {
        novasRespostas = [...this.respostaAtual, alternativa.id];
      }
    } else {
      // Escolha única ou V/F: substitui a seleção
      novasRespostas = [alternativa.id];
    }

    this.respostaChange.emit({
      questaoId: this.questao.id,
      respostas: novasRespostas,
    });
  }

  getLetraAlternativa(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D...
  }
}
