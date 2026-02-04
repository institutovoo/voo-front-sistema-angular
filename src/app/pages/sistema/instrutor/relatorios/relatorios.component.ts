import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [CommonModule, RouterModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.scss',
})
export class RelatoriosComponent implements OnInit {
  metricas = [
    { label: 'Taxa de Conclusão', valor: '68%', icone: 'check-circle', cor: 'success' },
    { label: 'Tempo Médio no Curso', valor: '12.5h', icone: 'relogio', cor: 'primary' },
    { label: 'Média em Quizzes', valor: '8.4', icone: 'certificados', cor: 'warning' },
    { label: 'Novas Matrículas (Mês)', valor: '+124', icone: 'usuarios', cor: 'info' },
  ];

  aulasMaisAssistidas = [
    { titulo: '01. Introdução ao React', visualizacoes: 1245, conclusao: '95%' },
    { titulo: '05. Hooks na Prática', visualizacoes: 1050, conclusao: '82%' },
    { titulo: '12. Context API', visualizacoes: 890, conclusao: '78%' },
  ];

  ngOnInit() {}

  exportarExcel() {
    const dados = this.aulasMaisAssistidas.map((aula) => ({
      Aula: aula.titulo,
      Visualizações: aula.visualizacoes,
      'Taxa de Conclusão': aula.conclusao,
    }));

    const ws = XLSX.utils.json_to_sheet(dados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Relatório');
    XLSX.writeFile(wb, 'relatorio_desempenho.xlsx');
  }

  exportarPDF() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Relatório de Desempenho - Cursos', 14, 20);

    doc.setFontSize(12);
    doc.text(`Gerado em: ${new Date().toLocaleDateString()}`, 14, 30);

    const head = [['Aula', 'Visualizações', 'Taxa de Conclusão']];
    const data = this.aulasMaisAssistidas.map((aula) => [
      aula.titulo,
      aula.visualizacoes.toString(),
      aula.conclusao,
    ]);

    autoTable(doc, {
      head: head,
      body: data,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [33, 183, 205] },
    });

    doc.save('relatorio_desempenho.pdf');
  }
}
