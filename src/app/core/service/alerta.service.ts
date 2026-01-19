import { Injectable, signal } from '@angular/core';

export type TipoAlerta = 'sucesso' | 'erro' | 'aviso' | 'info';

export interface Alerta {
  id: number;
  tipo: TipoAlerta;
  titulo?: string;
  mensagem: string;
  tempo?: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  alertas = signal<Alerta[]>([]);
  private contador = 0;

  exibir(tipo: TipoAlerta, mensagem: string, titulo?: string, tempo: number = 5000) {
    const id = ++this.contador;
    const novoAlerta: Alerta = { id, tipo, mensagem, titulo, tempo };
    
    this.alertas.update(alertas => [...alertas, novoAlerta]);

    if (tempo > 0) {
      setTimeout(() => {
        this.remover(id);
      }, tempo);
    }
  }

  sucesso(mensagem: string, titulo: string = 'Sucesso') {
    this.exibir('sucesso', mensagem, titulo);
  }

  erro(mensagem: string, titulo: string = 'Erro') {
    this.exibir('erro', mensagem, titulo);
  }

  aviso(mensagem: string, titulo: string = 'Aviso') {
    this.exibir('aviso', mensagem, titulo);
  }

  info(mensagem: string, titulo: string = 'Informação') {
    this.exibir('info', mensagem, titulo);
  }

  remover(id: number) {
    this.alertas.update(alertas => alertas.filter(a => a.id !== id));
  }
}
