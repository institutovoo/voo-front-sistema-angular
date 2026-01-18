import { Component, Input, signal, Optional, Self, HostListener, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  ReactiveFormsModule,
  NgControl,
} from '@angular/forms';

@Component({
  selector: 'app-campo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './campo.component.html',
  styleUrl: './campo.component.scss',
  host: {
    class: 'app-campo',
    style: 'display: block;'
  }
})
export class CampoComponent implements ControlValueAccessor {
  private elementRef = inject(ElementRef);

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
  dropdownAberto = signal<boolean>(false);

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  private aoMudar: (valor: string) => void = () => {};
  private aoTocar: () => void = () => {};

  @HostListener('document:click', ['$event'])
  aoClicarFora(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.dropdownAberto.set(false);
    }
  }

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

  alternarDropdown(): void {
    if (this.desabilitado()) return;
    this.dropdownAberto.update(v => !v);
    this.aoTocar();
  }

  selecionarOpcao(opcao: string): void {
    this.valor.set(opcao);
    this.aoMudar(opcao);
    this.dropdownAberto.set(false);
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

  get mensagemDeErro(): string {
    if (!this.temErro || !this.ngControl?.errors) return '';

    const erros = this.ngControl.errors;

    if (erros['required']) return 'Este campo é obrigatório.';
    if (erros['email']) return 'E-mail inválido.';
    if (erros['minlength'])
      return `Mínimo de ${erros['minlength'].requiredLength} caracteres.`;
    if (erros['maxlength'])
      return `Máximo de ${erros['maxlength'].requiredLength} caracteres.`;
    if (erros['pattern']) return 'Formato inválido.';
    if (erros['requiredTrue']) return 'Você deve aceitar os termos.';

    return 'Campo inválido.';
  }
}
