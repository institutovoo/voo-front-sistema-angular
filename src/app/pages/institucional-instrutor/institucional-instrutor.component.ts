import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../components/logo/logo.component';
import { BotaoComponent } from '../../components/botao/botao.component';
import { FaqItemComponent } from '../../components/institucional/faq-item/faq-item.component';
import { TermosComponent } from '../diretrizes/termos/termos.component';
import { PrivacidadeComponent } from '../diretrizes/privacidade/privacidade.component';
import { CookiesComponent } from '../diretrizes/cookies/cookies.component';

@Component({
  selector: 'app-institucional-instrutor',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    LogoComponent,
    BotaoComponent,
    FaqItemComponent,
    TermosComponent,
    PrivacidadeComponent,
    CookiesComponent,
  ],
  templateUrl: './institucional-instrutor.component.html',
  styleUrl: './institucional-instrutor.component.scss',
})
export class InstitucionalInstrutorComponent {
  menuAberto = false;
  formularioContato: FormGroup;
  enviando = false;
  mensagemEnviada = false;

  // Modais de diretrizes
  mostrarTermos = false;
  mostrarPrivacidade = false;
  mostrarCookies = false;

  constructor(private fb: FormBuilder) {
    this.formularioContato = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      assunto: ['instrutor', [Validators.required]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  abrirTermos(): void { this.mostrarTermos = true; }
  fecharTermos(): void { this.mostrarTermos = false; }
  abrirPrivacidade(): void { this.mostrarPrivacidade = true; }
  fecharPrivacidade(): void { this.mostrarPrivacidade = false; }
  abrirCookies(): void { this.mostrarCookies = true; }
  fecharCookies(): void { this.mostrarCookies = false; }

  enviarMensagem(): void {
    if (this.formularioContato.valid) {
      this.enviando = true;
      setTimeout(() => {
        this.enviando = false;
        this.mensagemEnviada = true;
        this.formularioContato.reset({ assunto: 'instrutor' });
        setTimeout(() => { this.mensagemEnviada = false; }, 5000);
      }, 1500);
    } else {
      this.formularioContato.markAllAsTouched();
    }
  }
}
