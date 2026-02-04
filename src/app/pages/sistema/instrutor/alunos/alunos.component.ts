import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { AlertaService } from '../../../../core/service/alerta.service';

interface AlunoMatriculado {
  id: number;
  nome: string;
  email: string;
  avatar: string;
  curso: string;
  progresso: number;
  dataMatricula: string;
  status: 'ativo' | 'concluido' | 'inativo';
  ultimoAcesso: string;
  notaMedia: number;
  certificadoEmitido: boolean;
}

@Component({
  selector: 'app-instrutor-alunos',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './alunos.component.html',
  styleUrl: './alunos.component.scss',
})
export class InstrutorAlunosComponent implements OnInit {
  private alertaService = inject(AlertaService);
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
      status: 'ativo',
      ultimoAcesso: '2h atrás',
      notaMedia: 9.2,
      certificadoEmitido: false,
    },
    {
      id: 2,
      nome: 'Bruno Santos',
      email: 'bruno.santos@email.com',
      avatar: '',
      curso: 'React Avançado com TypeScript',
      progresso: 45,
      dataMatricula: '10 Jan 2026',
      status: 'ativo',
      ultimoAcesso: 'Ontem',
      notaMedia: 8.5,
      certificadoEmitido: false,
    },
    {
      id: 3,
      nome: 'Carla Lima',
      email: 'carla.lima@email.com',
      avatar: '',
      curso: 'Desenvolvimento Web Fullstack',
      progresso: 100,
      dataMatricula: '05 Dez 2025',
      status: 'concluido',
      ultimoAcesso: '1 semana atrás',
      notaMedia: 9.8,
      certificadoEmitido: true,
    },
    {
      id: 4,
      nome: 'Diego Ferreira',
      email: 'diego.f@email.com',
      avatar: '',
      curso: 'Node.js e MongoDB',
      progresso: 12,
      dataMatricula: '18 Jan 2026',
      status: 'ativo',
      ultimoAcesso: 'Hoje',
      notaMedia: 7.0,
      certificadoEmitido: false,
    },
  ]);

  ngOnInit() {}

  getStatusLabel(status: string): string {
    const labels: any = {
      ativo: 'Em andamento',
      concluido: 'Concluído',
      inativo: 'Inativo',
    };
    return labels[status] || status;
  }

  resetarProgresso(aluno: AlunoMatriculado) {
    this.alertaService.sucesso(
      `O progresso de ${aluno.nome} foi resetado com sucesso!`,
      'Progresso Resetado',
    );
  }

  removerAluno(aluno: AlunoMatriculado) {
    this.alertaService.info(`O aluno ${aluno.nome} foi removido do curso.`, 'Aluno Removido');
  }

  enviarRelatorioEmail() {
    // Geração do Excel via Lambda e notificação por e-mail
    this.alertaService.info(
      'O relatório de alunos está sendo gerado e será enviado para o seu e-mail em instantes!',
      'Relatório em Processamento',
    );
  }
}
