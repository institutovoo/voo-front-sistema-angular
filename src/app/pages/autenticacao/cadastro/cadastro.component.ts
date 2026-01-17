import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TermosComponent } from '../../diretrizes/termos/termos.component';
import { PrivacidadeComponent } from '../../diretrizes/privacidade/privacidade.component';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { AutenticacaoController } from '../../../core/controller/autenticacao.controller';
import { CadastroRequest } from '../../../core/model/autenticacao.model';
import { mascaraTelefone, mascaraDocumento } from '../../../core/utils/mascaras';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TermosComponent,
    PrivacidadeComponent,
    LogoComponent,
    BotaoComponent,
    CampoComponent,
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  private authController = inject(AutenticacaoController);

  mostrarTermos = false;
  mostrarPrivacidade = false;
  erro = '';
  sucesso = '';

  get rotuloNome(): string {
    return this.formulario.get('tipoConta')?.value === 'Empresa' ? 'Razão Social' : 'Nome completo';
  }

  get placeholderNome(): string {
    return this.formulario.get('tipoConta')?.value === 'Empresa' ? 'Nome da organização' : 'João da Silva';
  }

  opcoesFormacao = [
    'Ensino Fundamental',
    'Ensino Médio',
    'Ensino Superior',
    'Pós-graduação',
    'Mestrado',
    'Doutorado',
    'Outros'
  ];

  opcoesStatusFormacao = [
    'Concluído',
    'Cursando',
    'Incompleto',
    'Trancado'
  ];

  formulario = new FormGroup({
    documento: new FormControl('', {
      validators: [Validators.required, Validators.minLength(11)],
      nonNullable: true,
    }),
    nome: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    nomeSocial: new FormControl('', {
      nonNullable: true,
    }),
    nomeMae: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    endereco: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    ultimaFormacao: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    statusFormacao: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    tipoConta: new FormControl('Aluno', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    telefone: new FormControl('', {
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(15)],
      nonNullable: true,
    }),
    senha: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
      nonNullable: true,
    }),
    confirmarSenha: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    termos: new FormControl<boolean>(false, { 
      validators: [Validators.requiredTrue],
      nonNullable: true 
    }),
  });

  constructor() {
    // Máscara de Telefone
    this.formulario.get('telefone')?.valueChanges.subscribe(valor => {
      if (valor) {
        const formatado = mascaraTelefone(valor);
        if (formatado !== valor) {
          this.formulario.get('telefone')?.setValue(formatado, { emitEvent: false });
        }
      }
    });

    // Máscara de Documento (CPF/CNPJ)
    this.formulario.get('documento')?.valueChanges.subscribe(valor => {
      if (valor) {
        const formatado = mascaraDocumento(valor);
        if (formatado !== valor) {
          this.formulario.get('documento')?.setValue(formatado, { emitEvent: false });
        }
      }
    });

    // Ajuste de validadores por tipo de conta
    this.formulario.get('tipoConta')?.valueChanges.subscribe(tipo => {
      const formacao = this.formulario.get('ultimaFormacao');
      const status = this.formulario.get('statusFormacao');
      const nomeMae = this.formulario.get('nomeMae');

      if (tipo === 'Empresa') {
        formacao?.clearValidators();
        status?.clearValidators();
        nomeMae?.clearValidators();
      } else {
        formacao?.setValidators([Validators.required]);
        status?.setValidators([Validators.required]);
        nomeMae?.setValidators([Validators.required]);
      }

      formacao?.updateValueAndValidity();
      status?.updateValueAndValidity();
      nomeMae?.updateValueAndValidity();
    });
  }

  abrirTermos() {
    this.mostrarTermos = true;
  }

  fecharTermos() {
    this.mostrarTermos = false;
  }

  abrirPrivacidade() {
    this.mostrarPrivacidade = true;
  }

  fecharPrivacidade() {
    this.mostrarPrivacidade = false;
  }

  async enviar() {
    if (
      this.formulario.invalid ||
      this.formulario.value.senha !== this.formulario.value.confirmarSenha
    ) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.erro = '';
    this.sucesso = '';
    const form = this.formulario.getRawValue();

    const dadosCadastro: CadastroRequest = {
      nome_completo: form.nome,
      nome_social: form.nomeSocial,
      nome_mae: form.nomeMae,
      endereco: form.endereco,
      ultima_formacao: form.ultimaFormacao,
      status_ultima_formacao: form.statusFormacao,
      email: form.email,
      senha: form.senha,
      indicador_tipo_conta: form.tipoConta as any,
      whatsapp: form.telefone,
      cpf_cnpj: form.documento,
      aceitouTermos: form.termos,
    };

    const resultado = await this.authController.cadastrar(dadosCadastro);

    if (resultado.sucesso) {
      this.sucesso = resultado.mensagem || 'Cadastro realizado!';
    } else {
      this.erro = resultado.mensagem || 'Erro ao realizar cadastro';
    }
  }
}
