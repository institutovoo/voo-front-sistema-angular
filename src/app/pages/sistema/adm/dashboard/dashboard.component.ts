import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { CardKpiComponent, Estatistica } from '../../../../components/sistema/kpi-card/kpi-card.component';

@Component({
  selector: 'app-adm-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent, CardKpiComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class AdmDashboardComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };

  estatisticas = signal<Estatistica[]>([
    { label: 'Total de Usuários', valor: '15.420', icone: 'usuarios', cor: 'primary', tendencia: { valor: 8, tipo: 'up', periodo: 'este mês' } },
    { label: 'Instrutores Ativos', valor: '124', icone: 'usuarios', cor: 'success', tendencia: { valor: 2, tipo: 'up', periodo: 'este mês' } },
    { label: 'Cursos no Ar', valor: '456', icone: 'cursos', cor: 'info', tendencia: { valor: 5, tipo: 'up', periodo: 'este mês' } },
    { label: 'Receita Bruta', valor: 'R$ 142.500', icone: 'moeda', cor: 'success', tendencia: { valor: 12, tipo: 'up', periodo: 'este mês' } }
  ]);

  acoesRapidas = [
    { titulo: 'Gestão de Usuários', desc: 'Aprovar, bloquear ou editar usuários', rota: '/admin/usuarios', icone: 'usuarios', cor: 'primary' },
    { titulo: 'Gestão de Cursos', desc: 'Revisar e publicar novos cursos', rota: '/admin/cursos', icone: 'cursos', cor: 'info' },
    { titulo: 'Instrutores', desc: 'Gerenciar parceiros e comissões', rota: '/admin/instrutores', icone: 'usuarios', cor: 'success' },
    { titulo: 'Configurações', desc: 'Ajustes globais do sistema', rota: '/admin/configuracoes', icone: 'config', cor: 'warning' }
  ];

  atividadesRecentes = [
    { id: 1, texto: 'Novo instrutor "Marcos Silva" solicitou cadastro', tempo: 'há 10 min', status: 'pendente' },
    { id: 2, texto: 'Curso "IA para Devs" foi publicado com sucesso', tempo: 'há 2 horas', status: 'concluido' },
    { id: 3, texto: 'Tentativa de login suspeita bloqueada', tempo: 'há 5 horas', status: 'alerta' }
  ];

  ngOnInit() {}
}
