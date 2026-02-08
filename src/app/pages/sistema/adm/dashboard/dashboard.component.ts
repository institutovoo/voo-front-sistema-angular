import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import {
  CardKpiComponent,
  Estatistica,
} from '../../../../components/sistema/kpi-card/kpi-card.component';

@Component({
  selector: 'app-adm-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    CardKpiComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class AdmDashboardComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };

  constructor(private router: Router) {}

  estatisticas = signal<Estatistica[]>([
    {
      label: 'Total de usuários',
      valor: '15.420',
      icone: 'usuarios',
      cor: 'primary',
      tendencia: { valor: 8, tipo: 'up', periodo: 'este mês' },
    },
    {
      label: 'Instrutores ativos',
      valor: '124',
      icone: 'usuarios',
      cor: 'success',
      tendencia: { valor: 2, tipo: 'up', periodo: 'este mês' },
    },
    {
      label: 'Cursos no ar',
      valor: '456',
      icone: 'cursos',
      cor: 'info',
      tendencia: { valor: 5, tipo: 'up', periodo: 'este mês' },
    },
    {
      label: 'Receita bruta',
      valor: 'R$ 142.500',
      icone: 'moeda',
      cor: 'success',
      tendencia: { valor: 12, tipo: 'up', periodo: 'este mês' },
    },
  ]);

  acoesRapidas = [
    {
      titulo: 'Aprovações de acesso',
      desc: 'Gerenciar novos pedidos de admin',
      rota: '/admin/solicitacoes',
      icone: 'verificar',
      cor: 'success',
      badge: '3',
    },
    {
      titulo: 'Gestão de usuários',
      desc: 'Aprovar, bloquear ou editar usuários',
      rota: '/admin/usuarios',
      icone: 'usuarios',
      cor: 'primary',
    },
    {
      titulo: 'Gestão de cursos',
      desc: 'Revisar e publicar novos cursos',
      rota: '/admin/cursos',
      icone: 'cursos',
      cor: 'info',
    },
    {
      titulo: 'Instrutores',
      desc: 'Gerenciar parceiros e comissões',
      rota: '/admin/instrutores',
      icone: 'usuarios',
      cor: 'success',
    },
    {
      titulo: 'Configurações',
      desc: 'Ajustes globais do sistema',
      rota: '/admin/configuracoes',
      icone: 'config',
      cor: 'warning',
    },
  ];

  atividadesRecentes = [
    {
      id: 1,
      texto: 'Novo instrutor "Marcos Silva" solicitou cadastro',
      tempo: 'há 10 min',
      status: 'pendente',
    },
    {
      id: 2,
      texto: 'Curso "IA para Devs" foi publicado com sucesso',
      tempo: 'há 2 horas',
      status: 'concluido',
    },
    {
      id: 3,
      texto: 'Tentativa de login suspeita bloqueada',
      tempo: 'há 5 horas',
      status: 'alerta',
    },
  ];

  ngOnInit() {}

  verDetalhesLog(log: any) {
    // Navegação baseada no tipo de atividade
    if (log.texto.includes('instrutor')) {
      this.router.navigate(['/admin/solicitacoes']);
    } else if (log.texto.includes('Curso')) {
      this.router.navigate(['/admin/cursos']);
    } else if (log.texto.includes('login')) {
      this.router.navigate(['/admin/auditoria']);
    } else {
      this.router.navigate(['/admin/auditoria']);
    }
  }

  abrirRelatorioGlobal() {
    this.router.navigate(['/admin/relatorios']);
  }
}
