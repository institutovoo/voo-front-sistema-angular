import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

interface AlunoMatriculado {
  id: number;
  nome: string;
  email: string;
  avatar: string;
  curso: string;
  progresso: number;
  dataMatricula: string;
  status: 'ativo' | 'concluido' | 'inativo';
}

@Component({
  selector: 'app-instrutor-alunos',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss'
})
export class InstrutorAlunosComponent implements OnInit {
  usuario = { nome: 'João Silva', avatar: '' };
  
  alunos = signal<AlunoMatriculado[]>([
    {
      id: 1,
      nome: 'Ana Oliveira',
      email: 'ana.oliveira@email.com',
      avatar: '',
      curso: 'Desenvolvimento Web Fullstack',
      progresso: 85,
      dataMatricula: '15 Jan 2026',
      status: 'ativo'
    },
    {
      id: 2,
      nome: 'Bruno Santos',
      email: 'bruno.santos@email.com',
      avatar: '',
      curso: 'React Avançado com TypeScript',
      progresso: 45,
      dataMatricula: '10 Jan 2026',
      status: 'ativo'
    },
    {
      id: 3,
      nome: 'Carla Lima',
      email: 'carla.lima@email.com',
      avatar: '',
      curso: 'Desenvolvimento Web Fullstack',
      progresso: 100,
      dataMatricula: '05 Dez 2025',
      status: 'concluido'
    },
    {
      id: 4,
      nome: 'Diego Ferreira',
      email: 'diego.f@email.com',
      avatar: '',
      curso: 'Node.js e MongoDB',
      progresso: 12,
      dataMatricula: '18 Jan 2026',
      status: 'ativo'
    }
  ]);

  ngOnInit() {}

  getStatusLabel(status: string): string {
    const labels: any = {
      ativo: 'Em andamento',
      concluido: 'Concluído',
      inativo: 'Inativo'
    };
    return labels[status] || status;
  }

  enviarRelatorioEmail() {
    // Simulação da chamada ao Lambda que gera o Excel e notifica por e-mail
    console.log('Iniciando geração de Excel via Lambda e envio de notificação...');
    alert('O relatório de alunos está sendo gerado e será enviado para o seu e-mail em instantes!');
  }
}
