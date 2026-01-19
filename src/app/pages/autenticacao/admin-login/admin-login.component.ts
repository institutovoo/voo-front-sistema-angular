import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { AutenticacaoController } from '../../../core/controller/autenticacao.controller';
import { AlertaService } from '../../../core/service/alerta.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogoComponent, BotaoComponent, CampoComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent implements OnInit {
  private authController = inject(AutenticacaoController);
  private alertaService = inject(AlertaService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  formulario!: FormGroup;
  erro = '';
  carregando = false;

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      lembrar: [false]
    });
  }

  async login(): Promise<void> {
    if (this.formulario.valid) {
      this.carregando = true;
      this.erro = '';
      
      const { email, senha, lembrar } = this.formulario.value;
      
      // Limpeza de espaços extras (comum em senhas temporárias coladas)
      const identificador = email.trim();
      const senhaLimpa = senha.trim();

      console.log('Login administrativo:', { identificador, senha: senhaLimpa, lembrar });
      
      try {
        const resultado = await this.authController.login({ 
          identificador, 
          senha: senhaLimpa,
          portal: 'admin',
          lembrar
        });

        if (!resultado.sucesso) {
          this.erro = resultado.mensagem || 'Credenciais administrativas inválidas.';
          this.alertaService.erro(this.erro);
        }
      } catch (err) {
        this.erro = 'Erro de conexão com o servidor.';
        this.alertaService.erro(this.erro);
      } finally {
        this.carregando = false;
      }
    } else {
      this.formulario.markAllAsTouched();
      this.erro = 'Por favor, preencha os campos corretamente.';
    }
  }

  navegarParaCadastro(): void {
    this.router.navigate(['/admin/cadastro']);
  }
}
