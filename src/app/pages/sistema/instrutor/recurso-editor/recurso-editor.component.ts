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

@Component({
  selector: 'app-recurso-editor',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './recurso-editor.component.html',
  styleUrl: './recurso-editor.component.scss',
})
export class RecursoEditorComponent implements OnInit {
  formRecurso: FormGroup;
  cursoId: string | null = null;
  recursoId: string | null = null;
  secaoId: string | null = null;
  secaoTitulo: string = '';
  modo: 'criar' | 'editar' = 'criar';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.formRecurso = this.fb.group({
      titulo: ['', [Validators.required]],
      descricao: [''],
      tipo: ['documento', [Validators.required]], // documento, link, texto
      arquivo: [null],
      linkExterno: [''],
      conteudoTexto: [''],
    });
  }

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');

    // Aceita query params
    this.route.queryParams.subscribe((params) => {
      this.secaoId = params['secaoId'] || null;
      this.secaoTitulo = params['secaoTitulo'] || '';
      this.recursoId = params['itemId'] || null;
      this.modo = params['modo'] || 'criar';

      if (this.modo === 'editar' && this.recursoId) {
        this.carregarRecurso();
      }
    });
  }

  carregarRecurso() {
    // TODO: Implementar carregamento do recurso via API
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formRecurso.patchValue({ arquivo: file });
    }
  }

  salvar() {
    if (this.formRecurso.invalid) {
      return;
    }

    // TODO: Implementar salvamento no backend via API

    this.router.navigate([`/instrutor/cursos/${this.cursoId}/estrutura`]);
  }

  voltar() {
    this.router.navigate([`/instrutor/cursos/${this.cursoId}/estrutura`]);
  }
}
