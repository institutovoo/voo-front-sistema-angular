import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderIconeComponent } from '../header/components/icone/icone.component';

export interface Certificado {
  id: number;
  titulo: string;
  categoria: string;
  categoriaColor: string;
  instrutor: string;
  dataConclusao: Date;
  cargaHoraria: number;
  codigoValidacao: string;
  imagemCurso: string;
  nota?: number;
}

@Component({
  selector: 'app-certificado-card',
  standalone: true,
  imports: [CommonModule, HeaderIconeComponent],
  templateUrl: './certificado-card.component.html',
  styleUrl: './certificado-card.component.scss',
})
export class CertificadoCardComponent {
  @Input() certificado!: Certificado;
  @Input() visualizacao: 'grid' | 'lista' = 'grid';

  @Output() visualizar = new EventEmitter<Certificado>();
  @Output() baixar = new EventEmitter<Certificado>();
  @Output() compartilhar = new EventEmitter<Certificado>();

  onVisualizar() {
    this.visualizar.emit(this.certificado);
  }

  onBaixar() {
    this.baixar.emit(this.certificado);
  }

  onCompartilhar() {
    this.compartilhar.emit(this.certificado);
  }

  formatarData(data: Date): string {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
