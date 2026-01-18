import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetasService {
  private readonly STORAGE_KEY = 'meta_horas_semanal';
  
  // Signal para a meta de horas (padrão 20h)
  metaHoras = signal<number>(Number(localStorage.getItem(this.STORAGE_KEY)) || 20);

  // Horas já concluídas (mockadas para o exemplo)
  horasConcluidas = signal<number>(15);

  // Cálculo da porcentagem
  porcentagemConcluida = computed(() => {
    const meta = this.metaHoras();
    if (meta <= 0) return 0;
    const porcentagem = (this.horasConcluidas() / meta) * 100;
    return Math.min(Math.round(porcentagem), 100);
  });

  atualizarMeta(horas: number) {
    this.metaHoras.set(horas);
    localStorage.setItem(this.STORAGE_KEY, String(horas));
  }
}
