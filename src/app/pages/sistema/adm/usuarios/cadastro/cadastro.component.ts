import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../../../components/logo/logo.component';
import { HeaderIconeComponent } from '../../../../../components/sistema/header/components/icone/icone.component';

@Component({
  selector: 'app-adm-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LogoComponent, HeaderIconeComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class AdmCadastroUsuarioComponent implements OnInit {
  usuario = {
    nome: '',
    email: '',
    senha: '',
    tipo: 'aluno',
    status: 'ativo'
  };

  constructor(private router: Router) {}

  ngOnInit() {}

  cadastrar() {
    console.log('Cadastrando usuário:', this.usuario);
    // Simulação de cadastro
    alert('Usuário cadastrado com sucesso!');
    this.router.navigate(['/admin/usuarios']);
  }
}
