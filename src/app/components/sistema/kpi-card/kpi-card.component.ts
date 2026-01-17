import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderIconeComponent } from '../header/components/icone/icone.component';

export interface Estatistica {
  icone: string;
  valor: string | number;
  label: string;
  cor: 'primary' | 'success' | 'warning' | 'info';
  tendencia?: {
    valor: number;
    tipo: 'up' | 'down';
    periodo?: string; // ex: 'este mês', 'esta semana'
  };
}

@Component({
  selector: 'app-card-kpi',
  standalone: true,
  imports: [CommonModule, HeaderIconeComponent],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
})
export class CardKpiComponent {
  @Input() estatistica!: Estatistica;
  @Input() tamanho: 'pequeno' | 'medio' | 'grande' = 'medio';
}
