import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPerfilComponent } from '../../../../components/sistema/configuracao/perfil/perfil.component';
import { ConfigPagamentoComponent } from '../../../../components/sistema/configuracao/pagamento/pagamento.component';
import { ConfigSegurancaComponent } from '../../../../components/sistema/configuracao/seguranca/seguranca.component';
import { Usuario } from '../../../../components/sistema/header/header.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';

type AbaConfig = 'perfil' | 'pagamento' | 'seguranca';

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
    SistemaLayoutComponent,
    ConfigPerfilComponent,
    ConfigPagamentoComponent,
    ConfigSegurancaComponent,
  ],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss',
})
export class ConfiguracoesComponent {
  usuario: Usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
  };

  abaAtiva: AbaConfig = 'perfil';

  abas: Aba[] = [
    { id: 'perfil', label: 'Perfil', icone: 'perfil' },
    { id: 'seguranca', label: 'Segurança', icone: 'seguranca' },
  ];

  selecionarAba(aba: AbaConfig) {
    this.abaAtiva = aba;
  }
}
