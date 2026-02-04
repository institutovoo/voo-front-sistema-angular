import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

@Component({
  selector: 'app-quiz-editor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './quiz-editor.component.html',
  styleUrl: './quiz-editor.component.scss',
})
export class QuizEditorComponent implements OnInit {
  formQuiz: FormGroup;
  cursoId: string | null = null;
  quizId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.formQuiz = this.fb.group({
      titulo: ['', [Validators.required]],
      descricao: [''],
      tentativasPermitidas: [1],
      feedbackAutomatico: [true],
      questoes: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    this.quizId = this.route.snapshot.paramMap.get('quizId');

    this.route.queryParams.subscribe((params) => {
      if (params['itemId']) {
        this.quizId = params['itemId'];
      }
      if (params['modo'] === 'criar') {
        this.quizId = null;
      }
    });

    this.adicionarQuestao();
  }

  get questoes() {
    return this.formQuiz.get('questoes') as FormArray;
  }

  adicionarQuestao() {
    const questaoForm = this.fb.group({
      pergunta: ['', [Validators.required]],
      tipo: ['multipla-escolha'],
      pontuacao: [1],
      alternativas: this.fb.array([
        this.fb.group({ texto: ['', Validators.required], correta: [false] }),
        this.fb.group({ texto: ['', Validators.required], correta: [false] }),
      ]),
    });
    this.questoes.push(questaoForm);
  }

  removerQuestao(index: number) {
    this.questoes.removeAt(index);
  }

  getAlternativas(questao: any): FormArray {
    return questao.get('alternativas') as FormArray;
  }

  onSubmit() {
    if (this.formQuiz.valid) {
      // TODO: Salvar no backend
    }
  }
}
