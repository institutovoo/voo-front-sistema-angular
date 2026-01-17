import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderIconeComponent } from '../header/components/icone/icone.component';

export interface FiltroTab {
  id: string;
  nome: string;
  icone?: string;
  cor?: string; // Para dot colorido (como em categorias)
  quantidade: number;
}

export interface OpcaoOrdenacao {
  valor: string;
  label: string;
}

@Component({
  selector: 'app-filtros-barra',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderIconeComponent],
  templateUrl: './filtros-barra.component.html',
  styleUrl: './filtros-barra.component.scss',
})
export class FiltrosBarraComponent {
  // Tabs/Categorias
  @Input() tabs: FiltroTab[] = [];
  @Input() tabAtiva: string = '';
  @Output() tabChange = new EventEmitter<string>();

  // Busca
  @Input() termoBusca: string = '';
  @Input() placeholderBusca: string = 'Buscar...';
  @Input() mostrarBusca: boolean = true;
  @Output() buscaChange = new EventEmitter<string>();

  // Ordenação
  @Input() ordenacao: string = '';
  @Input() opcoesOrdenacao: OpcaoOrdenacao[] = [];
  @Input() mostrarOrdenacao: boolean = true;
  @Output() ordenacaoChange = new EventEmitter<string>();

  // Visualização
  @Input() visualizacao: 'grid' | 'lista' = 'grid';
  @Input() mostrarVisualizacao: boolean = true;
  @Output() visualizacaoChange = new EventEmitter<'grid' | 'lista'>();

  // Limpar filtros
  @Input() mostrarLimpar: boolean = false;
  @Output() limparFiltros = new EventEmitter<void>();

  // Estilo das tabs
  @Input() tabEstilo: 'icone' | 'dot' | 'simples' = 'icone';

  onTabClick(tabId: string): void {
    this.tabChange.emit(tabId);
  }

  onBuscaInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.buscaChange.emit(input.value);
  }

  onOrdenacaoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.ordenacaoChange.emit(select.value);
  }

  onVisualizacaoClick(viz: 'grid' | 'lista'): void {
    this.visualizacaoChange.emit(viz);
  }

  onLimparClick(): void {
    this.limparFiltros.emit();
  }
}
