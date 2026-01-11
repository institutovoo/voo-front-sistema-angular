import { Component, Input, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-campo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './campo.component.html',
  styleUrl: './campo.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CampoComponent),
      multi: true,
    },
  ],
})
export class CampoComponent implements ControlValueAccessor {
  @Input() tipo: 'text' | 'email' | 'password' | 'tel' | 'number' = 'text';
  @Input() placeholder: string = '';
  @Input() rotulo: string = '';
  @Input() icone: 'email' | 'senha' | 'usuario' | 'telefone' | 'busca' | null = null;
  @Input() mostrarAlternarSenha: boolean = false;

  valor = signal<string>('');
  senhaVisivel = signal<boolean>(false);
  desabilitado = signal<boolean>(false);

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
}
