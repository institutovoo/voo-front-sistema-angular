import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TermosComponent } from '../../diretrizes/termos/termos.component';
import { PrivacidadeComponent } from '../../diretrizes/privacidade/privacidade.component';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TermosComponent,
    PrivacidadeComponent,
    LogoComponent,
    BotaoComponent,
    CampoComponent,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  mostrarTermos = false;
  mostrarPrivacidade = false;

  get rotuloNome(): string {
    return this.formulario.get('tipoConta')?.value === 'PJ' ? 'Razão Social' : 'Nome completo';
  }

  get placeholderNome(): string {
    return this.formulario.get('tipoConta')?.value === 'PJ' ? 'Nome da empresa' : 'João da Silva';
  }

  formulario = new FormGroup({
    nome: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    tipoConta: new FormControl('PF', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    telefone: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    senha: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    confirmarSenha: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    termos: new FormControl<boolean>(false, { nonNullable: true }),
  });

  abrirTermos() {
    this.mostrarTermos = true;
  }

  fecharTermos() {
    this.mostrarTermos = false;
  }

  abrirPrivacidade() {
    this.mostrarPrivacidade = true;
  }

  fecharPrivacidade() {
    this.mostrarPrivacidade = false;
  }

  enviar() {
    if (
      this.formulario.invalid ||
      this.formulario.value.senha !== this.formulario.value.confirmarSenha
    ) {
      this.formulario.markAllAsTouched();
      return;
    }
    const dados = this.formulario.getRawValue();
    console.log('cadastro', dados);
  }
}
