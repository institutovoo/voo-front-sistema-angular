import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { AlertaService } from '../../../../core/service/alerta.service';
import { ConfirmService } from '../../../../core/service/confirm.service';

interface Fase {
  id: number;
  titulo: string;
  descricao: string;
  icone: string;
  concluida: boolean;
}

@Component({
  selector: 'app-curso-wizard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './curso-wizard.component.html',
  styleUrl: './curso-wizard.component.scss',
})
export class CursoWizardComponent implements OnInit {
  faseAtual = 1;
  totalFases = 6;
  cursoId: string | null = null;
  isEditMode = false;

  fases: Fase[] = [
    {
      id: 1,
      titulo: 'Informações Básicas',
      descricao: 'Título, descrição e categoria',
      icone: 'documento',
      concluida: false,
    },
    {
      id: 2,
      titulo: 'Público e Objetivos',
      descricao: 'Quem são seus alunos e o que vão aprender',
      icone: 'pessoas',
      concluida: false,
    },
    {
      id: 3,
      titulo: 'Estrutura do Curso',
      descricao: 'Organize o currículo em seções',
      icone: 'curso',
      concluida: false,
    },
    {
      id: 4,
      titulo: 'Mídia',
      descricao: 'Imagem de capa e vídeo',
      icone: 'imagem',
      concluida: false,
    },
    {
      id: 5,
      titulo: 'Preço',
      descricao: 'Defina o valor do curso',
      icone: 'dinheiro',
      concluida: false,
    },
    {
      id: 6,
      titulo: 'Revisão',
      descricao: 'Revise e envie para análise',
      icone: 'verificar',
      concluida: false,
    },
  ];

  // Forms para cada fase
  formFase1: FormGroup;
  formFase2: FormGroup;
  formFase3: FormGroup;
  formFase4: FormGroup;
  formFase5: FormGroup;

  // Dados da Fase 3 (Estrutura)
  secoes: { titulo: string; descricao: string }[] = [];
  novaSeccaoTitulo = '';
  novaSeccaoDescricao = '';

