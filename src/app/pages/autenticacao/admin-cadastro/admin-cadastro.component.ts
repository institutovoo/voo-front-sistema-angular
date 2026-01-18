import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';

@Component({
  selector: 'app-admin-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LogoComponent, CampoComponent, BotaoComponent],
  templateUrl: './admin-cadastro.component.html',
  styleUrl: './admin-cadastro.component.scss',
})
export class AdminCadastroComponent implements OnInit {
  formulario!: FormGroup;
  enviado = false;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', [Validators.required]],
    });
  }

  enviar(): void {
    if (this.formulario.valid) {
      console.log('Solicitação enviada:', this.formulario.value);
      this.enviado = true;
    }
  }

  voltar(): void {
    this.router.navigate(['/admin/login']);
  }
}
