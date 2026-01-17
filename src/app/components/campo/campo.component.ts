import { Component, Input, forwardRef, signal, inject, Optional, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-campo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './campo.component.html',
  styleUrl: './campo.component.scss',
})
export class CampoComponent implements ControlValueAccessor {
  @Input() tipo: 'text' | 'email' | 'password' | 'tel' | 'number' | 'select' = 'text';
  @Input() placeholder: string = '';
  @Input() rotulo: string = '';
  @Input() icone: 'email' | 'senha' | 'usuario' | 'telefone' | 'busca' | 'documento' | null = null;
  @Input() mostrarAlternarSenha: boolean = false;
  @Input() maxlength: number | null = null;
  @Input() obrigatorio: boolean = false;
  @Input() opcoes: string[] = [];

  valor = signal<string>('');
  senhaVisivel = signal<boolean>(false);
  desabilitado = signal<boolean>(false);

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  private aoMudar: (valor: string) => void = () => {};
  private aoTocar: () => void = () => {};

  writeValue(valor: string): void {
    this.valor.set(valor || '');
  }

  registerOnChange(fn: (valor: string) => void): void {
    this.aoMudar = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.aoTocar = fn;
  }

  setDisabledState(estaDesabilitado: boolean): void {
    this.desabilitado.set(estaDesabilitado);
  }

  aoDigitar(evento: Event): void {
    const alvo = evento.target as HTMLInputElement;
    this.valor.set(alvo.value);
    this.aoMudar(alvo.value);
  }

  aoPerderFoco(): void {
    this.aoTocar();
  }

  alternarSenha(): void {
    this.senhaVisivel.update((v) => !v);
  }

  get tipoCampo(): string {
    if (this.tipo === 'password' && this.senhaVisivel()) {
      return 'text';
    }
    return this.tipo;
  }

  get temErro(): boolean {
    return !!(
      this.ngControl &&
      this.ngControl.invalid &&
      (this.ngControl.touched || this.ngControl.dirty)
    );
  }
}
