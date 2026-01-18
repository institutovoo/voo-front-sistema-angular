import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
})
export class LogoComponent {
  /**
   * Define o tema do logo:
   * - 'light': fundo claro → texto escuro (#0b1b2b)
   * - 'dark': fundo escuro → texto branco (#fff)
   */
  @Input() tema: 'light' | 'dark' = 'light';

  /**
   * Se true, o logo vira um link para a home. 
   * Pode ser uma string com a rota específica.
   */
  @Input() linkHome: boolean | string = true;

  get homeRoute(): string {
    if (typeof this.linkHome === 'string') return this.linkHome;
    return '/';
  }
}
