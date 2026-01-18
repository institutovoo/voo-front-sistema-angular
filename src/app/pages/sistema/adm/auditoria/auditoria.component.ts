import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

interface LogAuditoria {
  id: string;
  data: string;
  usuario: string;
  acao: string;
  modulo: string;
  status: 'sucesso' | 'falha' | 'critico';
}

@Component({
  selector: 'app-adm-auditoria',
  standalone: true,
  imports: [CommonModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss'
})
export class AdmAuditoriaComponent implements OnInit {
  usuario = { nome: 'Administrador', avatar: '' };

  logs = signal<LogAuditoria[]>([
    { id: 'LOG-882', data: '18/01/2026 14:35', usuario: 'João Silva (Admin)', acao: 'Alterou comissão do instrutor', modulo: 'Financeiro', status: 'sucesso' },
    { id: 'LOG-881', data: '18/01/2026 13:20', usuario: 'Sistema', acao: 'Backup automático concluído', modulo: 'Banco de Dados', status: 'sucesso' },
    { id: 'LOG-880', data: '18/01/2026 11:10', usuario: 'Desconhecido', acao: 'Tentativa de login falhou', modulo: 'Autenticação', status: 'critico' },
    { id: 'LOG-879', data: '18/01/2026 09:45', usuario: 'Admin', acao: 'Bloqueou curso "Hacking Ético"', modulo: 'Cursos', status: 'sucesso' }
  ]);

  ngOnInit() {}

  getStatusLabel(status: string): string {
    const labels: any = { sucesso: 'Sucesso', falha: 'Falha', critico: 'Crítico' };
    return labels[status] || status;
  }
}
