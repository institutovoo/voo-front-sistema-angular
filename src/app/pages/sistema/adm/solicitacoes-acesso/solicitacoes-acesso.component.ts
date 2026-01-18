import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';

interface Solicitacao {
  id: number;
  nome: string;
  email: string;
  cargo: string;
  data: string;
  status: 'pendente' | 'aprovado' | 'rejeitado';
}

@Component({
  selector: 'app-adm-solicitacoes-acesso',
  standalone: true,
  imports: [CommonModule, HeaderIconeComponent, SistemaLayoutComponent],
  templateUrl: './solicitacoes-acesso.component.html',
  styleUrl: './solicitacoes-acesso.component.scss',
})
export class AdmSolicitacoesAcessoComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };
  solicitacoes: Solicitacao[] = [
    {
      id: 1,
      nome: 'Ricardo Oliveira',
      email: 'ricardo.oliveira@voocursos.com.br',
      cargo: 'Coordenador Pedagógico',
      data: '2026-01-18 10:30',
      status: 'pendente',
    },
    {
      id: 2,
      nome: 'Beatriz Santos',
      email: 'beatriz.santos@voocursos.com.br',
      cargo: 'Analista de Sistemas',
      data: '2026-01-18 09:15',
      status: 'pendente',
    },
    {
      id: 3,
      nome: 'Marcos Vinícius',
      email: 'marcos.v@voocursos.com.br',
      cargo: 'Diretor Comercial',
      data: '2026-01-17 16:45',
      status: 'pendente',
    },
  ];

  constructor() {}

  ngOnInit() {}

  aprovar(id: number) {
    const s = this.solicitacoes.find((x) => x.id === id);
    if (s) {
      s.status = 'aprovado';
      alert(`Acesso aprovado para ${s.nome}! O usuário receberá as credenciais por e-mail.`);
      this.remover(id);
    }
  }

  rejeitar(id: number) {
    const s = this.solicitacoes.find((x) => x.id === id);
    if (s) {
      if (confirm(`Tem certeza que deseja rejeitar a solicitação de ${s.nome}?`)) {
        s.status = 'rejeitado';
        this.remover(id);
      }
    }
  }

  remover(id: number) {
    setTimeout(() => {
      this.solicitacoes = this.solicitacoes.filter((x) => x.id !== id);
    }, 500);
  }
}
