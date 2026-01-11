import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CanalNotificacao {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  ativo: boolean;
}

interface TipoNotificacao {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
}

@Component({
  selector: 'app-config-notificacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notificacao.component.html',
  styleUrl: './notificacao.component.scss',
})
export class ConfigNotificacaoComponent {
  canais: CanalNotificacao[] = [
    {
      id: 'email',
      nome: 'Email',
      descricao: 'Receba notificações por email',
      icone: 'email',
      ativo: true,
    },
    {
      id: 'push',
      nome: 'Push',
      descricao: 'Notificações no navegador',
      icone: 'push',
      ativo: true,
    },
    {
      id: 'sms',
      nome: 'SMS',
      descricao: 'Receba SMS para atualizações importantes',
      icone: 'sms',
      ativo: false,
    },
  ];

  tipos: TipoNotificacao[] = [
    {
      id: 'atualizacoes',
      nome: 'Atualizações de Cursos',
      descricao: 'Novos conteúdos em cursos matriculados',
      ativo: true,
    },
    {
      id: 'novos-cursos',
      nome: 'Novos Cursos',
      descricao: 'Lançamentos de novos cursos',
      ativo: true,
    },
    {
      id: 'promocoes',
      nome: 'Promoções',
      descricao: 'Ofertas e descontos especiais',
      ativo: false,
    },
    {
      id: 'resumo',
      nome: 'Resumo Semanal',
      descricao: 'Resumo do seu progresso toda semana',
      ativo: true,
    },
  ];

  salvando = false;

  toggleCanal(canal: CanalNotificacao) {
    canal.ativo = !canal.ativo;
  }

  toggleTipo(tipo: TipoNotificacao) {
    tipo.ativo = !tipo.ativo;
  }

  salvar() {
    this.salvando = true;
    console.log('Salvando notificações:', { canais: this.canais, tipos: this.tipos });

    setTimeout(() => {
      this.salvando = false;
      alert('Preferências de notificação salvas!');
    }, 1000);
  }
}
