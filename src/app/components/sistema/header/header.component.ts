import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../logo/logo.component';
import { HeaderIconeComponent } from './components/icone/icone.component';
import { HeaderMenuItemComponent, MenuItem } from './components/menu-item/menu-item.component';
import { HeaderUsuarioAvatarComponent } from './components/usuario-avatar/usuario-avatar.component';
import { AutenticacaoService } from '../../../core/service/autenticacao.service';
import { TipoConta } from '../../../core/model/autenticacao.model';
import { ModalNovoPerfilComponent } from '../modal-novo-perfil/modal-novo-perfil.component';
import { ConfirmService } from '../../../core/service/confirm.service';

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
    ModalNovoPerfilComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SistemaHeaderComponent implements OnInit, OnChanges {
  private authService = inject(AutenticacaoService);
  private router = inject(Router);
  private confirmService = inject(ConfirmService);

  @Input() usuario: Usuario = { nome: 'Usuário' };
  @Input() tipoUsuario: 'aluno' | 'instrutor' | 'admin' = 'aluno';
  @Input() menuItems: MenuItem[] = [];

  @Output() logout = new EventEmitter<void>();
  @Output() buscar = new EventEmitter<string>();

  menuUsuarioAberto = false;
  menuMobileAberto = false;
  menuPerfilAberto = false;
  modalNovoPerfilAberto = false;

  menuPrincipal: MenuItem[] = [];

  // Signals do service
  usuarioLogado = this.authService.usuarioLogado;
  perfilAtual = this.authService.perfilAtual;

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
      const perfil = this.perfilAtual();
      
      if (perfil === 'Admin') {
        this.menuPrincipal = [
          { label: 'Dashboard', rota: '/admin/dashboard', icone: 'dashboard' },
          { label: 'Solicitações', rota: '/admin/solicitacoes', icone: 'verificar' },
          { label: 'Usuários', rota: '/admin/usuarios', icone: 'usuarios' },
          { label: 'Cursos', rota: '/admin/cursos', icone: 'cursos' },
          { label: 'Instrutores', rota: '/admin/instrutores', icone: 'usuarios' },
          { label: 'Auditoria', rota: '/admin/auditoria', icone: 'documento' },
        ];
      } else if (perfil?.toLowerCase().includes('instrutor')) {
        this.menuPrincipal = [
          { label: 'Dashboard', rota: '/instrutor/dashboard', icone: 'dashboard' },
          { label: 'Meus Cursos', rota: '/instrutor/cursos', icone: 'cursos' },
          { label: 'Alunos', rota: '/instrutor/alunos', icone: 'alunos' },
          { label: 'Receitas', rota: '/instrutor/receitas', icone: 'receitas' },
        ];
      } else {
        this.menuPrincipal = [
          { label: 'Dashboard', rota: '/aluno/dashboard', icone: 'dashboard' },
          { label: 'Meus Cursos', rota: '/aluno/meus-cursos', icone: 'cursos' },
          { label: 'Certificados', rota: '/aluno/certificados', icone: 'certificados' },
          { label: 'Loja de Cursos', rota: '/aluno/loja', icone: 'loja' },
        ];
      }
    }
  }

  toggleMenuUsuario() {
    this.menuUsuarioAberto = !this.menuUsuarioAberto;
    if (this.menuUsuarioAberto) this.menuPerfilAberto = false;
  }

  toggleMenuPerfil(event: Event) {
    event.stopPropagation();
    this.menuPerfilAberto = !this.menuPerfilAberto;
    if (this.menuPerfilAberto) this.menuUsuarioAberto = false;
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

  async onLogout() {
    this.fecharMenuUsuario();
    const confirmado = await this.confirmService.confirmar(
      'Sair do Sistema',
      'Tem certeza que deseja encerrar sua sessão atual?'
    );

    if (confirmado) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  onConfiguracoes() {
    this.fecharMenuUsuario();
  }

  alternarPerfil(perfil: TipoConta) {
    this.authService.alternarPerfil(perfil);
    this.menuPerfilAberto = false;
    this.inicializarMenus();
  }

  abrirModalNovoPerfil() {
    this.modalNovoPerfilAberto = true;
    this.menuPerfilAberto = false;
  }

  aoCriarPerfil(evento: { tipo: TipoConta; dadosExtras?: any }) {
    this.authService.adicionarPerfil(evento.tipo, evento.dadosExtras);
    this.modalNovoPerfilAberto = false;
    this.inicializarMenus();
  }

  get inicialUsuario(): string {
    return this.usuario?.nome?.charAt(0)?.toUpperCase() || 'U';
  }
}
