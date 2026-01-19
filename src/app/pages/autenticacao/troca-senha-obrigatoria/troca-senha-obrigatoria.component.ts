import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { AutenticacaoService } from '../../../core/service/autenticacao.service';
import { AlertaService } from '../../../core/service/alerta.service';

@Component({
  selector: 'app-troca-senha-obrigatoria',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LogoComponent,
    BotaoComponent,
    CampoComponent,
  ],
  templateUrl: './troca-senha-obrigatoria.component.html',
  styleUrl: './troca-senha-obrigatoria.component.scss',
})
export class TrocaSenhaObrigatoriaComponent {
  private authService = inject(AutenticacaoService);
  private router = inject(Router);
  private alertaService = inject(AlertaService);

  enviando = signal(false);
  erro = signal('');

  formulario = new FormGroup({
    novaSenha: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
    confirmarSenha: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  async enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { novaSenha, confirmarSenha } = this.formulario.getRawValue();

    if (novaSenha !== confirmarSenha) {
      this.erro.set('As senhas não coincidem.');
      return;
    }

    this.enviando.set(true);
    this.erro.set('');

    this.authService.alterarSenhaObrigatoria(novaSenha)?.subscribe({
      next: (res) => {
        this.enviando.set(false);
        if (res.sucesso) {
          this.alertaService.sucesso('Sua senha foi atualizada com sucesso!', 'Senha Alterada');
          const usuario = this.authService.usuarioLogado();
          this.redirecionarDashboard(usuario?.perfilAtual || usuario?.indicador_tipo_conta);
        } else {
          this.erro.set(res.mensagem || 'Erro ao alterar senha.');
        }
      },
      error: () => {
        this.enviando.set(false);
        this.erro.set('Erro interno ao processar alteração.');
      }
    });
  }

  private redirecionarDashboard(perfil: any) {
    if (perfil === 'Admin') {
      this.router.navigate(['/admin/dashboard']);
    } else if (perfil?.toLowerCase().includes('instrutor')) {
      this.router.navigate(['/instrutor/dashboard']);
    } else {
      this.router.navigate(['/aluno/dashboard']);
    }
  }
}
