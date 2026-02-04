import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderIconeComponent } from '../../../../../components/sistema/header/components/icone/icone.component';

interface ItemConteudo {
  id: number;
  titulo: string;
  descricao?: string;
  tipo: 'aula' | 'quiz' | 'prova' | 'recurso';
  duracao?: string;
  completo: boolean;
  recursos?: any[];
  mostrarRecursos?: boolean;
}

interface Secao {
  id: number;
  titulo: string;
  aberto: boolean;
  menuAberto?: boolean;
  itens: ItemConteudo[];
}

@Component({
  selector: 'app-conteudo-item',
  standalone: true,
  imports: [CommonModule, HeaderIconeComponent],
  templateUrl: './conteudo-item.component.html',
  styleUrl: './conteudo-item.component.scss',
})
export class ConteudoItemComponent {
  @Input() item!: ItemConteudo;
  @Input() secao!: Secao;
  @Input() numero: string = '';

  @Output() adicionarRecurso = new EventEmitter<ItemConteudo>();
  @Output() toggleRecursos = new EventEmitter<ItemConteudo>();
  @Output() editar = new EventEmitter<{ secao: Secao; item: ItemConteudo }>();
  @Output() excluir = new EventEmitter<{ secao: Secao; item: ItemConteudo }>();
  @Output() excluirRecurso = new EventEmitter<{ item: ItemConteudo; recurso: any }>();

  getIconeItem(tipo: string): string {
    const icones: Record<string, string> = {
      aula: 'video',
      quiz: 'certificados',
      prova: 'verificar',
      recurso: 'documento',
    };
    return icones[tipo] || 'curso';
  }

  getTipoLabel(tipo: string): string {
    const labels: Record<string, string> = {
      aula: 'AULA',
      quiz: 'QUIZ',
      prova: 'PROVA',
      recurso: 'RECURSO',
    };
    return labels[tipo] || tipo.toUpperCase();
  }

  onAdicionarRecurso() {
    this.adicionarRecurso.emit(this.item);
  }

  onToggleRecursos() {
    this.toggleRecursos.emit(this.item);
  }

  onEditar() {
    this.editar.emit({ secao: this.secao, item: this.item });
  }

  onExcluir() {
    this.excluir.emit({ secao: this.secao, item: this.item });
  }

  onExcluirRecurso(recurso: any) {
    this.excluirRecurso.emit({ item: this.item, recurso });
  }
}
