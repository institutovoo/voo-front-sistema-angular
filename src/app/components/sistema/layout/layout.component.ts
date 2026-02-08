import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SistemaHeaderComponent, Usuario } from '../header/header.component';
import { AutenticacaoService } from '../../../core/service/autenticacao.service';

@Component({
  selector: 'app-sistema-layout',
  standalone: true,
  imports: [CommonModule, SistemaHeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class SistemaLayoutComponent {
  private authService = inject(AutenticacaoService);

  usuarioLogado = this.authService.usuarioLogado;

  @Input() usuario: Usuario = { nome: 'Usuário' };
  @Input() tipoUsuario: 'aluno' | 'instrutor' | 'admin' = 'aluno';
  @Input() conteudoMaxWidth?: string;

  @Output() logout = new EventEmitter<void>();
  @Output() buscar = new EventEmitter<string>();

  constructor(private readonly router: Router) {
    // Bloqueio de acesso se for primeiro login
    const user = this.authService.usuarioLogado();
    if (user?.primeiroLogin) {
      this.router.navigate(['/usuarios/troca-senha-obrigatoria']);
    }
  }

  get usuarioExibicao(): Usuario {
    const user = this.usuarioLogado();
    if (user) {
      return {
        nome: user.nome_completo,
        email: user.email,
        avatar: '',
      };
    }
    return this.usuario;
  }

  onLogout() {
    this.authService.logout();
  }

  onBuscar(valor: string) {
    this.buscar.emit(valor);
  }
}
