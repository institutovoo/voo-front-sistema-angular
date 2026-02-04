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
  selector: 'app-prova-editor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './prova-editor.component.html',
  styleUrl: './prova-editor.component.scss',
})
export class ProvaEditorComponent implements OnInit {
  formProva: FormGroup;
  cursoId: string | null = null;
  provaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.formProva = this.fb.group({
      titulo: ['', [Validators.required]],
      tempoLimite: [60, [Validators.required]],
      notaMinima: [70, [Validators.required]],
      questoes: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    this.provaId = this.route.snapshot.paramMap.get('provaId');

    // Também aceita query params
    this.route.queryParams.subscribe((params) => {
      if (params['itemId']) {
        this.provaId = params['itemId'];
      }
      if (params['modo'] === 'criar') {
        this.provaId = null;
      }
    });

    this.adicionarQuestao();
  }

  get questoes() {
    return this.formProva.get('questoes') as FormArray;
  }

  adicionarQuestao() {
    const questaoForm = this.fb.group({
      pergunta: ['', [Validators.required]],
      tipo: ['multipla-escolha'], // multipla-escolha, discursiva
      pontuacao: [10],
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
    if (this.formProva.valid) {
      // TODO: Implementar salvamento no backend
    }
  }
}
