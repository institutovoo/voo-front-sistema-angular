import { Component, inject } from '@angular/core';
import { AlertaService, Alerta } from '../../../core/service/alerta.service';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-alerta-painel',
  standalone: true,
  imports: [AlertaComponent],
  template: `
    <div class="alerta-wrapper">
      @for (item of alertas; track item.id) {
        <app-alerta
          [tipo]="item.tipo"
          [mensagem]="item.mensagem"
          [titulo]="item.titulo"
          [tempo]="0"
          (fechar)="remover(item.id)"
        ></app-alerta>
      }
    </div>
  `,
  styles: [
    `
      .alerta-wrapper {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 11000;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        pointer-events: none;
      }
    `,
  ],
})
export class AlertaPainelComponent {
  private alertaService = inject(AlertaService);

  public get alertas(): Alerta[] {
    return this.alertaService.alertas();
  }

  remover(id: number) {
    this.alertaService.remover(id);
  }
}
