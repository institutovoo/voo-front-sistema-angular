import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-progresso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-progresso.component.html',
  styleUrl: './barra-progresso.component.scss',
})
export class BarraProgressoComponent {
  @Input() valor: number = 0;
  @Input() tamanho: 'pequeno' | 'medio' | 'grande' = 'medio';
  @Input() cor: string = '#21b7cd';
  @Input() mostrarTexto: boolean = false;
  @Input() textoFormato: 'porcentagem' | 'custom' = 'porcentagem';
  @Input() textoCustom: string = '';

  get textoExibido(): string {
    if (this.textoFormato === 'custom' && this.textoCustom) {
      return this.textoCustom;
    }
    return `${this.valor}%`;
  }
}
