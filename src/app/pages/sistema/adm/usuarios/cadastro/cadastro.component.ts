import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LogoComponent } from '../../../../../components/logo/logo.component';
import { HeaderIconeComponent } from '../../../../../components/sistema/header/components/icone/icone.component';
import { AutenticacaoController } from '../../../../../core/controller/autenticacao.controller';
import { AlertaService } from '../../../../../core/service/alerta.service';
import { CadastroRequest } from '../../../../../core/model/autenticacao.model';

@Component({
  selector: 'app-adm-cadastro-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, LogoComponent, HeaderIconeComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class AdmCadastroUsuarioComponent implements OnInit {
  private authController = inject(AutenticacaoController);
  private alertaService = inject(AlertaService);
  private router = inject(Router);

  usuario = {
    nome: '',
    email: '',
    senha: '',
    tipo: 'aluno',
    status: 'ativo'
  };

  enviando = false;

  ngOnInit() {}

  async cadastrar() {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.tipo) {
      this.alertaService.aviso('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.enviando = true;

    // Mapeia o tipo simplificado para o tipo esperado pelo backend
    let tipoContaFinal = 'Aluno';
    if (this.usuario.tipo === 'instrutor') tipoContaFinal = 'Instrutor (PF)';
    if (this.usuario.tipo === 'admin') tipoContaFinal = 'Admin';

    const dadosCadastro: CadastroRequest = {
      nome_completo: this.usuario.nome,
      email: this.usuario.email,
      senha: this.usuario.senha || undefined,
      indicador_tipo_conta: tipoContaFinal as any,
      cpf_cnpj: `admin-gen-${Date.now()}`,
      aceitouTermos: true
    };

    try {
      const resultado = await this.authController.cadastrar(dadosCadastro);
      if (resultado.sucesso) {
        this.alertaService.sucesso('Usuário cadastrado com sucesso!');
        this.router.navigate(['/admin/usuarios']);
      } else {
        this.alertaService.erro(resultado.mensagem || 'Erro ao cadastrar usuário.');
      }
    } catch (error) {
      this.alertaService.erro('Erro de comunicação com o servidor.');
    } finally {
      this.enviando = false;
    }
  }
}
