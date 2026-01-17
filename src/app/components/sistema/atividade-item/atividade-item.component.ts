import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderIconeComponent } from '../header/components/icone/icone.component';

export interface Atividade {
  id: number;
  tipo: 'aula' | 'certificado' | 'avaliacao' | 'curso' | 'conquista';
  titulo: string;
  descricao: string;
  tempo: string;
  icone: string;
  cor: string;
}

@Component({
  selector: 'app-atividade-item',
  standalone: true,
  imports: [CommonModule, HeaderIconeComponent],
  templateUrl: './atividade-item.component.html',
  styleUrl: './atividade-item.component.scss',
})
export class AtividadeItemComponent {
  @Input() atividade!: Atividade;
}
