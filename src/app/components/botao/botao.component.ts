import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-botao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botao.component.html',
  styleUrl: './botao.component.scss',
})
export class BotaoComponent {
  @Input() tipo: 'submit' | 'button' | 'reset' = 'button';
  @Input() variante: 'primario' | 'secundario' | 'outline' = 'primario';
  @Input() tamanho: 'pequeno' | 'medio' | 'grande' = 'medio';
  @Input() larguraTotal: boolean = true;
  @Input() desabilitado: boolean = false;
  @Input() carregando: boolean = false;
}
