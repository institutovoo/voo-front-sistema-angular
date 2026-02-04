import { Injectable, signal } from '@angular/core';

export interface PromptDados {
  titulo: string;
  mensagem: string;
  valorPadrao?: string;
  placeholder?: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  callback: (valor: string | null) => void;
}

@Injectable({
  providedIn: 'root'
})
export class PromptService {
  dados = signal<PromptDados | null>(null);

  prompt(
    titulo: string, 
    mensagem: string, 
    valorPadrao: string = '', 
    placeholder: string = 'Digite aqui...',
    textoConfirmar: string = 'Confirmar', 
    textoCancelar: string = 'Cancelar'
  ): Promise<string | null> {
    return new Promise((resolve) => {
      this.dados.set({
        titulo,
        mensagem,
        valorPadrao,
        placeholder,
        textoConfirmar,
        textoCancelar,
        callback: (resultado) => {
          this.dados.set(null);
          resolve(resultado);
        }
      });
    });
  }
}
