import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { AutenticacaoController } from '../../../core/controller/autenticacao.controller';

@Component({
  selector: 'app-reset-senha',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LogoComponent,
    BotaoComponent,
    CampoComponent,
  ],
  templateUrl: './reset-senha.component.html',
  styleUrl: './reset-senha.component.scss',
})
export class ResetSenhaComponent {
  private authController = inject(AutenticacaoController);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email = '';
  enviando = false;
  reenviando = false;
  mensagem = '';
  erro = '';
  cooldownReenvio = 0;
  senhaResetada = false;

  formulario = new FormGroup({
    codigo: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      nonNullable: true,
    }),
    novaSenha: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    confirmarSenha: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor() {
    // Tenta pegar o email da query param se existir
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  async reenviar() {
    if (this.reenviando || this.cooldownReenvio > 0) return;

    this.reenviando = true;
    this.erro = '';
    this.mensagem = '';

    const resultado = await this.authController.esqueciSenha(this.email);

    this.reenviando = false;

    if (resultado.sucesso) {
      this.mensagem = 'Um novo código foi enviado para o seu e-mail.';
      this.iniciarCooldown();
    } else {
      this.erro = 'Erro ao reenviar código. Tente novamente mais tarde.';
    }
  }

  private iniciarCooldown() {
    this.cooldownReenvio = 60; // 60 segundos
    const intervalo = setInterval(() => {
      this.cooldownReenvio--;
      if (this.cooldownReenvio <= 0) {
        clearInterval(intervalo);
      }
    }, 1000);
  }

  async enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { codigo, novaSenha, confirmarSenha } = this.formulario.getRawValue();

    if (novaSenha !== confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    if (!this.email) {
      this.erro = 'E-mail não identificado. Volte para a página anterior.';
      return;
    }

    this.enviando = true;
    this.mensagem = '';
    this.erro = '';

    const resultado = await this.authController.resetSenha({
      email: this.email,
      codigo,
      novaSenha,
    });

    this.enviando = false;

    if (resultado.sucesso) {
      this.senhaResetada = true;
      this.mensagem = 'Senha alterada com sucesso! Você será redirecionado para o login.';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.erro = resultado.mensagem || 'Erro ao redefinir senha. Verifique o código.';
    }
  }
}
