import { Injectable, signal } from '@angular/core';

export interface ConfirmDados {
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  callback: (confirmado: boolean) => void;
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  dados = signal<ConfirmDados | null>(null);

  confirmar(titulo: string, mensagem: string, textoConfirmar: string = 'Confirmar', textoCancelar: string = 'Cancelar'): Promise<boolean> {
    return new Promise((resolve) => {
      this.dados.set({
        titulo,
        mensagem,
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
