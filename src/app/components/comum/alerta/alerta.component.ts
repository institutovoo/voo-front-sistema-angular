import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HeaderIconeComponent } from '../../sistema/header/components/icone/icone.component';

export type TipoAlerta = 'sucesso' | 'erro' | 'aviso' | 'info';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [HeaderIconeComponent],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.scss'
})
export class AlertaComponent implements OnInit {
  @Input() tipo: TipoAlerta = 'info';
  @Input() mensagem: string = '';
  @Input() titulo?: string;
  @Input() tempo: number = 5000;
  
  @Output() fechar = new EventEmitter<void>();

  visivel: boolean = true;

  ngOnInit() {
    if (this.tempo > 0) {
      setTimeout(() => {
        this.aoFechar();
      }, this.tempo);
    }
  }

  aoFechar() {
    this.visivel = false;
    this.fechar.emit();
  }

  getIcone(): string {
    switch (this.tipo) {
      case 'sucesso': return 'verificar';
      case 'erro': return 'bloquear';
      case 'aviso': return 'alerta';
      default: return 'info';
    }
  }
}
