import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoConta } from '../../../core/model/autenticacao.model';
import { BotaoComponent } from '../../botao/botao.component';
import { CampoComponent } from '../../campo/campo.component';
import { HeaderIconeComponent } from '../header/components/icone/icone.component';
import { mascaraDocumento } from '../../../core/utils/mascaras';
import { ConfirmService } from '../../../core/service/confirm.service';

export interface PerfilOpcao {
  tipo: TipoConta;
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
}

@Component({
  selector: 'app-modal-novo-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BotaoComponent, CampoComponent, HeaderIconeComponent],
  templateUrl: './modal-novo-perfil.component.html',
  styleUrl: './modal-novo-perfil.component.scss',
})
export class ModalNovoPerfilComponent implements OnInit {
  private fb = inject(FormBuilder);
  private confirmService = inject(ConfirmService);

  @Input() perfilAtual: TipoConta | null = null;
  @Input() perfisExistentes: TipoConta[] = [];
  @Input() documentos: string[] = [];
  @Output() fechar = new EventEmitter<void>();
  @Output() criar = new EventEmitter<{ tipo: TipoConta; dadosExtras?: any }>();

  passo: 'selecao' | 'formulario' = 'selecao';
  perfilSelecionado: PerfilOpcao | null = null;
  formularioExtras: FormGroup;

  tipoDocumentoNecessario: 'CPF' | 'CNPJ' | null = null;

  opcoes: PerfilOpcao[] = [
    {
      tipo: 'Aluno',
      titulo: 'Aluno',
      descricao: 'Acesso a cursos e certificados',
      icone: 'usuario',
      cor: '#21b7cd',
    },
    {
      tipo: 'Instrutor (PF)',
      titulo: 'Instrutor (PF)',
      descricao: 'Crie e gerencie seus próprios cursos',
      icone: 'usuario',
      cor: '#21b7cd',
    },
    {
      tipo: 'Instrutor (PJ)',
      titulo: 'Instrutor (PJ)',
      descricao: 'Gestão profissional de cursos para empresas',
      icone: 'usuarios',
      cor: '#21b7cd',
    },
    {
      tipo: 'PJ Conveniados',
      titulo: 'Empresa Conveniada',
      descricao: 'Gestão de treinamentos para colaboradores',
      icone: 'usuarios',
      cor: '#10b981',
    },
    {
      tipo: 'Instituição Parceira (PJ)',
      titulo: 'Instituição Parceira',
      descricao: 'Parcerias educacionais de alto nível',
      icone: 'documento',
      cor: '#8b5cf6',
    },
  ];

  constructor() {
    this.formularioExtras = this.fb.group({
      documento: ['', [Validators.required]],
      razaoSocial: [''],
    });
  }

  ngOnInit() {
    // Aplica máscara ao campo de documento
    this.formularioExtras.get('documento')?.valueChanges.subscribe(valor => {
      if (valor) {
        const formatado = mascaraDocumento(valor);
        if (formatado !== valor) {
          this.formularioExtras.get('documento')?.setValue(formatado, { emitEvent: false });
        }
      }
    });
  }

  get opcoesDisponiveis(): PerfilOpcao[] {
    return this.opcoes.filter((opcao) => {
      // Não pode criar o perfil que já tem
      if (this.perfisExistentes.includes(opcao.tipo)) return false;

      // Regras de Admin: Pode tudo
      if (this.perfilAtual === 'Admin') return true;

      // Regra de PF (Aluno ou Instrutor PF):
      // Podem alternar entre si e podem criar um perfil PJ (Instrutor PJ)
      const ehUsuarioPF = this.perfilAtual === 'Aluno' || this.perfilAtual === 'Instrutor (PF)';
      if (ehUsuarioPF) {
        return (
          opcao.tipo === 'Aluno' || 
          opcao.tipo === 'Instrutor (PF)' || 
          opcao.tipo === 'Instrutor (PJ)'
        );
      }

      // Regra de PJ (Empresas, Instituições ou Instrutor PJ):
      // NUNCA podem ser Aluno ou Instrutor PF.
      // Podem apenas criar outros perfis PJ (como Instrutor PJ se forem Empresa/Instituição).
      const ehUsuarioPJ = this.perfilAtual?.includes('PJ') || this.perfilAtual?.includes('Parceira');
      if (ehUsuarioPJ) {
        const ehNovoPerfilPJ = opcao.tipo.includes('(PJ)') || opcao.tipo.includes('PJ ');
        return ehNovoPerfilPJ && opcao.tipo !== 'Aluno' && opcao.tipo !== 'Instrutor (PF)';
      }

      return false;
    });
  }

