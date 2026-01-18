import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { ConfigPerfilComponent } from '../../../../components/sistema/configuracao/perfil/perfil.component';
import { ConfigSegurancaComponent } from '../../../../components/sistema/configuracao/seguranca/seguranca.component';
import { AutenticacaoService } from '../../../../core/service/autenticacao.service';

@Component({
  selector: 'app-adm-configuracoes',
  standalone: true,
  imports: [CommonModule, SistemaLayoutComponent, HeaderIconeComponent, ConfigPerfilComponent, ConfigSegurancaComponent],
  templateUrl: './configuracoes.component.html',
  styleUrl: './configuracoes.component.scss'
})
export class AdmConfiguracoesComponent implements OnInit {
  private authService = inject(AutenticacaoService);

  usuario = { 
    nome: this.authService.usuarioLogado()?.nome_completo || 'Administrador', 
    email: this.authService.usuarioLogado()?.email || '',
    avatar: '' 
  };
  abaAtiva = 'perfil';

  ngOnInit() {}

  setAba(aba: string) {
    this.abaAtiva = aba;
  }
}
