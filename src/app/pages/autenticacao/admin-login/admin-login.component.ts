import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogoComponent, BotaoComponent, CampoComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent implements OnInit {
  formulario!: FormGroup;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.formulario.valid) {
      console.log('Login administrativo:', this.formulario.value);
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.erro = 'Por favor, preencha os campos corretamente.';
    }
  }

  navegarParaCadastro(): void {
    this.router.navigate(['/admin/cadastro']);
  }
}
