import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

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
  isLoading = false;
  mostrarAlertaBloqueio = false;

  async enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.erro = '';
    this.mostrarAlertaBloqueio = false;
    this.cdr.detectChanges();

    const { identificador, senha, lembrar } = this.formulario.getRawValue();
    const portal = 'publico';

    try {
      const resultado = await this.authController.login({ 
        identificador: identificador.trim(), 
        senha: senha.trim(), 
        portal,
        lembrar
      });
      
      if (!resultado.sucesso) {
        this.erro = resultado.mensagem || 'Erro ao realizar login';

        // Se for um Admin tentando logar no portal público
        const erroLower = this.erro.toLowerCase();
        const ehAdmin = erroLower.includes('admin') || erroLower.includes('administrador');
        const ehPortalErrado = erroLower.includes('portal') || erroLower.includes('acesso') || erroLower.includes('administrativo');

        if (ehAdmin && ehPortalErrado) {
          this.alertaService.aviso('Administradores devem usar o portal administrativo. Redirecionando...', 'Acesso Admin');
          setTimeout(() => {
            this.router.navigate(['/admin/login']);
          }, 2000);
        } else if (erroLower.includes('bloqueada')) {
          this.alertaService.erro(this.erro, 'Acesso Bloqueado');
        } else {
          this.alertaService.erro(this.erro);
        }
      }
    } catch (err) {
      this.erro = 'Ocorreu um erro inesperado ao tentar logar.';
      this.alertaService.erro(this.erro);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
