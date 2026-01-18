import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

interface InstrutorAdm {
  id: number;
  nome: string;
  email: string;
  totalAlunos: number;
  comissao: number;
  status: 'ativo' | 'analise';
}

@Component({
  selector: 'app-adm-instrutores',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './instrutores.component.html',
  styleUrl: './instrutores.component.scss'
})
export class AdmInstrutoresComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };

  instrutores = signal<InstrutorAdm[]>([
    { id: 1, nome: 'João Silva', email: 'joao@edu.com', totalAlunos: 1250, comissao: 70, status: 'ativo' },
    { id: 2, nome: 'Marcos Oliveira', email: 'marcos@edu.com', totalAlunos: 0, comissao: 70, status: 'analise' }
  ]);

  ngOnInit() {}
}
