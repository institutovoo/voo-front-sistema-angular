import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';
import { HeaderIconeComponent } from './components/icone/icone.component';
import { HeaderMenuItemComponent, MenuItem } from './components/menu-item/menu-item.component';
import { HeaderUsuarioAvatarComponent } from './components/usuario-avatar/usuario-avatar.component';

export type { MenuItem } from './components/menu-item/menu-item.component';

export interface Usuario {
  nome: string;
  email?: string;
  avatar?: string;
}

@Component({
  selector: 'app-sistema-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LogoComponent,
    HeaderIconeComponent,
    HeaderMenuItemComponent,
    HeaderUsuarioAvatarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SistemaHeaderComponent implements OnInit, OnChanges {
  @Input() usuario: Usuario = { nome: 'Usuário' };
  @Input() tipoUsuario: 'aluno' | 'instrutor' | 'admin' = 'aluno';
  @Input() menuItems: MenuItem[] = [];

  @Output() logout = new EventEmitter<void>();
  @Output() buscar = new EventEmitter<string>();

  menuUsuarioAberto = false;
  menuMobileAberto = false;

  menuPrincipal: MenuItem[] = [];

  ngOnInit() {
    this.inicializarMenus();
  }

  ngOnChanges(changes: any) {
    if (changes.tipoUsuario || changes.menuItems) {
      this.inicializarMenus();
    }
  }

  private inicializarMenus() {
    // Menu Principal (Horizontal)
    if (this.menuItems && this.menuItems.length > 0) {
      this.menuPrincipal = this.menuItems;
    } else {
      switch (this.tipoUsuario) {
        case 'aluno':
          this.menuPrincipal = [
            { label: 'Dashboard', rota: '/aluno/dashboard', icone: 'dashboard' },
            { label: 'Meus Cursos', rota: '/aluno/meus-cursos', icone: 'cursos' },
            { label: 'Certificados', rota: '/aluno/certificados', icone: 'certificados' },
            { label: 'Loja de Cursos', rota: '/aluno/loja', icone: 'loja' },
          ];
          break;
        case 'instrutor':
          this.menuPrincipal = [
            { label: 'Dashboard', rota: '/instrutor/dashboard', icone: 'dashboard' },
            { label: 'Meus Cursos', rota: '/instrutor/cursos', icone: 'cursos' },
            { label: 'Alunos', rota: '/instrutor/alunos', icone: 'alunos' },
            { label: 'Receitas', rota: '/instrutor/receitas', icone: 'receitas' },
          ];
          break;
        case 'admin':
          this.menuPrincipal = [
            { label: 'Dashboard', rota: '/admin/dashboard', icone: 'dashboard' },
            { label: 'Usuários', rota: '/admin/usuarios', icone: 'usuarios' },
            { label: 'Cursos', rota: '/admin/cursos', icone: 'cursos' },
            { label: 'Relatórios', rota: '/admin/relatorios', icone: 'relatorios' },
            { label: 'Auditoria', rota: '/admin/auditoria', icone: 'config' },
          ];
          break;
        default:
          this.menuPrincipal = [];
      }
    }
  }

  toggleMenuUsuario() {
    this.menuUsuarioAberto = !this.menuUsuarioAberto;
  }

  fecharMenuUsuario() {
    this.menuUsuarioAberto = false;
  }

  toggleMenuMobile() {
    this.menuMobileAberto = !this.menuMobileAberto;
  }

  fecharMenuMobile() {
    this.menuMobileAberto = false;
  }

  onLogout() {
    this.fecharMenuUsuario();
    this.logout.emit();
  }

  onConfiguracoes() {
    this.fecharMenuUsuario();
    // Navegação será feita pelo routerLink no HTML
  }

  get inicialUsuario(): string {
    return this.usuario?.nome?.charAt(0)?.toUpperCase() || 'U';
  }
}
