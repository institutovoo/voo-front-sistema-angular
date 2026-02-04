import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderIconeComponent } from '../../sistema/header/components/icone/icone.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, HeaderIconeComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() titulo: string = '';
  @Input() subtitulo?: string;
  @Input() largura: string = '500px';
  @Input() temFooter: boolean = true;

  @Output() fechar = new EventEmitter<void>();

  fecharModal(event: MouseEvent) {
    this.fechar.emit();
  }
}
