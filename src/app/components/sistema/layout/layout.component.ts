import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SistemaHeaderComponent, Usuario } from '../header/header.component';

@Component({
  selector: 'app-sistema-layout',
  standalone: true,
  imports: [CommonModule, SistemaHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class SistemaLayoutComponent {
  @Input() usuario: Usuario = { nome: 'Usuário' };
  @Input() tipoUsuario: 'aluno' | 'instrutor' | 'admin' = 'aluno';
  @Input() conteudoMaxWidth?: string;

  @Output() logout = new EventEmitter<void>();
  @Output() buscar = new EventEmitter<string>();

  sidebarAberta = true;

  constructor(private readonly router: Router) {}

  onSidebarMudou(aberta: boolean) {
    this.sidebarAberta = aberta;
  }

  onLogout() {
    this.logout.emit();
  }

  onBuscar(valor: string) {
    this.buscar.emit(valor);
  }
}
