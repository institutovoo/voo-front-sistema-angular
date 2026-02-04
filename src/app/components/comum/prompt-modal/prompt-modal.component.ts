import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PromptService, PromptDados } from '../../../core/service/prompt.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-prompt-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  template: `
    @if (dadosPrompt(); as info) {
      <app-modal
        [titulo]="info.titulo"
        largura="450px"
        (fechar)="cancelar(info)"
      >
        <div class="prompt-body">
          <p class="prompt-msg">{{ info.mensagem }}</p>
          <input 
            type="text" 
            [(ngModel)]="valor" 
            [placeholder]="info.placeholder"
            (keyup.enter)="confirmar(info)"
            #promptInput
            class="prompt-input"
            autofocus
          >
        </div>
        
        <div footer>
          <button class="btn-cancelar" (click)="cancelar(info)">
            {{ info.textoCancelar }}
          </button>
          <button class="btn-confirmar" (click)="confirmar(info)">
            {{ info.textoConfirmar }}
          </button>
        </div>
      </app-modal>
    }
  `,
  styles: [`
    .prompt-body {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .prompt-msg {
      font-size: 0.9375rem;
      color: #475569;
      line-height: 1.5;
      margin: 0;
    }

    .prompt-input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      font-size: 0.9375rem;
      color: #1e293b;
      background: #f8fafc;
      transition: all 0.2s;
      
      &:focus {
        outline: none;
        border-color: #21b7cd;
        background: #fff;
        box-shadow: 0 0 0 4px rgba(33, 183, 205, 0.1);
      }
      
      &::placeholder {
        color: #94a3b8;
      }
    }
    
    .btn-cancelar {
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
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
      border-radius: 12px;
      font-size: 0.875rem;
      font-weight: 700;
      cursor: pointer;
      background: #21b7cd;
      color: #fff;
      border: none;
      transition: all 0.2s;
      &:hover { 
        background: #1a9aab; 
        transform: translateY(-1px); 
        box-shadow: 0 4px 12px rgba(33, 183, 205, 0.25);
      }
    }
  `]
})
export class PromptModalComponent {
  private promptService = inject(PromptService);
  
  valor = '';
  
  dadosPrompt = this.promptService.dados;

  constructor() {
    effect(() => {
      const dados = this.dadosPrompt();
      if (dados) {
        this.valor = dados.valorPadrao || '';
      }
    });
  }

  cancelar(info: PromptDados) {
    info.callback(null);
  }

  confirmar(info: PromptDados) {
    info.callback(this.valor);
  }
}
