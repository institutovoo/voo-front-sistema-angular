import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HeaderIconeComponent } from '../icone/icone.component';

export interface MenuItem {
  label: string;
  rota: string;
  icone: string;
}

@Component({
  selector: 'app-header-menu-item',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, HeaderIconeComponent],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class HeaderMenuItemComponent {
  @Input() item!: MenuItem;
  @Input() compacto: boolean = false;
  @Input() variante: 'normal' | 'sair' = 'normal';

  @Output() itemClick = new EventEmitter<MenuItem>();

  onClick() {
    this.itemClick.emit(this.item);
  }
}
