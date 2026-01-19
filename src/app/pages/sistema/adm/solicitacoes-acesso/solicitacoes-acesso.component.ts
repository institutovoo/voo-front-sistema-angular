import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { AutenticacaoApi } from '../../../../core/api/autenticacao-api.service';
import { AutenticacaoService } from '../../../../core/service/autenticacao.service';
import { AlertaService } from '../../../../core/service/alerta.service';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-adm-solicitacoes-acesso',
  standalone: true,
  imports: [CommonModule, HeaderIconeComponent, SistemaLayoutComponent],
  templateUrl: './solicitacoes-acesso.component.html',
  styleUrl: './solicitacoes-acesso.component.scss',
})
export class AdmSolicitacoesAcessoComponent implements OnInit {
  private api = inject(AutenticacaoApi);
  private authService = inject(AutenticacaoService);
  private alertaService = inject(AlertaService);
  private confirmService = inject(ConfirmService);

  usuarioLogado = this.authService.usuarioLogado;
  solicitacoes = signal<any[]>([]);
  carregando = signal(true);

  ngOnInit() {
    this.carregarSolicitacoes();
  }

  carregarSolicitacoes() {
    this.carregando.set(true);
    this.api.listarSolicitacoes().subscribe({
      next: (res) => {
        if (res.sucesso) {
          this.solicitacoes.set(res.solicitacoes);
        }
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  aprovar(id: string) {
    this.api.decidirSolicitacao({ id, decisao: 'aprovado' }).subscribe(res => {
      if (res.sucesso) {
        this.alertaService.sucesso('Solicitação aprovada com sucesso! O usuário agora possui o perfil de instrutor.');
        this.carregarSolicitacoes();
      } else {
        this.alertaService.erro(res.mensagem || 'Erro ao aprovar solicitação.');
      }
    });
  }

  async rejeitar(id: string) {
    const confirmado = await this.confirmService.confirmar(
      'Rejeitar Solicitação',
      'Tem certeza que deseja rejeitar esta solicitação de acesso?'
    );

    if (confirmado) {
      this.api.decidirSolicitacao({ id, decisao: 'rejeitado' }).subscribe(res => {
        if (res.sucesso) {
          this.alertaService.aviso('Solicitação rejeitada.');
          this.carregarSolicitacoes();
        } else {
          this.alertaService.erro(res.mensagem || 'Erro ao rejeitar solicitação.');
        }
      });
    }
  }
}
