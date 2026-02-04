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
  selector: 'app-aula-editor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './aula-editor.component.html',
  styleUrl: './aula-editor.component.scss',
})
export class AulaEditorComponent implements OnInit {
  formAula: FormGroup;
  cursoId: string | null = null;
  aulaId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.formAula = this.fb.group({
      titulo: ['', [Validators.required]],
      tipo: ['video', [Validators.required]],
      descricao: [''],
      tempoEstimado: [10],
      obrigatoria: [true],
      videoUrl: [''],
      anexos: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    this.aulaId = this.route.snapshot.paramMap.get('aulaId');

    this.route.queryParams.subscribe((params) => {
      if (params['itemId']) {
        this.aulaId = params['itemId'];
      }
      if (params['modo'] === 'criar') {
        this.aulaId = null;
      }
    });

    if (this.aulaId) {
      this.carregarDadosAula();
    }
  }

  carregarDadosAula() {
    this.formAula.patchValue({
      titulo: 'Introdução ao React Hooks',
      tipo: 'video',
      descricao: 'Nesta aula vamos aprender os conceitos básicos do useState e useEffect.',
      tempoEstimado: 15,
      obrigatoria: true,
    });
  }

  onSubmit() {
    if (this.formAula.valid) {
      // TODO: Salvar no backend
    }
  }
}
