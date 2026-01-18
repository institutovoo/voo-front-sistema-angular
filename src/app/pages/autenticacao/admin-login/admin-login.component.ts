import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { AutenticacaoController } from '../../../core/controller/autenticacao.controller';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogoComponent, BotaoComponent, CampoComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  private authController = inject(AutenticacaoController);

  formulario = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    senha: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
  });

  erro = '';

  async enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.erro = '';
    const { email, senha } = this.formulario.getRawValue();
    
    // Mapeando o valor do campo email para identificador para satisfazer o contrato da API
    const resultado = await this.authController.login({ identificador: email, senha });

    if (!resultado.sucesso) {
      this.erro = resultado.mensagem || 'Erro ao realizar login';
    }
  }
}
