import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { CardKpiComponent, Estatistica } from '../../../../components/sistema/kpi-card/kpi-card.component';

interface TransacaoGlobal {
  id: string;
  data: string;
  item: string;
  usuario: string;
  valor: number;
  plataforma: number;
  liquido: number;
  tipo: 'curso' | 'assinatura';
  status: 'concluido' | 'pendente' | 'estornado';
}

@Component({
  selector: 'app-adm-relatorios',
  standalone: true,
  imports: [CommonModule, SistemaLayoutComponent, HeaderIconeComponent, CardKpiComponent],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.scss'
})
export class AdmRelatoriosComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };

  estatisticas = signal<Estatistica[]>([
    { 
      label: 'Faturamento Total', 
      valor: 'R$ 142.500,00', 
      icone: 'moeda', 
      cor: 'success',
      tendencia: { valor: 12, tipo: 'up', periodo: 'este mês' }
    },
    { 
      label: 'Lucro Plataforma', 
      valor: 'R$ 42.750,00', 
      icone: 'carteira', 
      cor: 'primary',
      tendencia: { valor: 8, tipo: 'up', periodo: 'este mês' }
    },
    { 
      label: 'Novas Vendas', 
      valor: '856', 
      icone: 'vendas', 
      cor: 'info',
      tendencia: { valor: 15, tipo: 'up', periodo: 'este mês' }
    },
    { 
      label: 'Estornos', 
      valor: 'R$ 1.200,00', 
      icone: 'alerta', 
      cor: 'warning',
      tendencia: { valor: 2, tipo: 'down', periodo: 'este mês' }
    }
  ]);

  transacoes = signal<TransacaoGlobal[]>([
    { id: 'TX-9021', data: '18/01/2026', item: 'IA para Devs', usuario: 'João Silva', valor: 297.00, plataforma: 89.10, liquido: 207.90, tipo: 'curso', status: 'concluido' },
    { id: 'TX-9020', data: '18/01/2026', item: 'Plano Premium', usuario: 'Maria Oliveira', valor: 49.90, plataforma: 49.90, liquido: 0, tipo: 'assinatura', status: 'concluido' },
    { id: 'TX-9019', data: '17/01/2026', item: 'UX Design Master', usuario: 'Ricardo Santos', valor: 497.00, plataforma: 149.10, liquido: 347.90, tipo: 'curso', status: 'pendente' },
    { id: 'TX-9018', data: '17/01/2026', item: 'React Avançado', usuario: 'Ana Souza', valor: 397.00, plataforma: 119.10, liquido: 277.90, tipo: 'curso', status: 'estornado' }
  ]);

  ngOnInit() {}

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  }

  getStatusLabel(status: string): string {
    const labels: any = { concluido: 'Concluído', pendente: 'Pendente', estornado: 'Estornado' };
    return labels[status] || status;
  }
}
