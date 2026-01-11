import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Sessao {
  id: number;
  dispositivo: string;
  navegador: string;
  localizacao: string;
  tempo: string;
  atual: boolean;
}

@Component({
  selector: 'app-config-seguranca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seguranca.component.html',
  styleUrl: './seguranca.component.scss',
})
export class ConfigSegurancaComponent {
  formularioSenha = new FormGroup({
    senhaAtual: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    novaSenha: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
    confirmarSenha: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  auth2FA = false;

  sessoes: Sessao[] = [
    {
      id: 1,
      dispositivo: 'Windows',
      navegador: 'Chrome',
      localizacao: 'São Paulo, BR',
      tempo: 'Agora',
      atual: true,
    },
    {
      id: 2,
      dispositivo: 'iPhone',
      navegador: 'Safari',
      localizacao: 'São Paulo, BR',
      tempo: 'Há 2 dias',
      atual: false,
    },
  ];

  alterandoSenha = false;
  salvando = false;

  alterarSenha() {
    if (this.formularioSenha.invalid) {
      this.formularioSenha.markAllAsTouched();
      return;
    }

    const { novaSenha, confirmarSenha } = this.formularioSenha.getRawValue();
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

    this.alterandoSenha = true;
    console.log('Alterando senha...');

    setTimeout(() => {
      this.alterandoSenha = false;
      this.formularioSenha.reset();
      alert('Senha alterada com sucesso!');
    }, 1500);
  }

  toggleAuth2FA() {
    this.auth2FA = !this.auth2FA;
    if (this.auth2FA) {
      alert('Autenticação de dois fatores ativada!');
    } else {
      alert('Autenticação de dois fatores desativada!');
    }
  }

  encerrarSessao(sessao: Sessao) {
    if (confirm('Tem certeza que deseja encerrar esta sessão?')) {
      this.sessoes = this.sessoes.filter((s) => s.id !== sessao.id);
    }
  }

  excluirConta() {
    if (
      confirm(
        'ATENÇÃO: Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos. Deseja continuar?'
      )
    ) {
      if (confirm('Tem certeza absoluta? Digite "EXCLUIR" para confirmar.')) {
        console.log('Excluindo conta...');
      }
    }
  }

  salvar() {
    this.salvando = true;
    console.log('Salvando configurações de segurança');

    setTimeout(() => {
      this.salvando = false;
      alert('Alterações salvas com sucesso!');
    }, 1000);
  }
}
