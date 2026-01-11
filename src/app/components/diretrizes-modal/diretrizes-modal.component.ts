import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';

export interface DiretrizSecao {
  titulo: string;
  conteudo: string[];
}

@Component({
  selector: 'app-diretrizes-modal',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './diretrizes-modal.component.html',
  styleUrl: './diretrizes-modal.component.scss',
})
export class DiretrizesModalComponent {
  @Input() titulo: string = '';
  @Input() subtitulo: string = '';
  @Input() secoes: DiretrizSecao[] = [];
  @Input() ultimaAtualizacao: string = '';
  @Output() fechar = new EventEmitter<void>();

  aoFechar(): void {
    this.fechar.emit();
  }

  aoClicarFora(evento: MouseEvent): void {
    if ((evento.target as HTMLElement).classList.contains('modal-overlay')) {
      this.aoFechar();
    }
  }
}
