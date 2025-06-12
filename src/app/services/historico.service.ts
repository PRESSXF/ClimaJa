export interface HistoricoItem {
  cidade: string;
  data: string;
  icone: string;
  descricao: string;
  temperatura: number;
}

export interface HistoricoPaginado {
  itens: HistoricoItem[];
  totalItens: number;
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private chaveStorage = 'historicoCidades';

  constructor() {}

  adicionarHistorico(item: HistoricoItem): void {
    let historico = this.getHistorico();
    const index = historico.findIndex(h => h.cidade === item.cidade && h.data === item.data);
    if (index === -1) {
      historico.unshift(item);
      if (historico.length > 30) { // Aumentado de 10 para 30 itens
        historico.pop();
      }
      localStorage.setItem(this.chaveStorage, JSON.stringify(historico));
    }
  }

  getHistorico(): HistoricoItem[] {
    const historico = localStorage.getItem(this.chaveStorage);
    return historico ? JSON.parse(historico) : [];
  }

  obterHistoricoPaginado(pagina: number, itensPorPagina: number): HistoricoPaginado {
    const historico = this.getHistorico();
    const totalItens = historico.length;
    const inicio = (pagina - 1) * itensPorPagina;
    const itens = historico.slice(inicio, inicio + itensPorPagina);
    return { itens, totalItens };
  }

  removerItem(indice: number): void {
    let historico = this.getHistorico();
    if (indice >= 0 && indice < historico.length) {
      historico.splice(indice, 1);
      localStorage.setItem(this.chaveStorage, JSON.stringify(historico));
    }
  }

  limparHistorico(): void {
    localStorage.removeItem(this.chaveStorage);
  }
}
