import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { ConfigPerfilComponent } from '../../../../components/sistema/configuracao/perfil/perfil.component';
import { ConfigSegurancaComponent } from '../../../../components/sistema/configuracao/seguranca/seguranca.component';

@Component({
  selector: 'app-adm-configuracoes',
  standalone: true,
  imports: [CommonModule, SistemaLayoutComponent, HeaderIconeComponent, ConfigPerfilComponent, ConfigSegurancaComponent],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class AdmConfiguracoesComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };
  abaAtiva = 'perfil';

  ngOnInit() {}

  setAba(aba: string) {
    this.abaAtiva = aba;
  }
}
