import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPerfilComponent } from '../../../../components/sistema/configuracao/perfil/perfil.component';
import { ConfigNotificacaoComponent } from '../../../../components/sistema/configuracao/notificacao/notificacao.component';
import { ConfigPagamentoComponent } from '../../../../components/sistema/configuracao/pagamento/pagamento.component';
import { ConfigSegurancaComponent } from '../../../../components/sistema/configuracao/seguranca/seguranca.component';
import {
  SistemaHeaderComponent,
  Usuario,
} from '../../../../components/sistema/header/header.component';

type AbaConfig = 'perfil' | 'notificacoes' | 'pagamento' | 'seguranca';

interface Aba {
  id: AbaConfig;
  label: string;
  icone: string;
}

@Component({
  selector: 'app-configuracoes',
  standalone: true,
  imports: [
    CommonModule,
    SistemaHeaderComponent,
    ConfigPerfilComponent,
    ConfigNotificacaoComponent,
    ConfigPagamentoComponent,
    ConfigSegurancaComponent,
  ],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss',
})
export class ConfiguracoesComponent {
  sidebarAberta = true;

  usuario: Usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
  };

  abaAtiva: AbaConfig = 'perfil';

  abas: Aba[] = [
    { id: 'perfil', label: 'Perfil', icone: 'perfil' },
    { id: 'notificacoes', label: 'Notificações', icone: 'notificacoes' },
    { id: 'pagamento', label: 'Pagamento', icone: 'pagamento' },
    { id: 'seguranca', label: 'Segurança', icone: 'seguranca' },
  ];

  selecionarAba(aba: AbaConfig) {
    this.abaAtiva = aba;
  }

  onSidebarMudou(aberta: boolean) {
    this.sidebarAberta = aberta;
  }
}
