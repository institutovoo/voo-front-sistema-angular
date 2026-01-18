import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../components/logo/logo.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';

@Component({
  selector: 'app-admin-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LogoComponent, CampoComponent, BotaoComponent],
  templateUrl: './admin-cadastro.component.html',
  styleUrl: './admin-cadastro.component.scss'
})
export class AdminCadastroComponent implements OnInit {
  formulario: FormGroup;
  erro: string = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8)]],
      confirmarSenha: ['', [Validators.required]]
    }, { validators: this.validarSenhas });
  }

  ngOnInit() {}

  validarSenhas(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmarSenha')?.value;
    return senha === confirmar ? null : { senhasDiferentes: true };
  }

  enviar() {
    if (this.formulario.valid) {
      console.log('Solicitando acesso administrativo:', this.formulario.value);
      alert('Sua solicitação foi enviada para análise!');
      this.router.navigate(['/admin/login']);
    } else {
      this.erro = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}
