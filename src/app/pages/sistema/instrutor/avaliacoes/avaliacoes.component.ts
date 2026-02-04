import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';

import { FormsModule } from '@angular/forms';

interface Avaliacao {
  id: number;
  aluno: string;
  avatar: string;
  curso: string;
  nota: number;
  comentario: string;
  data: string;
  resposta?: string;
}

@Component({
  selector: 'app-avaliacoes',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent, FormsModule],
  templateUrl: './avaliacoes.component.html',
  styleUrl: './avaliacoes.component.scss',
})
export class AvaliacoesComponent implements OnInit {
  avaliacoes: Avaliacao[] = [];
  notaMedia = 4.8;
  totalAvaliacoes = 156;
  respondendoId: number | null = null;
  textoResposta = '';

  ngOnInit() {
    this.carregarAvaliacoes();
  }

  carregarAvaliacoes() {
    this.avaliacoes = [
      {
        id: 1,
        aluno: 'Marcos Silva',
        avatar: '',
        curso: 'React Avançado',
        nota: 5,
        comentario:
          'Curso excelente! O conteúdo é muito bem explicado e os projetos práticos ajudam muito.',
        data: '2h atrás',
      },
      {
        id: 2,
        aluno: 'Julia Costa',
        avatar: '',
        curso: 'Fullstack Web',
        nota: 4,
        comentario: 'Gostei muito, mas senti falta de mais exemplos sobre autenticação.',
        data: 'Ontem',
        resposta:
          'Olá Julia! Obrigado pelo feedback. Vamos adicionar uma aula extra sobre isso em breve!',
      },
    ];
  }

  abrirResposta(id: number) {
    this.respondendoId = id;
    this.textoResposta = '';
  }

  cancelarResposta() {
    this.respondendoId = null;
    this.textoResposta = '';
  }

  enviarResposta(id: number) {
    const avaliacao = this.avaliacoes.find((a) => a.id === id);
    if (avaliacao && this.textoResposta.trim()) {
      avaliacao.resposta = this.textoResposta;
      this.respondendoId = null;
      this.textoResposta = '';
      // TODO: Enviar resposta para API
    }
  }

  getStars(nota: number): number[] {
    return Array(nota).fill(0);
  }
}
