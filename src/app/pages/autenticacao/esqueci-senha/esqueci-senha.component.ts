import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { AutenticacaoController } from '../../../core/controller/autenticacao.controller';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LogoComponent,
    BotaoComponent,
    CampoComponent,
  ],
  templateUrl: './esqueci-senha.component.html',
  styleUrl: './esqueci-senha.component.scss',
})
export class EsqueciSenhaComponent {
  private authController = inject(AutenticacaoController);

  formulario = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });

  mensagem = '';
  erro = '';

  async enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    
    this.mensagem = '';
    this.erro = '';
    const { email } = this.formulario.getRawValue();

    const resultado = await this.authController.esqueciSenha(email);

    if (resultado.sucesso) {
      this.mensagem = resultado.mensagem || 'Instruções enviadas.';
    } else {
      this.erro = resultado.mensagem || 'Erro ao processar solicitação.';
    }
  }
}
