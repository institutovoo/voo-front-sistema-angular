import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertaPainelComponent } from './components/comum/alerta-painel/alerta-painel.component';
import { ConfirmacaoModalComponent } from './components/comum/confirmacao-modal/confirmacao-modal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AlertaPainelComponent, ConfirmacaoModalComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
