import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Cartao {
  id: number;
  bandeira: string;
  ultimos4: string;
  expiracao: string;
  padrao: boolean;
}

interface Assinatura {
  plano: string;
  preco: number;
  renovacao: string;
  status: 'ativo' | 'cancelado' | 'pendente';
}

@Component({
  selector: 'app-config-pagamento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.scss',
})
export class ConfigPagamentoComponent {
  cartoes: Cartao[] = [
    {
      id: 1,
      bandeira: 'visa',
      ultimos4: '4242',
      expiracao: '12/2025',
      padrao: true,
    },
  ];

  assinatura: Assinatura = {
    plano: 'Plano Premium',
    preco: 49.9,
    renovacao: '15/04/2024',
    status: 'ativo',
  };

  emailCobranca = 'joao@aluno.com';
  mostrarFormCartao = false;
  salvando = false;

  formularioCartao = new FormGroup({
    numero: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    nome: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    validade: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    cvv: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  definirPadrao(cartao: Cartao) {
    this.cartoes.forEach((c) => (c.padrao = false));
    cartao.padrao = true;
  }

  removerCartao(cartao: Cartao) {
    if (confirm('Tem certeza que deseja remover este cartão?')) {
      this.cartoes = this.cartoes.filter((c) => c.id !== cartao.id);
    }
  }

  adicionarCartao() {
    this.mostrarFormCartao = true;
  }

  cancelarCartao() {
    this.mostrarFormCartao = false;
    this.formularioCartao.reset();
  }

  salvarCartao() {
    if (this.formularioCartao.invalid) {
      this.formularioCartao.markAllAsTouched();
      return;
    }

    const dados = this.formularioCartao.getRawValue();
    const novoCartao: Cartao = {
      id: Date.now(),
      bandeira: 'visa',
      ultimos4: dados.numero.slice(-4),
      expiracao: dados.validade,
      padrao: this.cartoes.length === 0,
    };

    this.cartoes.push(novoCartao);
    this.mostrarFormCartao = false;
    this.formularioCartao.reset();
  }

  alterarPlano() {
    console.log('Alterar plano');
  }

  cancelarAssinatura() {
    if (
      confirm(
        'Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos benefícios Premium.'
      )
    ) {
      this.assinatura.status = 'cancelado';
    }
  }

  copiarEmail() {
    navigator.clipboard.writeText(this.emailCobranca);
    alert('Email copiado!');
  }

  salvar() {
    this.salvando = true;
    console.log('Salvando pagamento');

    setTimeout(() => {
      this.salvando = false;
      alert('Alterações salvas com sucesso!');
    }, 1000);
  }
}
