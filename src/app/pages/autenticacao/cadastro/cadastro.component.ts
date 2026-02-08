import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TermosComponent } from '../../diretrizes/termos/termos.component';
import { PrivacidadeComponent } from '../../diretrizes/privacidade/privacidade.component';
import { LogoComponent } from '../../../components/logo/logo.component';
import { BotaoComponent } from '../../../components/botao/botao.component';
import { CampoComponent } from '../../../components/campo/campo.component';
import { AutenticacaoController } from '../../../core/controller/autenticacao.controller';
import { CepService } from '../../../core/service/cep.service';
import { AlertaService } from '../../../core/service/alerta.service';
import { CadastroRequest } from '../../../core/model/autenticacao.model';
import { mascaraDocumento, mascaraTelefone, mascaraCep } from '../../../core/utils/mascaras';

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
  private cepService = inject(CepService);
  private alertaService = inject(AlertaService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  mostrarTermos = false;
  mostrarPrivacidade = false;
  erro = '';
  sucesso = '';
  buscandoCep = false;
  enderecoCarregado = false;
  enviando = false;

  get rotuloNome(): string {
    const tipo = this.formulario.get('tipoConta')?.value;
    const tipoPessoa = this.formulario.get('tipoPessoaInstrutor')?.value;

    if (
      tipo === 'PJ Conveniados' ||
      tipo === 'Instituição Parceira (PJ)' ||
      (tipo === 'Instrutor' && tipoPessoa === 'PJ')
    ) {
      return 'Razão social';
    }
    return 'Nome completo';
  }

  get placeholderNome(): string {
    const tipo = this.formulario.get('tipoConta')?.value;
    const tipoPessoa = this.formulario.get('tipoPessoaInstrutor')?.value;

    if (
      tipo === 'PJ Conveniados' ||
      tipo === 'Instituição Parceira (PJ)' ||
      (tipo === 'Instrutor' && tipoPessoa === 'PJ')
    ) {
      return 'Nome da organização';
    }
    return 'João da Silva';
  }

  opcoesTipoPessoa = ['PF', 'PJ'];

  opcoesFormacao = [
    'Ensino fundamental',
    'Ensino médio',
    'Ensino superior',
    'Pós-graduação',
    'Mestrado',
    'Doutorado',
    'Outros',
  ];

  opcoesStatusFormacao = ['Concluído', 'Cursando', 'Incompleto', 'Trancado'];

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
    cep: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
    logradouro: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    numero: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    complemento: new FormControl('', {
      nonNullable: true,
    }),
    bairro: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    cidade: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    estado: new FormControl('', {
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
    tipoPessoaInstrutor: new FormControl('PF', {
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
      nonNullable: true,
    }),
  });

  constructor() {
    // Máscara de Telefone
    this.formulario.get('telefone')?.valueChanges.subscribe((valor) => {
      if (valor) {
        const formatado = mascaraTelefone(valor);
        if (formatado !== valor) {
          this.formulario.get('telefone')?.setValue(formatado, { emitEvent: false });
        }
      }
    });

    // Máscara de Documento (CPF/CNPJ)
    this.formulario.get('documento')?.valueChanges.subscribe((valor) => {
      if (valor) {
        const formatado = mascaraDocumento(valor);
        if (formatado !== valor) {
          this.formulario.get('documento')?.setValue(formatado, { emitEvent: false });
        }
      }
    });

    // Máscara de CEP e Busca Automática
    this.formulario.get('cep')?.valueChanges.subscribe((valor) => {
      if (valor) {
        const formatado = mascaraCep(valor);
        if (formatado !== valor) {
          this.formulario.get('cep')?.setValue(formatado, { emitEvent: false });
        }

        const cepLimpo = valor.replace(/\D/g, '');
        if (cepLimpo.length === 8) {
          this.buscarEndereco(cepLimpo);
        } else {
          this.enderecoCarregado = false;
        }
      }
    });

    // Ajuste de validadores por tipo de conta
    this.formulario.get('tipoConta')?.valueChanges.subscribe((tipo) => {
      this.atualizarValidadores();
    });

    this.formulario.get('tipoPessoaInstrutor')?.valueChanges.subscribe(() => {
      this.atualizarValidadores();
    });
  }

  private atualizarValidadores() {
    const tipo = this.formulario.get('tipoConta')?.value;
    const tipoPessoa = this.formulario.get('tipoPessoaInstrutor')?.value;

    const formacao = this.formulario.get('ultimaFormacao');
    const status = this.formulario.get('statusFormacao');
    const nomeMae = this.formulario.get('nomeMae');

    // PJ pura (Conveniados/Instituição) ou Instrutor PJ
    const ehPJ =
      tipo === 'PJ Conveniados' ||
      tipo === 'Instituição Parceira (PJ)' ||
      (tipo === 'Instrutor' && tipoPessoa === 'PJ');

    // Nome da mãe é apenas para PF (Aluno ou Instrutor PF)
    const precisaNomeMae = tipo === 'Aluno' || (tipo === 'Instrutor' && tipoPessoa === 'PF');

    // Formação é para Aluno e TODOS os Instrutores (PF ou PJ) conforme solicitado
    const precisaFormacao = tipo === 'Aluno' || tipo === 'Instrutor';

    if (precisaNomeMae) {
      nomeMae?.setValidators([Validators.required]);
    } else {
      nomeMae?.clearValidators();
    }

    if (precisaFormacao) {
      formacao?.setValidators([Validators.required]);
      status?.setValidators([Validators.required]);
    } else {
      formacao?.clearValidators();
      status?.clearValidators();
    }

    formacao?.updateValueAndValidity();
    status?.updateValueAndValidity();
    nomeMae?.updateValueAndValidity();
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

  private buscarEndereco(cep: string) {
    this.buscandoCep = true;
    this.erro = '';
    this.enderecoCarregado = false;
    this.cdr.detectChanges(); // Força atualização para exibir o "Buscando..."

    this.cepService.buscarCep(cep).subscribe({
      next: (dados) => {
        if (dados.erro) {
          this.buscandoCep = false;
          this.erro = 'CEP não encontrado.';
          this.alertaService.aviso(
            'CEP não encontrado. Por favor, preencha o endereço manualmente.',
          );
          this.enderecoCarregado = true; // Permite preenchimento manual mesmo se não encontrar
          this.cdr.detectChanges();
          return;
        }

        // 1. Primeiro exibe os campos e para o loading
        this.enderecoCarregado = true;
        this.buscandoCep = false;
        this.cdr.detectChanges(); // Garante que o *ngIf renderizou os campos

        // 2. No próximo ciclo, preenche os valores
        setTimeout(() => {
          this.formulario.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            cidade: dados.localidade,
            estado: dados.uf,
          });
          this.cdr.detectChanges(); // Força o Select a reconhecer o valor
        });
      },
      error: () => {
        this.buscandoCep = false;
        this.erro = 'Não foi possível carregar o endereço automaticamente.';
        this.enderecoCarregado = true; // Permite preenchimento manual
        this.alertaService.aviso(
          'Não conseguimos buscar seu endereço automaticamente. Por favor, preencha-o manualmente.',
        );
        this.cdr.detectChanges();
      },
    });
  }

  async enviar() {
    console.log('[Cadastro] Iniciando tentativa de envio do formulário...');

    console.log('[Cadastro] Formulário válido?', this.formulario.valid);
    if (!this.formulario.valid) {
      const campos = this.getCamposInvalidos();
      console.warn('[Cadastro] Campos inválidos:', campos);

      this.erro = 'Por favor, preencha todos os campos obrigatórios corretamente.';

      // Alerta específico para o usuário
      if (campos.includes('documento')) {
        this.alertaService.aviso('Por favor, informe um CPF ou CNPJ válido.', 'Campo inválido');
      } else if (
        campos.includes('logradouro') ||
        campos.includes('numero') ||
        campos.includes('cep')
      ) {
        this.alertaService.aviso(
          'Por favor, complete as informações de endereço. Digite um CEP válido e informe o número.',
          'Endereço incompleto',
        );
      } else if (campos.includes('termos')) {
        this.alertaService.aviso(
          'Você precisa aceitar os termos de uso e política de privacidade.',
          'Termos de uso',
        );
      } else {
        this.alertaService.aviso(
          'Existem campos obrigatórios não preenchidos ou inválidos.',
          'Atenção',
        );
      }

      this.formulario.markAllAsTouched();
      return;
    }

    const formValue = this.formulario.getRawValue();

    // Verificação de senha
    if (formValue.senha !== formValue.confirmarSenha) {
      console.warn('[Cadastro] As senhas não coincidem.');
      this.erro = 'As senhas digitadas não coincidem.';
      return;
    }

    // Verificação explícita dos termos (mesmo que já esteja no validador)
    if (!formValue.termos) {
      console.warn('[Cadastro] Termos de uso não aceitos.');
      this.erro =
        'Você precisa aceitar os Termos de Uso e a Política de Privacidade para continuar.';
      return;
    }

    this.erro = '';
    this.sucesso = '';

    // Concatena o endereço para enviar ao back
    const enderecoCompleto = `${formValue.logradouro}, ${formValue.numero}${
      formValue.complemento ? ' - ' + formValue.complemento : ''
    }, ${formValue.bairro}, ${formValue.cidade} - ${formValue.estado}, CEP: ${formValue.cep}`;

    // Determina o tipo de conta exato para o backend se for instrutor
    let tipoContaFinal = formValue.tipoConta;
    if (tipoContaFinal === 'Instrutor') {
      tipoContaFinal = formValue.tipoPessoaInstrutor === 'PJ' ? 'Instrutor (PJ)' : 'Instrutor (PF)';
    }

    const documentoLimpo = formValue.documento.replace(/\D/g, '');

    const dadosCadastro: CadastroRequest = {
      nome_completo: formValue.nome,
      nome_social: formValue.nomeSocial,
      nome_mae: formValue.nomeMae,
      endereco: enderecoCompleto,
      ultima_formacao: formValue.ultimaFormacao,
      status_ultima_formacao: formValue.statusFormacao,
      email: formValue.email,
      senha: formValue.senha,
      indicador_tipo_conta: tipoContaFinal as any,
      whatsapp: formValue.telefone,
      cpf_cnpj: documentoLimpo,
      aceitouTermos: formValue.termos,
    };

    console.log('[Cadastro] Dados preparados para envio:', { ...dadosCadastro, senha: '***' });

    this.enviando = true;

    try {
      const resultado = await this.authController.cadastrar(dadosCadastro);
      console.log('[Cadastro] Resposta do servidor:', resultado);

      if (resultado.sucesso) {
        this.sucesso = resultado.mensagem || 'Cadastro realizado com sucesso!';
        console.log('[Cadastro] Sucesso! Redirecionando para login em 2s...');
        setTimeout(() => this.router.navigate(['/login']), 2000);
      } else {
        this.erro =
          resultado.mensagem || 'Erro ao realizar cadastro. Verifique os dados e tente novamente.';
        console.error('[Cadastro] Erro retornado pelo servidor:', resultado.mensagem);
      }
    } catch (err) {
      this.erro = 'Ocorreu um erro inesperado de comunicação com o servidor.';
      console.error('[Cadastro] Erro crítico na requisição:', err);
    } finally {
      this.enviando = false;
    }
  }

  private getCamposInvalidos() {
    const invalidos: string[] = [];
    const controls = this.formulario.controls;
    for (const name in controls) {
      if ((controls as any)[name].invalid) {
        invalidos.push(name);
      }
    }
    return invalidos;
  }
}
