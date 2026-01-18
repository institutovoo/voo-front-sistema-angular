import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

interface UsuarioGestao {
  id: number;
  nome: string;
  email: string;
  tipo: 'aluno' | 'instrutor' | 'adm';
  status: 'ativo' | 'bloqueado' | 'pendente';
  dataCadastro: string;
  totalCursos?: number;
}

@Component({
  selector: 'app-adm-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class AdmUsuariosComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };

  usuarios = signal<UsuarioGestao[]>([
    { id: 1, nome: 'Alice Ferreira', email: 'alice@email.com', tipo: 'aluno', status: 'ativo', dataCadastro: '12/01/2026' },
    { id: 2, nome: 'Marcos Instrutor', email: 'marcos@edu.com', tipo: 'instrutor', status: 'pendente', dataCadastro: '15/01/2026', totalCursos: 2 },
    { id: 3, nome: 'Roberto Silva', email: 'roberto@adm.com', tipo: 'adm', status: 'ativo', dataCadastro: '01/01/2026' },
    { id: 4, nome: 'Lucas Santos', email: 'lucas@email.com', tipo: 'aluno', status: 'bloqueado', dataCadastro: '10/12/2025' }
  ]);

  ngOnInit() {}

  getStatusLabel(status: string): string {
    const map: any = { ativo: 'Ativo', bloqueado: 'Bloqueado', pendente: 'Pendente' };
    return map[status] || status;
  }
}
