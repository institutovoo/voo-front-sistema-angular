import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { SistemaHeaderComponent, Usuario } from '../../../../components/sistema/header/header.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import {
  CertificadoCardComponent,
  Certificado,
} from '../../../../components/sistema/certificado-card/certificado-card.component';
import {
  CardKpiComponent,
  Estatistica,
} from '../../../../components/sistema/kpi-card/kpi-card.component';
import {
  FiltrosBarraComponent,
  FiltroTab,
  OpcaoOrdenacao,
} from '../../../../components/sistema/filtros-barra/filtros-barra.component';
import { CertificadoApi } from '../../../../core/api/certificado-api.service';
import { AutenticacaoService } from '../../../../core/service/autenticacao.service';
import { AlertaService } from '../../../../core/service/alerta.service';

@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SistemaLayoutComponent,
    HeaderIconeComponent,
    CertificadoCardComponent,
    CardKpiComponent,
    FiltrosBarraComponent,
  ],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.scss',
})
export class CertificadosComponent {
  private certificadoApi = inject(CertificadoApi);
  private authService = inject(AutenticacaoService);
  private alertaService = inject(AlertaService);

  get usuarioExibicao(): Usuario {
    const user = this.authService.usuarioLogado();
    return {
      nome: user?.nome_completo || 'Usuário',
      email: user?.email,
      avatar: '',
    };
  }

  // Filtros
  termoBusca = '';
  categoriaFiltro = 'todas';
  ordenacao = 'recentes';
  visualizacao: 'grid' | 'lista' = 'grid';

  // Métricas
  metricas: Estatistica[] = [
    {
      icone: 'certificados',
      valor: 1,
      label: 'Certificado',
      cor: 'primary',
      tendencia: { valor: 0, tipo: 'up' },
    },
    {
      icone: 'relogio',
      valor: '24h',
      label: 'Horas de estudo',
      cor: 'success',
      tendencia: { valor: 0, tipo: 'up' },
    },
    {
      icone: 'cursos',
      valor: 1,
      label: 'Curso concluído',
      cor: 'warning',
    },
    {
      icone: 'trophy',
      valor: '5.0',
      label: 'Nota média',
      cor: 'info',
    },
  ];

  // Categorias (tabs)
  categorias: FiltroTab[] = [
    { id: 'todas', nome: 'Todas', quantidade: 1 },
    { id: 'desenvolvimento', nome: 'Desenvolvimento', cor: '#3b82f6', quantidade: 1 },
  ];

  // Opções de ordenação
  opcoesOrdenacao: OpcaoOrdenacao[] = [
    { valor: 'recentes', label: 'Mais recentes' },
    { valor: 'nome', label: 'Nome A-Z' },
  ];

  // Certificados
  certificados: Certificado[] = [
    {
      id: 1,
      titulo: 'Angular avançado: arquitetura e performance',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Carlos Mendes',
      dataConclusao: new Date('2025-12-15'),
      cargaHoraria: 24,
      codigoValidacao: 'CERT-ANG-2025-001',
      imagemCurso: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      nota: 5.0,
    },
  ];

  get certificadosFiltrados(): Certificado[] {
    let resultado = [...this.certificados];

    // Filtro por busca
    if (this.termoBusca) {
      const termo = this.termoBusca.toLowerCase();
      resultado = resultado.filter(
        (cert) =>
          cert.titulo.toLowerCase().includes(termo) ||
          cert.instrutor.toLowerCase().includes(termo) ||
          cert.codigoValidacao.toLowerCase().includes(termo)
      );
    }

    // Filtro por categoria
    if (this.categoriaFiltro !== 'todas') {
      resultado = resultado.filter((cert) => cert.categoria.toLowerCase() === this.categoriaFiltro);
    }

    return resultado;
  }

  onVisualizarCertificado(certificado: Certificado) {
    this.onBaixarCertificado(certificado);
  }

  onBaixarCertificado(certificado: Certificado) {
    const usuario = this.authService.usuarioLogado();
    if (!usuario) {
      this.alertaService.erro('Usuário não autenticado');
      return;
    }

    this.alertaService.info('Gerando seu certificado, por favor aguarde...', 'Processando');

    const dados = {
      nomeCompleto: usuario.nome_completo,
      nomeCurso: certificado.titulo,
      cargaHoraria: certificado.cargaHoraria,
      dataConclusao: certificado.dataConclusao.toLocaleDateString('pt-BR'),
    };

    this.certificadoApi.gerarCertificado(dados).subscribe({
      next: (res: any) => {
        // A API retorna o PDF como stream ou base64
        // No handler do Lambda está retornando base64 se não for configurado como binário no GTW
        // Mas o handler mostra Content-Type: application/pdf
        
        try {
          // Se vier como base64 string
          const byteCharacters = atob(res);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `Certificado - ${certificado.titulo}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
          this.alertaService.sucesso('Certificado gerado com sucesso!');
        } catch (e) {
          console.error('Erro ao processar PDF:', e);
          this.alertaService.erro('Erro ao processar o arquivo do certificado.');
        }
      },
      error: (err) => {
        console.error('Erro ao gerar certificado:', err);
        this.alertaService.erro('Não foi possível gerar o certificado no momento.');
      }
    });
  }

  onCompartilharCertificado(certificado: Certificado) {
    console.log('Compartilhar certificado:', certificado);
    // Implementar compartilhamento
  }

  setVisualizacao(tipo: 'grid' | 'lista') {
    this.visualizacao = tipo;
  }

  onTabChange(tabId: string) {
    this.categoriaFiltro = tabId;
  }

  onBuscaChange(termo: string) {
    this.termoBusca = termo;
  }

  onOrdenacaoChange(ordem: string) {
    this.ordenacao = ordem;
  }

  limparFiltros() {
    this.termoBusca = '';
    this.categoriaFiltro = 'todas';
    this.ordenacao = 'recentes';
  }

  get temFiltrosAtivos(): boolean {
    return (
      this.termoBusca !== '' || this.categoriaFiltro !== 'todas' || this.ordenacao !== 'recentes'
    );
  }
}
