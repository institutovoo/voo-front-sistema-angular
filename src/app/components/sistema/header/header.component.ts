import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    LogoComponent,
    HeaderIconeComponent,
    HeaderMenuItemComponent,
    HeaderUsuarioAvatarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SistemaHeaderComponent {
  @Input() usuario: Usuario = { nome: 'Usuário' };
  @Input() tipoUsuario: 'aluno' | 'instrutor' | 'admin' = 'aluno';
  @Input() menuItems: MenuItem[] = [];
  @Input() menuFooterItems: MenuItem[] = [];

  @Output() logout = new EventEmitter<void>();
  @Output() buscar = new EventEmitter<string>();
  @Output() sidebarMudou = new EventEmitter<boolean>();

  sidebarAberta = true;
  menuMobileAberto = false;

  @HostBinding('class.sidebar-fechada')
  get classSidebarFechada() {
    return !this.sidebarAberta;
  }

  get menuPrincipal(): MenuItem[] {
    if (this.menuItems.length > 0) return this.menuItems;

    // Menu padrão baseado no tipo de usuário
    switch (this.tipoUsuario) {
      case 'aluno':
        return [
          { label: 'Dashboard', rota: '/aluno/dashboard', icone: 'dashboard' },
          { label: 'Meus Cursos', rota: '/aluno/meus-cursos', icone: 'cursos' },
          { label: 'Certificados', rota: '/aluno/certificados', icone: 'certificados' },
          { label: 'Loja de Cursos', rota: '/aluno/loja', icone: 'loja' },
          { label: 'Mensagens', rota: '/aluno/mensagens', icone: 'mensagens' },
        ];
      case 'instrutor':
        return [
          { label: 'Dashboard', rota: '/instrutor/dashboard', icone: 'dashboard' },
          { label: 'Meus Cursos', rota: '/instrutor/cursos', icone: 'cursos' },
          { label: 'Alunos', rota: '/instrutor/alunos', icone: 'alunos' },
          { label: 'Receitas', rota: '/instrutor/receitas', icone: 'receitas' },
          { label: 'Mensagens', rota: '/instrutor/mensagens', icone: 'mensagens' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', rota: '/admin/dashboard', icone: 'dashboard' },
          { label: 'Usuários', rota: '/admin/usuarios', icone: 'usuarios' },
          { label: 'Cursos', rota: '/admin/cursos', icone: 'cursos' },
          { label: 'Relatórios', rota: '/admin/relatorios', icone: 'relatorios' },
          { label: 'Configurações', rota: '/admin/configuracoes', icone: 'config' },
        ];
      default:
        return [];
    }
  }

  get menuRodape(): MenuItem[] {
    if (this.menuFooterItems.length > 0) return this.menuFooterItems;

    const basePath = `/${this.tipoUsuario}`;
    return [{ label: 'Configurações', rota: `${basePath}/configuracoes`, icone: 'config' }];
  }

  toggleSidebar() {
    this.sidebarAberta = !this.sidebarAberta;
    this.sidebarMudou.emit(this.sidebarAberta);
  }

  toggleMenuMobile() {
    this.menuMobileAberto = !this.menuMobileAberto;
  }

  fecharMenuMobile() {
    this.menuMobileAberto = false;
  }

  onBuscar(event: Event) {
    const input = event.target as HTMLInputElement;
    this.buscar.emit(input.value);
  }

  onLogout() {
    this.logout.emit();
  }

  get inicialUsuario(): string {
    return this.usuario.nome.charAt(0).toUpperCase();
  }
}
