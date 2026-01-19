import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { AutenticacaoService } from '../../../../core/service/autenticacao.service';
import { AutenticacaoApi } from '../../../../core/api/autenticacao-api.service';
import { AlertaService } from '../../../../core/service/alerta.service';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { ModalComponent } from '../../../../components/comum/modal/modal.component';

@Component({
  selector: 'app-adm-usuarios',
  standalone: true,
  imports: [
    RouterModule, 
    FormsModule,
    SistemaLayoutComponent, 
    HeaderIconeComponent, 
    ModalComponent, 
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class AdmUsuariosComponent implements OnInit {
  private authService = inject(AutenticacaoService);
  private authApi = inject(AutenticacaoApi);
  private alertaService = inject(AlertaService);
  private confirmService = inject(ConfirmService);

  usuarioLogado = this.authService.usuarioLogado;
  usuarios = signal<any[]>([]);
  carregando = signal(true);

  // Filtros
  busca = signal('');
  filtroTipo = signal('todos');
  filtroStatus = signal('todos');

  usuariosFiltrados = computed(() => {
    let lista = this.usuarios();
    const termo = this.busca().toLowerCase().trim();
    const tipo = this.filtroTipo();
    const status = this.filtroStatus();

    // Filtro de Busca (Nome, Email ou CPF)
    if (termo) {
      lista = lista.filter(u => 
        u.nome_completo?.toLowerCase().includes(termo) ||
        u.email?.toLowerCase().includes(termo) ||
        u.cpf_cnpj?.includes(termo)
      );
    }

    // Filtro de Tipo (Perfil)
    if (tipo !== 'todos') {
      lista = lista.filter(u => {
        if (tipo === 'aluno') return u.perfis?.includes('Aluno');
        if (tipo === 'instrutor') return u.perfis?.some((p: string) => p.includes('Instrutor'));
        if (tipo === 'admin') return u.perfis?.includes('Admin');
        return true;
      });
    }

    // Filtro de Status
    if (status !== 'todos') {
      lista = lista.filter(u => (u.status || 'ativo') === status);
    }

    return lista;
  });

  // Estados dos Modais
  mostrarModalDetalhes = signal(false);
  mostrarModalBloqueio = signal(false);
  usuarioSelecionado = signal<any>(null);
  motivoBloqueio = signal('');

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.carregando.set(true);
    this.authApi.listarUsuarios().subscribe({
      next: (res) => {
        if (res.sucesso) {
          this.usuarios.set(res.usuarios);
        }
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  setBusca(valor: string) {
    this.busca.set(valor);
  }

  setFiltroTipo(valor: string) {
    this.filtroTipo.set(valor);
  }

  setFiltroStatus(valor: string) {
    this.filtroStatus.set(valor);
  }

  abrirDetalhes(usuario: any) {
    this.usuarioSelecionado.set(usuario);
    this.mostrarModalDetalhes.set(true);
  }

  prepararBloqueio(usuario: any) {
    if (this.ehUsuarioLogado(usuario)) {
      this.alertaService.erro('Você não pode bloquear a sua própria conta.', 'Ação Negada');
      return;
    }
    this.usuarioSelecionado.set(usuario);
    this.motivoBloqueio.set('');
    this.mostrarModalBloqueio.set(true);
  }

  confirmarBloqueio() {
    if (!this.motivoBloqueio().trim()) {
      this.alertaService.aviso('Por favor, informe o motivo do bloqueio.', 'Campo Obrigatório');
      return;
    }

    const u = this.usuarioSelecionado();
    this.authApi.bloquearUsuario({ cpf_cnpj: u.cpf_cnpj, motivo: this.motivoBloqueio() }).subscribe({
      next: (res) => {
        if (res.sucesso) {
          this.alertaService.sucesso(`O usuário ${u.nome_completo} foi bloqueado com sucesso.`, 'Usuário Bloqueado');
          this.mostrarModalBloqueio.set(false);
          this.carregarUsuarios();
        } else {
          this.alertaService.erro(res.mensagem || 'Erro ao bloquear usuário.', 'Erro');
        }
      }
    });
  }

  async desbloquearUsuario(usuario: any) {
    const confirmado = await this.confirmService.confirmar(
      'Desbloquear Usuário',
      `Deseja realmente desbloquear o acesso do usuário ${usuario.nome_completo}?`
    );

    if (confirmado) {
      this.authApi.desbloquearUsuario(usuario.cpf_cnpj).subscribe({
        next: (res) => {
          if (res.sucesso) {
            this.alertaService.sucesso(`O usuário ${usuario.nome_completo} foi desbloqueado.`, 'Usuário Desbloqueado');
            this.carregarUsuarios();
          } else {
            this.alertaService.erro(res.mensagem || 'Erro ao desbloquear usuário.', 'Erro');
          }
        }
      });
    }
  }

  async confirmarExclusao(usuario: any) {
    if (this.ehUsuarioLogado(usuario)) {
      this.alertaService.erro('Você não pode desativar a sua própria conta.', 'Ação Negada');
      return;
    }

    const confirmado = await this.confirmService.confirmar(
      'Desativar Usuário',
      `Tem certeza que deseja desativar o usuário ${usuario.nome_completo}? Ele não poderá mais acessar o sistema.`
    );

    if (confirmado) {
      this.authApi.excluirUsuario(usuario.cpf_cnpj).subscribe({
        next: (res) => {
          if (res.sucesso) {
            this.alertaService.sucesso('O usuário foi desativado do sistema.', 'Desativação Concluída');
            this.carregarUsuarios();
          } else {
            this.alertaService.erro(res.mensagem || 'Erro ao desativar usuário.', 'Erro');
          }
        }
      });
    }
  }

  ehUsuarioLogado(u: any): boolean {
    return u.cpf_cnpj === this.usuarioLogado()?.cpf_cnpj;
  }

  getStatusLabel(status: string): string {
    const map: any = { 
      ativo: 'Ativo', 
      bloqueado: 'Bloqueado', 
      pendente: 'Pendente',
      desativado: 'Desativado'
    };
    return map[status] || status || 'Ativo';
  }
}
