import { Component, inject } from '@angular/core';
import { ConfigPerfilComponent } from '../../../../components/sistema/configuracao/perfil/perfil.component';
import { ConfigSegurancaComponent } from '../../../../components/sistema/configuracao/seguranca/seguranca.component';
import { ConfigNotificacaoComponent } from '../../../../components/sistema/configuracao/notificacao/notificacao.component';
import { Usuario } from '../../../../components/sistema/header/header.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { AutenticacaoService } from '../../../../core/service/autenticacao.service';

type AbaConfig = 'perfil' | 'pagamento' | 'seguranca' | 'notificacoes';

interface Aba {
  id: AbaConfig;
  label: string;
  icone: string;
}

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    SistemaLayoutComponent,
    ConfigPerfilComponent,
    ConfigSegurancaComponent,
    ConfigNotificacaoComponent,
  ],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss',
})
export class ConfiguracoesComponent {
  private authService = inject(AutenticacaoService);

  usuario: Usuario = {
    nome: this.authService.usuarioLogado()?.nome_completo || 'Usuário',
    email: this.authService.usuarioLogado()?.email || '',
  };

  abaAtiva: AbaConfig = 'perfil';

  abas: Aba[] = [
    { id: 'perfil', label: 'Perfil', icone: 'perfil' },
    { id: 'notificacoes', label: 'Notificações', icone: 'notificacoes' },
    { id: 'seguranca', label: 'Segurança', icone: 'seguranca' },
  ];

  selecionarAba(aba: AbaConfig) {
    this.abaAtiva = aba;
  }
}
