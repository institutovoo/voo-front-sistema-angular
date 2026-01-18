import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

interface CursoAdm {
  id: number;
  titulo: string;
  instrutor: string;
  status: 'publicado' | 'pendente' | 'bloqueado';
  preco: number;
  dataCriacao: string;
}

@Component({
  selector: 'app-adm-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.scss'
})
export class AdmCursosComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };

  cursos = signal<CursoAdm[]>([
    { id: 1, titulo: 'Desenvolvimento Web Fullstack', instrutor: 'João Silva', status: 'publicado', preco: 497.00, dataCriacao: '10/01/2026' },
    { id: 2, titulo: 'IA para Desenvolvedores', instrutor: 'Marcos Oliveira', status: 'pendente', preco: 297.00, dataCriacao: '15/01/2026' },
    { id: 3, titulo: 'React Avançado', instrutor: 'Ana Souza', status: 'publicado', preco: 397.00, dataCriacao: '05/01/2026' }
  ]);

  ngOnInit() {}

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }
}
