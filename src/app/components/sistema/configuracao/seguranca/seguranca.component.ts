import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertaService } from '../../../../core/service/alerta.service';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { Logger } from '../../../../core/utils/logger';
import { AutenticacaoService } from '../../../../core/service/autenticacao.service';

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
  private alertaService = inject(AlertaService);
  private confirmService = inject(ConfirmService);
  private authService = inject(AutenticacaoService);
  
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
      this.alertaService.aviso('As senhas não coincidem', 'Senha Inválida');
      return;
    }

    this.alterandoSenha = true;
    const usuario = this.authService.usuarioLogado();
    Logger.audit('Usuário solicitou alteração de senha', 'Segurança', { id: usuario?.id });

    setTimeout(() => {
      this.alterandoSenha = false;
      this.formularioSenha.reset();
      this.alertaService.sucesso('Senha alterada com sucesso!');
      Logger.info('Senha alterada com sucesso', 'Segurança', { id: usuario?.id });
    }, 1500);
  }

  toggleAuth2FA() {
    this.auth2FA = !this.auth2FA;
    const usuario = this.authService.usuarioLogado();
    Logger.audit(`Usuário ${this.auth2FA ? 'ativou' : 'desativou'} 2FA`, 'Segurança', { id: usuario?.id });
    
    if (this.auth2FA) {
      this.alertaService.sucesso('Autenticação de dois fatores ativada!');
    } else {
      this.alertaService.aviso('Autenticação de dois fatores desativada!');
    }
  }

  async encerrarSessao(sessao: Sessao) {
    const confirmado = await this.confirmService.confirmar(
      'Encerrar Sessão',
      'Tem certeza que deseja encerrar esta sessão?'
    );
    if (confirmado) {
      this.sessoes = this.sessoes.filter((s) => s.id !== sessao.id);
      this.alertaService.sucesso('Sessão encerrada.');
    }
  }

  async excluirConta() {
    const confirmado = await this.confirmService.confirmar(
      'Excluir Conta',
      'ATENÇÃO: Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos. Deseja continuar?'
    );
    
    if (confirmado) {
      const certeza = await this.confirmService.confirmar(
        'Confirmar Exclusão',
        'Tem certeza absoluta de que deseja excluir sua conta?',
        'Sim, excluir tudo',
        'Não, cancelar'
      );
      if (certeza) {
        const usuario = this.authService.usuarioLogado();
        Logger.audit('Usuário confirmou exclusão permanente da conta', 'Segurança', { id: usuario?.id });
        this.alertaService.erro('Iniciando processo de exclusão...', 'Conta sendo removida');
      }
    }
  }

  salvar() {
    this.salvando = true;
    console.log('Salvando configurações de segurança');

    setTimeout(() => {
      this.salvando = false;
      this.alertaService.sucesso('Alterações salvas com sucesso!');
    }, 1000);
  }
}
