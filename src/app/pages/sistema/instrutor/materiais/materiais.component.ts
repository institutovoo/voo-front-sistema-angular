import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

interface Material {
  id: number;
  nome: string;
  tipo: 'pdf' | 'doc' | 'slide' | 'planilha';
  tamanho: string;
  modulo: string;
  dataUpload: string;
}

@Component({
  selector: 'app-materiais',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './materiais.component.html',
  styleUrl: './materiais.component.scss'
})
export class MateriaisComponent implements OnInit {
  cursoId: string | null = null;
  materiais: Material[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    this.carregarMateriais();
  }

  carregarMateriais() {
    this.materiais = [
      { id: 1, nome: 'Guia de Instalação.pdf', tipo: 'pdf', tamanho: '2.4 MB', modulo: 'Módulo 1', dataUpload: '2026-01-15' },
      { id: 2, nome: 'Slides Aula 04.pptx', tipo: 'slide', tamanho: '15.8 MB', modulo: 'Módulo 2', dataUpload: '2026-01-20' },
      { id: 3, nome: 'Exercícios Práticos.docx', tipo: 'doc', tamanho: '1.1 MB', modulo: 'Módulo 2', dataUpload: '2026-01-22' }
    ];
  }

  getIcone(tipo: string): string {
    const icones: any = {
      pdf: 'documento',
      doc: 'documento',
      slide: 'video',
      planilha: 'dashboard'
    };
    return icones[tipo] || 'documento';
  }
}