  // Dados da Fase 4 (Mídia)
  capaPreview: string | null = null;
  videoUrl: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertaService: AlertaService,
    private confirmService: ConfirmService,
  ) {
    // Fase 1: Informações Básicas
    this.formFase1 = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(10)]],
      descricaoCurta: ['', [Validators.required, Validators.minLength(20)]],
      descricaoLonga: ['', [Validators.required, Validators.minLength(100)]],
      categoria: ['', [Validators.required]],
      nivel: ['iniciante', [Validators.required]],
      idioma: ['portugues', [Validators.required]],
    });

    // Fase 2: Público e Objetivos
    this.formFase2 = this.fb.group({
      publicoAlvo: ['', [Validators.required]],
      preRequisitos: [''],
      objetivos: ['', [Validators.required]],
    });

    // Fase 3: Estrutura (validado separadamente)
    this.formFase3 = this.fb.group({});

    // Fase 4: Mídia
    this.formFase4 = this.fb.group({
      imagemCapa: [null],
      videoApresentacao: [''],
    });

    // Fase 5: Preço
    this.formFase5 = this.fb.group({
      tipo: ['gratuito', [Validators.required]],
      preco: [0],
      emPromocao: [false],
      precoPromocional: [0],
      certificado: [true],
    });
  }

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    if (this.cursoId) {
      this.isEditMode = true;
      this.carregarDadosCurso();
    }
  }

  carregarDadosCurso() {
    // Simula carregamento de dados
    // Em produção viria de uma API
  }

  proximaFase() {
    if (!this.validarFaseAtual()) {
      return;
    }

    this.fases[this.faseAtual - 1].concluida = true;

    if (this.faseAtual < this.totalFases) {
      this.faseAtual++;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  faseAnterior() {
    if (this.faseAtual > 1) {
      this.faseAtual--;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  irParaFase(numeroFase: number) {
    // Só permite ir para fases anteriores ou próxima se atual estiver válida
    if (numeroFase < this.faseAtual) {
      this.faseAtual = numeroFase;
    } else if (numeroFase === this.faseAtual + 1 && this.validarFaseAtual()) {
      this.proximaFase();
    }
  }

  validarFaseAtual(): boolean {
    switch (this.faseAtual) {
      case 1:
        if (this.formFase1.invalid) {
          this.marcarCamposComoTocados(this.formFase1);
          this.alertaService.aviso('Preencha todos os campos obrigatórios da Fase 1');
          return false;
        }
        return true;
      case 2:
        if (this.formFase2.invalid) {
          this.marcarCamposComoTocados(this.formFase2);
          this.alertaService.aviso('Preencha todos os campos obrigatórios da Fase 2');
          return false;
        }
        return true;
      case 3:
        if (this.secoes.length === 0) {
          this.alertaService.aviso('Adicione pelo menos uma seção ao curso');
          return false;
        }
        return true;
      case 4:
        // Mídia é opcional, mas pode adicionar validação
        return true;
      case 5:
        if (this.formFase5.invalid) {
          this.marcarCamposComoTocados(this.formFase5);
          this.alertaService.aviso('Configure o preço do curso');
          return false;
        }
        return true;
      case 6:
        return true;
      default:
        return true;
    }
  }

  marcarCamposComoTocados(form: FormGroup) {
    Object.keys(form.controls).forEach((campo) => {
      const controle = form.get(campo);
      controle?.markAsTouched();
    });
  }

  adicionarSeccao() {
    if (!this.novaSeccaoTitulo.trim()) {
      this.alertaService.erro('Digite o título da seção');
      return;
    }

    this.secoes.push({
      titulo: this.novaSeccaoTitulo,
      descricao: this.novaSeccaoDescricao,
    });

    this.novaSeccaoTitulo = '';
    this.novaSeccaoDescricao = '';
  }

  removerSeccao(index: number) {
    this.secoes.splice(index, 1);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.capaPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getProgressoGeral(): number {
    const fasesCompletas = this.fases.filter((f) => f.concluida).length;
    return Math.round((fasesCompletas / this.totalFases) * 100);
  }

  async finalizarCurso() {
    // Validar todas as fases
    const todasFasesValidas = this.validarTodasFases();

    if (!todasFasesValidas) {
      this.alertaService.erro('Complete todas as etapas obrigatórias antes de enviar');
      return;
    }

    const confirmado = await this.confirmService.confirmar(
      'Enviar para Análise',
      'Deseja enviar este curso para análise?',
    );

    if (confirmado) {
      // Aqui enviaria os dados para API
      const dadosCurso = {
        ...this.formFase1.value,
        ...this.formFase2.value,
        ...this.formFase4.value,
        ...this.formFase5.value,
        secoes: this.secoes,
      };

      // TODO: Enviar dadosCurso para API

      // Redireciona para planejamento após criação
      this.alertaService.sucesso(
        'Curso criado com sucesso! Agora complete o planejamento para enviar para análise.',
      );
      this.router.navigate(['/instrutor/cursos', '123', 'planejamento']);
    }
  }

  validarTodasFases(): boolean {
    return (
      this.formFase1.valid && this.formFase2.valid && this.secoes.length > 0 && this.formFase5.valid
    );
  }

  getCampoErro(form: FormGroup, campo: string): string | null {
    const controle = form.get(campo);
    if (controle?.invalid && controle?.touched) {
      if (controle.errors?.['required']) return 'Campo obrigatório';
      if (controle.errors?.['minlength']) {
        const minLength = controle.errors['minlength'].requiredLength;
        return `Mínimo de ${minLength} caracteres`;
      }
    }
    return null;
  }

  async voltarParaCursos() {
    const confirmado = await this.confirmService.confirmar(
      'Sair sem salvar',
      'Deseja sair? O progresso será salvo como rascunho.',
    );

    if (confirmado) {
      this.router.navigate(['/instrutor/cursos']);
    }
  }
}
