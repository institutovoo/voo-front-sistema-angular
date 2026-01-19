import { Component, inject } from '@angular/core';
import { ConfirmService, ConfirmDados } from '../../../core/service/confirm.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-confirmacao-modal',
  standalone: true,
  imports: [ModalComponent],
  template: `
    @if (dadosConfirmacao; as info) {
      <app-modal
        [titulo]="info.titulo"
        largura="450px"
        (fechar)="info.callback(false)"
      >
        <p class="confirm-msg">{{ info.mensagem }}</p>
        
        <div footer>
          <button class="btn-cancelar" (click)="info.callback(false)">
            {{ info.textoCancelar }}
          </button>
          <button class="btn-confirmar" (click)="info.callback(true)">
            {{ info.textoConfirmar }}
          </button>
        </div>
      </app-modal>
    }
  `,
  styles: [`
    .confirm-msg {
      font-size: 1rem;
      color: #475569;
      line-height: 1.6;
      margin: 0;
    }
    
    .btn-cancelar {
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 700;
      cursor: pointer;
      background: #f1f5f9;
      color: #64748b;
      border: none;
      transition: all 0.2s;
      &:hover { background: #e2e8f0; }
    }
    
    .btn-confirmar {
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-size: 0.875rem;
      font-weight: 700;
      cursor: pointer;
      background: #21b7cd;
      color: #fff;
      border: none;
      transition: all 0.2s;
      &:hover { background: #1a9aab; transform: translateY(-1px); }
    }
  `]
})
export class ConfirmacaoModalComponent {
  private confirmService = inject(ConfirmService);
  
  public get dadosConfirmacao(): ConfirmDados | null {
    return this.confirmService.dados();
  }
}
