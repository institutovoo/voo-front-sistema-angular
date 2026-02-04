import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

@Component({
  selector: 'app-curso-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './curso-form.component.html',
  styleUrl: './curso-form.component.scss',
})
export class CursoFormComponent implements OnInit {
  formCurso: FormGroup;
  isEditMode = false;
  cursoId: string | null = null;
  keywords: string[] = [];
  keywordInput = '';
  capaPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.formCurso = this.fb.group({
      titulo: ['', [Validators.required]],
      descricaoCurta: ['', [Validators.required]],
      descricaoLonga: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      nivel: ['iniciante', [Validators.required]],
      idioma: ['portugues', [Validators.required]],
      preRequisitos: [''],
      objetivos: [''],
      publicoAlvo: [''],
      tipo: ['gratuito', [Validators.required]],
      preco: [0],
      emPromocao: [false],
      precoPromocional: [0],
      certificado: [true],
      imagemCapa: [null],
      videoApresentacao: [null],
    });
  }

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    if (this.cursoId) {
      this.isEditMode = true;
      this.carregarDadosCurso();
    }
  }

  adicionarKeyword(event: any) {
    const value = event.target.value.trim();
    if (value && !this.keywords.includes(value)) {
      this.keywords.push(value);
      event.target.value = '';
    }
  }

  removerKeyword(keyword: string) {
    this.keywords = this.keywords.filter((k) => k !== keyword);
  }

  carregarDadosCurso() {
    // Simulação de carregamento de dados vindos de uma API
    const cursoMock = {
      titulo: 'Desenvolvimento Web Fullstack: Do Zero ao Pro',
      descricaoCurta:
        'Aprenda as tecnologias mais modernas do mercado e torne-se um desenvolvedor completo. HTML, CSS, JavaScript, React e Node.js na prática.',
      descricaoLonga:
        'Neste curso completo você aprenderá HTML, CSS, JavaScript, React, Node.js e muito mais. O curso é focado em projetos práticos e no mercado de trabalho. Você desenvolverá aplicações reais desde o início até o deploy.',
      categoria: 'programacao',
      nivel: 'intermediario',
      idioma: 'portugues',
      preRequisitos: 'Conhecimentos básicos de lógica de programação e vontade de aprender.',
      objetivos:
        'Desenvolver aplicações completas, entender o fluxo de dados client-server, dominar ferramentas modernas de frontend e backend, criar APIs RESTful, trabalhar com banco de dados.',
      publicoAlvo:
        'Estudantes de tecnologia, desenvolvedores iniciantes que querem se especializar, profissionais de outras áreas em transição de carreira.',
      tipo: 'pago',
      preco: 149.99,
      emPromocao: true,
      precoPromocional: 99.9,
      certificado: true,
    };

    this.formCurso.patchValue(cursoMock);
    this.keywords = [
      'web',
      'fullstack',
      'javascript',
      'react',
      'node.js',
      'html',
      'css',
      'backend',
      'frontend',
    ];
    this.capaPreview = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800';
  }

  onSubmit() {
    if (this.formCurso.valid) {
      const dados = {
        ...this.formCurso.value,
        keywords: this.keywords,
      };
      // TODO: Enviar dados para API
    }
  }
}
