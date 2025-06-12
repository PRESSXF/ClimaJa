import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClimaService } from '../services/clima.service';

/**
 * Componente para exibir os detalhes do clima de uma cidade.
 */
@Component({
  selector: 'app-detalhes-clima',
  templateUrl: './detalhes-clima.page.html',
  styleUrls: ['./detalhes-clima.page.scss'],
})
export class DetalhesClimaPage implements OnInit {
  /**
   * Cidade para a qual os detalhes do clima estão sendo exibidos.
   */
  cidade: string = '';
  /**
   * Dados do clima atual da cidade.
   */
  climaAtual: any = null;
  /**
   * Previsão do tempo para os próximos dias.
   */
  previsao: any = null;
  /**
   * Indica se a aplicação está carregando os dados.
   */
  carregando: boolean = false;
  /**
   * Mensagem de erro a ser exibida.
   */
  erro: string = '';

  /**
   * Construtor do componente.
   * @param route Serviço para acessar os parâmetros da rota.
   * @param climaService Serviço para buscar os dados do clima.
   */
  constructor(
    private route: ActivatedRoute,
    private climaService: ClimaService
  ) {}

  /**
   * Método chamado quando o componente é inicializado.
   */
  ngOnInit() {
    // Obtém a cidade dos parâmetros da rota
    this.route.queryParams.subscribe(params => {
      if (params['cidade']) {
        this.cidade = params['cidade'];
        this.carregarDados();
      }
    });
  }

  /**
   * Carrega os dados do clima e da previsão para a cidade especificada.
   */
  async carregarDados() {
    this.carregando = true;
    this.erro = '';

    try {
      // Busca o clima atual
      this.climaAtual = await this.climaService.getClima(this.cidade).toPromise();
      
      // Busca a previsão de 5 dias
      this.previsao = await this.climaService.getPrevisao(this.cidade).toPromise();
      
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      this.erro = 'Erro ao carregar dados do clima';
    } finally {
      this.carregando = false;
    }
  }

  /**
   * Obtém a URL do ícone do clima.
   * @param icone Código do ícone do clima.
   * @returns URL do ícone do clima.
   */
  getIconeClima(icone: string): string {
    return `https://openweathermap.org/img/wn/${icone}@2x.png`;
  }

  /**
   * Converte um timestamp para um objeto Date.
   * @param timestamp Timestamp a ser convertido.
   * @returns Objeto Date correspondente ao timestamp.
   */
  formatarData(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

  trackByFn(index: any, item: any) {
    return item.dt;
  }
}
