import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HistoricoService, HistoricoItem } from '../services/historico.service';

@Component({
  selector: 'app-historico-clima',
  templateUrl: './historico-clima.page.html',
  styleUrls: ['./historico-clima.page.scss'],
})
export class HistoricoClimaPage implements OnInit {
  historico: HistoricoItem[] = [];
  Math = Math; // Para usar Math no template
  
  // Paginação - Configurado para 3 páginas com 10 itens cada (total 30 itens)
  paginaAtual = 1;
  itensPorPagina = 10; // 10 itens por página = 3 páginas para 30 itens total
  totalItens = 0;

  constructor(
    private historicoService: HistoricoService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.carregarHistorico();
  }

  ionViewWillEnter() {
    this.carregarHistorico();
  }

  /**
   * Carrega o histórico de buscas
   */
  private carregarHistorico() {
    const resultado = this.historicoService.obterHistoricoPaginado(this.paginaAtual, this.itensPorPagina);
    this.historico = resultado.itens;
    this.totalItens = resultado.totalItens;
  }

  /**
   * Formata a data para exibição
   */
  formatarData(data: Date | string): string {
    if (typeof data === 'string') {
      data = new Date(data);
    }
    const agora = new Date();
    const dataItem = new Date(data);
    const diff = agora.getTime() - dataItem.getTime();
    const segundos = Math.floor(diff / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `${dias} ${dias === 1 ? 'dia' : 'dias'} atrás`;
    } else if (horas > 0) {
      return `${horas} ${horas === 1 ? 'hora' : 'horas'} atrás`;
    } else if (minutos > 0) {
      return `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'} atrás`;
    } else {
      return 'Agora mesmo';
    }
  }

  /**
   * Retorna o ícone apropriado baseado na descrição do clima
   */
  getWeatherIcon(descricao: string): string {
    const desc = descricao.toLowerCase();
    if (desc.includes('sol') || desc.includes('limpo')) {
      return 'sunny';
    } else if (desc.includes('chuva')) {
      return 'rainy';
    } else if (desc.includes('nuvem') || desc.includes('nublado')) {
      return 'cloudy';
    } else if (desc.includes('neve')) {
      return 'snow';
    } else if (desc.includes('trovão') || desc.includes('tempestade')) {
      return 'thunderstorm';
    } else if (desc.includes('vento')) {
      return 'wind';
    }
    return 'partly-sunny';
  }

  /**
   * Gera array com números das páginas para paginação
   * Limitado a 3 páginas conforme solicitado
   */
  getPageNumbers(): number[] {
    const totalPaginas = Math.ceil(this.totalItens / this.itensPorPagina);
    const maxPaginas = Math.min(totalPaginas, 3); // Máximo de 3 páginas
    const paginas: number[] = [];
    
    for (let i = 1; i <= maxPaginas; i++) {
      paginas.push(i);
    }
    
    return paginas;
  }

  /**
   * Manipula a mudança de página
   */
  onPageChange(pagina: number) {
    this.paginaAtual = pagina;
    this.carregarHistorico();
  }

  /**
   * Remove um item específico do histórico
   */
  async removerItem(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Do you want to remove this item from the history?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
            const indiceReal = inicio + index;
            this.historicoService.removerItem(indiceReal);
            this.carregarHistorico();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Confirms and clears the entire history
   */
  async confirmClearHistory() {
    const alert = await this.alertController.create({
      header: 'Clear search history',
      message: 'Are you sure you want to clear all search history?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Clear',
          handler: () => {
            this.limparHistorico();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Limpa todo o histórico
   */
  limparHistorico() {
    this.historicoService.limparHistorico();
    this.carregarHistorico();
  }

  /**
   * Navega para a página de detalhes
   */
  verDetalhes(cidade: string) {
    this.router.navigate(['/detalhes-clima', encodeURIComponent(cidade)]);
  }

  trackByHistoricoFn(index: any, item: any) {
    return item.data;
  }

  trackByPageNumbersFn(index: any, item: any) {
    return item;
  }
}
