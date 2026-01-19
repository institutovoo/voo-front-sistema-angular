import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SistemaLayoutComponent } from '../../../../components/sistema/layout/layout.component';
import { HeaderIconeComponent } from '../../../../components/sistema/header/components/icone/icone.component';
import { AutenticacaoApi } from '../../../../core/api/autenticacao-api.service';
import { AutenticacaoService } from '../../../../core/service/autenticacao.service';

@Component({
  selector: 'app-adm-instrutores',
  standalone: true,
  imports: [RouterModule, FormsModule, SistemaLayoutComponent, HeaderIconeComponent],
  templateUrl: './instrutores.component.html',
  styleUrl: './instrutores.component.scss'
})
export class AdmInstrutoresComponent implements OnInit {
  private authApi = inject(AutenticacaoApi);
  private authService = inject(AutenticacaoService);

  usuarioLogado = this.authService.usuarioLogado;
  instrutores = signal<any[]>([]);
  carregando = signal(true);

  // Filtros
  busca = signal('');
  filtroStatus = signal('todos');

  instrutoresFiltrados = computed(() => {
    let lista = this.instrutores();
    const termo = this.busca().toLowerCase().trim();
    const status = this.filtroStatus();

    if (termo) {
      lista = lista.filter(i => 
        i.nome_completo?.toLowerCase().includes(termo) ||
        i.email?.toLowerCase().includes(termo)
      );
    }

    if (status !== 'todos') {
      const statusValue = status === 'ativo' ? 'ativo' : 'analise';
      lista = lista.filter(i => (i.status || 'ativo') === statusValue);
    }

    return lista;
  });

  ngOnInit() {
    this.carregarInstrutores();
  }

  carregarInstrutores() {
    this.carregando.set(true);
    this.authApi.listarUsuarios().subscribe({
      next: (res) => {
        if (res.sucesso) {
          // Filtra usuários que possuem algum perfil de Instrutor
          const lista = res.usuarios.filter((u: any) => 
            u.perfis && u.perfis.some((p: string) => p.includes('Instrutor'))
          );
          this.instrutores.set(lista);
        }
        this.carregando.set(false);
      },
      error: () => this.carregando.set(false)
    });
  }

  setBusca(valor: string) {
    this.busca.set(valor);
  }

  setFiltroStatus(valor: string) {
    this.filtroStatus.set(valor);
  }

  ehUsuarioLogado(u: any): boolean {
    return u.cpf_cnpj === this.usuarioLogado()?.cpf_cnpj;
  }
}
