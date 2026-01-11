import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-icone',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icone.component.html',
  styleUrl: './icone.component.scss',
})
export class HeaderIconeComponent {
  @Input() nome: string = '';
  @Input() tamanho: number = 20;
  @Input() cor: string = 'currentColor';
  @Input() preenchimento: string = 'none';
  @Input() espessura: number = 2;
}
