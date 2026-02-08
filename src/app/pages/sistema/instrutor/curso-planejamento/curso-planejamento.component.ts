import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { AlertaService } from '../../../../core/service/alerta.service';
import { ConfirmService } from '../../../../core/service/confirm.service';

type StatusCurso = 'rascunho' | 'em_analise' | 'aprovado' | 'rejeitado';

interface EtapaCurso {
  id: string;
  titulo: string;
  itens: ItemEtapa[];
}

interface ItemEtapa {
  id: string;
  titulo: string;
  opcional?: boolean;
  concluido: boolean;
  rota?: string;
}

@Component({
  selector: 'app-curso-planejamento',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './curso-planejamento.component.html',
  styleUrl: './curso-planejamento.component.scss',
})
export class CursoPlanejamentoComponent implements OnInit {
  cursoId: string | null = null;
  statusCurso: StatusCurso = 'rascunho';
  motivoRejeicao: string = '';

  etapas: EtapaCurso[] = [
    {
      id: 'planejamento',
      titulo: 'Planeje seu curso',
      itens: [
        {
          id: 'alunos',
          titulo: 'Alunos pretendidos',
          concluido: false,
          rota: '/instrutor/cursos/editar',
        },
        {
          id: 'estrutura',
          titulo: 'Estrutura do curso',
          concluido: false,
          rota: '/instrutor/cursos/:id/estrutura',
        },
        {
          id: 'video-teste',
          titulo: 'Configuração e vídeo de teste',
          concluido: false,
          rota: '/instrutor/cursos/editar',
        },
      ],
    },
    {
      id: 'conteudo',
      titulo: 'Crie seu conteúdo',
      itens: [
        {
          id: 'filmagem',
          titulo: 'Filmagem e edição',
          concluido: false,
          rota: '/instrutor/cursos/:id/estrutura',
        },
        {
          id: 'grade',
          titulo: 'Grade curricular',
          concluido: false,
          rota: '/instrutor/cursos/:id/estrutura',
        },
        {
          id: 'legendas',
          titulo: 'Legendas',
          opcional: true,
          concluido: false,
        },
        {
          id: 'acessibilidade',
          titulo: 'Acessibilidade',
          opcional: true,
          concluido: false,
        },
      ],
    },
    {
      id: 'publicacao',
      titulo: 'Publique seu curso',
      itens: [
        {
          id: 'pagina-inicial',
          titulo: 'Página inicial do curso',
          concluido: false,
          rota: '/instrutor/cursos/editar',
        },
        {
          id: 'preco',
          titulo: 'Preço',
          concluido: false,
          rota: '/instrutor/cursos/editar',
        },
        {
          id: 'promocoes',
          titulo: 'Promoções',
          concluido: false,
          rota: '/instrutor/cursos/editar',
        },
        {
          id: 'mensagens',
          titulo: 'Mensagens do curso',
          concluido: false,
        },
      ],
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertaService: AlertaService,
    private confirmService: ConfirmService,
  ) {}

  ngOnInit() {
    this.cursoId = this.route.snapshot.paramMap.get('id');
    this.carregarStatusCurso();
  }

  carregarStatusCurso() {
    // Simula carregamento do status do curso
    // Em produção, viria de uma API
    const cursoMock = {
      status: 'rascunho' as StatusCurso,
      etapas: {
        alunos: true,
        estrutura: false,
        'video-teste': false,
        filmagem: false,
        grade: false,
        legendas: false,
        acessibilidade: false,
        'pagina-inicial': true,
        preco: true,
        promocoes: true,
        mensagens: false,
      },
      motivoRejeicao: '',
    };

    this.statusCurso = cursoMock.status;
    this.motivoRejeicao = cursoMock.motivoRejeicao;

    // Atualiza status de conclusão dos itens
    this.etapas.forEach((etapa) => {
      etapa.itens.forEach((item) => {
        item.concluido = cursoMock.etapas[item.id as keyof typeof cursoMock.etapas] || false;
      });
    });
  }

  navegarPara(item: ItemEtapa) {
    if (!item.rota) return;

    // Se está bloqueado (conteúdo) e curso não aprovado
    if (this.isEtapaConteudoBloqueada() && item.rota.includes('estrutura')) {
      this.alertaService.aviso(
        'Você precisa enviar o planejamento para análise e aguardar aprovação antes de adicionar conteúdo.',
      );
      return;
    }

    const rota = item.rota.replace(':id', this.cursoId || '');
    this.router.navigate([rota]);
  }

  toggleItemConcluido(item: ItemEtapa) {
    item.concluido = !item.concluido;
  }

  getProgressoEtapa(etapa: EtapaCurso): number {
    const total = etapa.itens.length;
    const concluidos = etapa.itens.filter((i) => i.concluido).length;
    return Math.round((concluidos / total) * 100);
  }

  getProgressoGeral(): number {
    const totalItens = this.etapas.reduce((acc, etapa) => acc + etapa.itens.length, 0);
    const itensConcluidos = this.etapas.reduce(
      (acc, etapa) => acc + etapa.itens.filter((i) => i.concluido).length,
      0,
    );
    return Math.round((itensConcluidos / totalItens) * 100);
  }

  isPlanejamentoConcluido(): boolean {
    const etapaPlanejamento = this.etapas.find((e) => e.id === 'planejamento');
    if (!etapaPlanejamento) return false;
    return etapaPlanejamento.itens.every((item) => item.concluido);
  }

  isEtapaConteudoBloqueada(): boolean {
    return this.statusCurso !== 'aprovado';
  }

  podeEnviarParaAnalise(): boolean {
    return (
      this.isPlanejamentoConcluido() &&
      (this.statusCurso === 'rascunho' || this.statusCurso === 'rejeitado')
    );
  }

  async enviarParaAnalise() {
    if (!this.podeEnviarParaAnalise()) {
      this.alertaService.aviso('Complete todas as etapas de planejamento antes de enviar para análise.');
      return;
    }

    const confirmado = await this.confirmService.confirmar(
      'Enviar para análise',
      'Deseja enviar este curso para análise? Você não poderá editá-lo até receber o feedback.'
    );

    if (confirmado) {
      // Aqui faria a chamada para API
      this.statusCurso = 'em_analise';
      this.alertaService.sucesso('Curso enviado para análise! Você receberá uma notificação quando for aprovado.');
    }
  }

  getStatusLabel(): string {
    const labels = {
      rascunho: 'Rascunho',
      em_analise: 'Em análise',
      aprovado: 'Aprovado',
      rejeitado: 'Rejeitado',
    };
    return labels[this.statusCurso];
  }

  getStatusClass(): string {
    return `status-${this.statusCurso}`;
  }
}
