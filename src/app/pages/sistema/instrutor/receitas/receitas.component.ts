import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { CardKpiComponent, Estatistica } from '../../../../components/sistema/kpi-card/kpi-card.component';

interface Transacao {
  id: string;
  data: string;
  curso: string;
  aluno: string;
  valor: number;
  taxa: number;
  liquido: number;
  status: 'concluido' | 'pendente';
}

@Component({
  selector: 'app-instrutor-receitas',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent, CardKpiComponent],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class InstrutorReceitasComponent implements OnInit {
  usuario = { nome: 'João Silva', avatar: '' };
  
  estatisticas = signal<Estatistica[]>([
    { 
      label: 'Saldo Disponível', 
      valor: 'R$ 4.250,80', 
      icone: 'carteira', 
      cor: 'primary',
      tendencia: { valor: 12, tipo: 'up', periodo: 'este mês' }
    },
    { 
      label: 'Saldo Pendente', 
      valor: 'R$ 1.850,00', 
      icone: 'tempo', 
      cor: 'warning',
      tendencia: { valor: 5, tipo: 'down', periodo: 'este mês' }
    },
    { 
      label: 'Receita Total', 
      valor: 'R$ 25.400,00', 
      icone: 'moeda', 
      cor: 'success',
      tendencia: { valor: 15, tipo: 'up', periodo: 'este mês' }
    },
    { 
      label: 'Vendas (Jan)', 
      valor: '12', 
      icone: 'vendas', 
      cor: 'info',
      tendencia: { valor: 8, tipo: 'up', periodo: 'este mês' }
    }
  ]);

  transacoes = signal<Transacao[]>([
    {
      id: 'TRX-9842',
      data: '18 Jan 2026',
      curso: 'Desenvolvimento Web Fullstack',
      aluno: 'Ana Oliveira',
      valor: 497.00,
      taxa: 49.70,
      liquido: 447.30,
      status: 'concluido'
    },
    {
      id: 'TRX-9841',
      data: '17 Jan 2026',
      curso: 'React Avançado com TypeScript',
      aluno: 'Bruno Santos',
      valor: 297.00,
      taxa: 29.70,
      liquido: 267.30,
      status: 'concluido'
    },
    {
      id: 'TRX-9840',
      data: '15 Jan 2026',
      curso: 'Desenvolvimento Web Fullstack',
      aluno: 'Carla Lima',
      valor: 497.00,
      taxa: 49.70,
      liquido: 447.30,
      status: 'concluido'
    }
  ]);

  ngOnInit() {}

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  }

  enviarRelatorioFinanceiro() {
    // Simulação da chamada ao Lambda que gera o Excel financeiro e notifica por e-mail
    console.log('Iniciando geração de Excel Financeiro via Lambda e envio de notificação...');
    alert('Seu relatório financeiro detalhado está sendo gerado e será enviado para o seu e-mail em breve!');
  }
}
