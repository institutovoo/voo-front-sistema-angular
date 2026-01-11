import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-usuario-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-avatar.component.html',
  styleUrl: './usuario-avatar.component.scss',
})
export class HeaderUsuarioAvatarComponent {
  @Input() nome: string = 'Usuário';
  @Input() avatar?: string;
  @Input() mostrarNome: boolean = true;
  @Input() tamanho: 'sm' | 'md' | 'lg' = 'md';

  get inicial(): string {
    return this.nome.charAt(0).toUpperCase();
  }
}
