import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { AutenticacaoController } from '../../../core/controller/autenticacao.controller';
import { AlertaService } from '../../../core/service/alerta.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    LogoComponent,
    BotaoComponent,
    CampoComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authController = inject(AutenticacaoController);
  private alertaService = inject(AlertaService);

  formulario = new FormGroup({
    identificador: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    senha: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    lembrar: new FormControl<boolean>(false, { nonNullable: true }),
  });

  erro = '';
  mostrarAlertaBloqueio = false;

  async enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.erro = '';
    this.mostrarAlertaBloqueio = false;
    const { identificador, senha, lembrar } = this.formulario.getRawValue();
    const portal = 'publico';

    const resultado = await this.authController.login({ 
      identificador: identificador.trim(), 
      senha: senha.trim(), 
      portal,
      lembrar
    });
    
    if (!resultado.sucesso) {
      this.erro = resultado.mensagem || 'Erro desconhecido';
      if (this.erro.toLowerCase().includes('bloqueada')) {
        this.alertaService.erro(this.erro, 'Acesso Bloqueado');
      }
    }
  }
}