  selecionarPerfil(opcao: PerfilOpcao) {
    this.perfilSelecionado = opcao;
    
    // Verifica se o novo perfil exige um tipo de documento que o usuário ainda não tem
    const ehNovoPJ = opcao.tipo.includes('(PJ)') || opcao.tipo.includes('PJ ');
    const ehNovoPF = opcao.tipo === 'Aluno' || opcao.tipo === 'Instrutor (PF)';

    const jaTemPJ = this.documentos.some(doc => doc.replace(/\D/g, '').length === 14);
    const jaTemPF = this.documentos.some(doc => doc.replace(/\D/g, '').length === 11);

    // Se o perfil for Instrutor, avisar sobre a aprovação
    const requerAprovacao = opcao.tipo.includes('Instrutor') && this.perfilAtual !== 'Admin';

    if (ehNovoPJ && !jaTemPJ) {
      this.tipoDocumentoNecessario = 'CNPJ';
      this.formularioExtras.get('documento')?.setValidators([Validators.required, Validators.minLength(14)]);
      this.formularioExtras.get('razaoSocial')?.setValidators([Validators.required]);
      this.passo = 'formulario';
    } else if (ehNovoPF && !jaTemPF) {
      this.tipoDocumentoNecessario = 'CPF';
      this.formularioExtras.get('documento')?.setValidators([Validators.required, Validators.minLength(11)]);
      this.formularioExtras.get('razaoSocial')?.clearValidators();
      this.passo = 'formulario';
    } else if (ehNovoPJ) {
      // Se já tem o documento mas o perfil é PJ, ainda pode precisar da Razão Social se for a primeira vez
      this.tipoDocumentoNecessario = 'CNPJ';
      this.formularioExtras.get('documento')?.setValue(this.documentos.find(doc => doc.replace(/\D/g, '').length === 14));
      this.formularioExtras.get('razaoSocial')?.setValidators([Validators.required]);
      this.passo = 'formulario';
    } else if (requerAprovacao) {
      // Se for instrutor e não tiver dados extras para preencher, ainda precisa confirmar que sabe da aprovação
      this.solicitarConfirmacaoAprovacao(opcao);
    } else {
      this.confirmarCriacao();
    }
    
    this.formularioExtras.updateValueAndValidity();
  }

  private async solicitarConfirmacaoAprovacao(opcao: PerfilOpcao) {
    const confirmado = await this.confirmService.confirmar(
      'Solicitar Acesso',
      `O perfil de ${opcao.titulo} requer aprovação do administrador. Deseja enviar sua solicitação para análise?`
    );
    if (confirmado) {
      this.confirmarCriacao();
    }
  }

  voltar() {
    this.passo = 'selecao';
    this.perfilSelecionado = null;
  }

  confirmarCriacao() {
    if (this.perfilSelecionado) {
      const formValue = this.formularioExtras.value;
      
      // Se não preencheu o documento no formulário, tenta pegar o que já temos
      if (!formValue.documento) {
        const ehNovoPJ = this.perfilSelecionado.tipo.includes('(PJ)') || this.perfilSelecionado.tipo.includes('PJ ');
        const docExistente = this.documentos.find(doc => {
          const limpo = doc.replace(/\D/g, '');
          return ehNovoPJ ? limpo.length === 14 : limpo.length === 11;
        });
        
        if (docExistente) {
          formValue.documento = docExistente;
        }
      }

      this.criar.emit({ tipo: this.perfilSelecionado.tipo, dadosExtras: formValue });
    }
  }

  aoFechar() {
    this.fechar.emit();
  }

  aoClicarFora(evento: MouseEvent) {
    if ((evento.target as HTMLElement).classList.contains('modal-overlay')) {
      this.aoFechar();
    }
  }
}
