import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../../../components/sistema/header/header.component';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
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
  usuario: Usuario = {
    nome: 'João Silva',
    email: 'joao@email.com',
  };

  // Filtros
  termoBusca = '';
  categoriaFiltro = 'todas';
  ordenacao = 'recentes';
  visualizacao: 'grid' | 'lista' = 'grid';

  // Métricas
  metricas: Estatistica[] = [
    {
      icone: 'certificados',
      valor: 12,
      label: 'Certificados',
      cor: 'primary',
      tendencia: { valor: 2, tipo: 'up' },
    },
    {
      icone: 'relogio',
      valor: '148h',
      label: 'Horas de estudo',
      cor: 'success',
      tendencia: { valor: 24, tipo: 'up' },
    },
    {
      icone: 'cursos',
      valor: 12,
      label: 'Cursos concluídos',
      cor: 'warning',
    },
    {
      icone: 'trophy',
      valor: '4.8',
      label: 'Nota média',
      cor: 'info',
    },
  ];

  // Categorias (tabs)
  categorias: FiltroTab[] = [
    { id: 'todas', nome: 'Todas', quantidade: 12 },
    { id: 'desenvolvimento', nome: 'Desenvolvimento', cor: '#3b82f6', quantidade: 5 },
    { id: 'design', nome: 'Design', cor: '#ec4899', quantidade: 3 },
    { id: 'marketing', nome: 'Marketing', cor: '#f59e0b', quantidade: 2 },
    { id: 'negocios', nome: 'Negócios', cor: '#22c55e', quantidade: 2 },
  ];

  // Opções de ordenação
  opcoesOrdenacao: OpcaoOrdenacao[] = [
    { valor: 'recentes', label: 'Mais recentes' },
    { valor: 'antigos', label: 'Mais antigos' },
    { valor: 'nome', label: 'Nome A-Z' },
    { valor: 'nota', label: 'Maior nota' },
  ];

  // Certificados
  certificados: Certificado[] = [
    {
      id: 1,
      titulo: 'Angular Avançado: Arquitetura e Performance',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Carlos Mendes',
      dataConclusao: new Date('2025-12-15'),
      cargaHoraria: 24,
      codigoValidacao: 'CERT-ANG-2025-001',
      imagemCurso: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
      nota: 4.9,
    },
    {
      id: 2,
      titulo: 'UI/UX Design: Do Básico ao Avançado',
      categoria: 'Design',
      categoriaColor: '#ec4899',
      instrutor: 'Ana Paula Silva',
      dataConclusao: new Date('2025-11-28'),
      cargaHoraria: 32,
      codigoValidacao: 'CERT-UX-2025-002',
      imagemCurso: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      nota: 5.0,
    },
    {
      id: 3,
      titulo: 'Marketing Digital e Growth Hacking',
      categoria: 'Marketing',
      categoriaColor: '#f59e0b',
      instrutor: 'Roberto Campos',
      dataConclusao: new Date('2025-10-20'),
      cargaHoraria: 18,
      codigoValidacao: 'CERT-MKT-2025-003',
      imagemCurso: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
      nota: 4.7,
    },
    {
      id: 4,
      titulo: 'Node.js com TypeScript e Clean Architecture',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Pedro Santos',
      dataConclusao: new Date('2025-09-15'),
      cargaHoraria: 28,
      codigoValidacao: 'CERT-NODE-2025-004',
      imagemCurso: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400',
      nota: 4.8,
    },
    {
      id: 5,
      titulo: 'Gestão de Projetos Ágeis com Scrum',
      categoria: 'Negócios',
      categoriaColor: '#22c55e',
      instrutor: 'Mariana Costa',
      dataConclusao: new Date('2025-08-10'),
      cargaHoraria: 16,
      codigoValidacao: 'CERT-SCRUM-2025-005',
      imagemCurso: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      nota: 4.6,
    },
    {
      id: 6,
      titulo: 'React e Next.js na Prática',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Lucas Ferreira',
      dataConclusao: new Date('2025-07-22'),
      cargaHoraria: 30,
      codigoValidacao: 'CERT-REACT-2025-006',
      imagemCurso: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400',
      nota: 4.9,
    },
    {
      id: 7,
      titulo: 'Design System com Figma',
      categoria: 'Design',
      categoriaColor: '#ec4899',
      instrutor: 'Juliana Martins',
      dataConclusao: new Date('2025-06-18'),
      cargaHoraria: 20,
      codigoValidacao: 'CERT-FIGMA-2025-007',
      imagemCurso: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400',
      nota: 4.8,
    },
    {
      id: 8,
      titulo: 'Python para Data Science',
      categoria: 'Desenvolvimento',
      categoriaColor: '#3b82f6',
      instrutor: 'Ricardo Almeida',
      dataConclusao: new Date('2025-05-30'),
      cargaHoraria: 36,
      codigoValidacao: 'CERT-PYTHON-2025-008',
      imagemCurso: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400',
      nota: 4.7,
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

    // Ordenação
    switch (this.ordenacao) {
      case 'recentes':
        resultado.sort(
          (a, b) => new Date(b.dataConclusao).getTime() - new Date(a.dataConclusao).getTime()
        );
        break;
      case 'antigos':
        resultado.sort(
          (a, b) => new Date(a.dataConclusao).getTime() - new Date(b.dataConclusao).getTime()
        );
        break;
      case 'nome':
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'nota':
        resultado.sort((a, b) => (b.nota || 0) - (a.nota || 0));
        break;
    }

    return resultado;
  }

  onVisualizarCertificado(certificado: Certificado) {
    console.log('Visualizar certificado:', certificado);
    // Implementar modal ou navegação para visualização
  }

  onBaixarCertificado(certificado: Certificado) {
    console.log('Baixar certificado:', certificado);
    // Implementar download do PDF
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
