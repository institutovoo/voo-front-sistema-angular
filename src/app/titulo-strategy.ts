import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class TituloStrategy extends TitleStrategy {
  constructor(private readonly servicoTitulo: Title) {
    super();
  }

  override updateTitle(estadoRota: RouterStateSnapshot): void {
    const tituloDaRota = this.buildTitle(estadoRota);
    const sufixo = 'VooCursos';
    const tituloFinal = tituloDaRota ? `${tituloDaRota} - ${sufixo}` : sufixo;
    this.servicoTitulo.setTitle(tituloFinal);
  }
}
