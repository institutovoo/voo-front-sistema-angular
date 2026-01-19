import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MetasService } from '../../../../core/service/metas.service';
import { AutenticacaoService } from '../../../../core/service/autenticacao.service';
import { AlertaService } from '../../../../core/service/alerta.service';
import { Logger } from '../../../../core/utils/logger';

@Component({
  selector: 'app-config-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class ConfigPerfilComponent {
  private metasService = inject(MetasService);
  private authService = inject(AutenticacaoService);
  private alertaService = inject(AlertaService);

  formulario = new FormGroup({
    nomeCompleto: new FormControl(this.authService.usuarioLogado()?.nome_completo || '', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    email: new FormControl(this.authService.usuarioLogado()?.email || '', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    telefone: new FormControl(this.authService.usuarioLogado()?.whatsapp || '', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    idioma: new FormControl('pt-BR', {
      nonNullable: true,
    }),
    metaSemanal: new FormControl(this.metasService.metaHoras(), {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    bio: new FormControl('', {
      nonNullable: true,
    }),
  });

  fotoUrl: string | null = null;
  salvando = false;

  onFotoChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size > 2 * 1024 * 1024) {
        this.alertaService.aviso('A imagem deve ter no máximo 2MB', 'Arquivo muito grande');
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fotoUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  formatarTelefone(event: Event) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.substring(0, 11);
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
    this.formulario.get('telefone')?.setValue(valor);
  }

  salvar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.salvando = true;
    const dados = this.formulario.getRawValue();
    const usuario = this.authService.usuarioLogado();
    
    Logger.audit('Usuário iniciou atualização de perfil', 'Perfil', { 
      id: usuario?.id, 
      dados: dados 
    });

    // Atualiza a meta semanal no serviço
    this.metasService.atualizarMeta(dados.metaSemanal);

    setTimeout(() => {
      this.salvando = false;
      this.alertaService.sucesso('Alterações salvas com sucesso!');
      Logger.info('Perfil atualizado com sucesso', 'Perfil', { id: usuario?.id });
    }, 1000);
  }
}
