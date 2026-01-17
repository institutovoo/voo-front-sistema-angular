import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BarraProgressoComponent } from '../barra-progresso/barra-progresso.component';
import { HeaderIconeComponent } from '../header/components/icone/icone.component';

export interface Curso {
  id: number;
  titulo: string;
  categoria: string;
  categoriaColor: string;
  instrutor: string;
  imagem: string;
  progresso: number;
  totalAulas: number;
  aulaAtual?: number;
  duracao: string;
  avaliacao: number;
  totalAvaliacoes: number;
  gratuito?: boolean;
  modulo?: string;
}

@Component({
  selector: 'app-curso-card',
  standalone: true,
  imports: [CommonModule, RouterLink, BarraProgressoComponent, HeaderIconeComponent],
  templateUrl: './curso-card.component.html',
  styleUrl: './curso-card.component.scss',
})
export class CursoCardComponent {
  @Input() curso!: Curso;
  @Input() mostrarProgresso: boolean = true;
  @Input() variante: 'padrao' | 'compacto' | 'destaque' = 'padrao';

  @Output() acessar = new EventEmitter<Curso>();

  onAcessar() {
    this.acessar.emit(this.curso);
  }
}
