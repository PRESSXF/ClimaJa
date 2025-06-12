import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClimaService } from '../services/clima.service';
import { HistoricoService } from '../services/historico.service';
import { LocalizacaoService } from '../services/localizacao.service';
import { AlertController, ToastController } from '@ionic/angular';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

/**
 * Componente para a página inicial do aplicativo.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  /**
   * Cidade a ser buscada.
   */
  cidade: string = '';
  /**
   * Sugestões de cidades para a busca.
   */
  sugestoes: string[] = [];

  /**
   * Dados do clima atual da cidade buscada.
   */
  climaAtual: any = null;

  /**
   * Indica se a aplicação está carregando dados.
   */
  carregando: boolean = false;
  /**
   * Mensagem de erro a ser exibida.
   */
  erro: string = '';

  /**
   * Subject para controlar a busca de sugestões.
   */
  private searchTerm = new Subject<string>();

  /**
   * Construtor do componente.
   * @param climaService Serviço para buscar dados do clima.
   * @param historicoService Serviço para gerenciar o histórico de buscas.
   * @param localizacaoService Serviço para gerenciar a localização atual.
   * @param router Serviço para navegar entre as páginas.
   * @param alertController Controlador para exibir mensagens de alerta.
   * @param toastController Controlador para exibir notificações toast.
   */
  constructor(
    private climaService: ClimaService,
    private historicoService: HistoricoService,
    private localizacaoService: LocalizacaoService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  /**
   * Método chamado quando o componente é inicializado.
   */
  ngOnInit() {
    // Configura o searchTerm para buscar sugestões após um período de inatividade
    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.buscarSugestoes(value);
    });
  }

  /**
   * Busca os dados do clima para a cidade especificada.
   */
  async buscarClima() {
    console.log('Método buscarClima() chamado!');
    console.log('Cidade:', this.cidade);

    // Verifica se a cidade foi informada
    if (!this.cidade || !this.cidade.trim()) {
      this.mostrarErro('Por favor, digite o nome de uma cidade');
      return;
    }

    this.carregando = true;
    this.erro = '';
    this.climaAtual = null;

    try {
      this.sugestoes = [];
      this.climaService.getClima(this.cidade.trim()).subscribe({
        next: (clima) => {
          console.log('Dados do clima recebidos:', clima);
          this.climaAtual = clima;

          this.historicoService.adicionarHistorico({
            cidade: clima.name || this.cidade,
            temperatura: clima.main.temp,
            descricao: clima.weather[0].description,
            data: new Date().toISOString(),
            icone: clima.weather[0].icon
          });

          this.carregando = false;
          console.log('Busca concluída com sucesso');
          this.mostrarToast('Clima de ' + this.cidade + ' carregado com sucesso!', 'success');
        },
        error: (error) => {
          console.error('Erro ao buscar clima:', error);
          this.erro = 'Cidade não encontrada. Verifique o nome e tente novamente.';
          this.carregando = false;
          this.climaAtual = null;
          this.mostrarToast(this.erro, 'danger');
        }
      });
    } catch (error) {
      console.error('Erro inesperado:', error);
      this.erro = 'Erro inesperado. Tente novamente.';
      this.carregando = false;
      this.climaAtual = null;
      this.mostrarToast(this.erro, 'danger');
    }
  }

  /**
   * Exibe uma mensagem de erro.
   * @param mensagem Mensagem de erro a ser exibida.
   */
  async mostrarErro(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   * Exibe uma notificação toast.
   * @param mensagem Mensagem a ser exibida no toast.
   * @param cor Cor do toast.
   */
  async mostrarToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: cor
    });
    toast.present();
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
   * Manipula a entrada de busca e gera sugestões.
   * @param event Evento de entrada de texto.
   */
  onSearchInput(event: any) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.next(value);
  }

  /**
   * Busca sugestões de cidades com base no texto digitado.
   * @param cidade Texto da cidade a ser buscada.
   */
  buscarSugestoes(cidade: string) {
    if (cidade.trim() === '') {
      this.sugestoes = [];
      return;
    }

    this.climaService.getSugestoes(cidade).subscribe({
      next: (sugestoes) => {
        this.sugestoes = sugestoes.map(sugestao => `${sugestao.name}, ${sugestao.country}`);
      },
      error: (error) => {
        console.error('Erro ao buscar sugestões:', error);
        this.sugestoes = [];
      }
    });
  }

  /**
   * Seleciona uma sugestão da lista.
   * @param sugestao Sugestão selecionada.
   */
  selecionarSugestao(sugestao: string) {
    this.cidade = sugestao;
    this.buscarClima();
  }

  /**
   * Atualiza a cidade com o valor digitado no campo de busca.
   */
  onInputChange(event: any) {
    this.cidade = (event.target as HTMLInputElement).value;
  }

  /**
   * Permite a busca ao pressionar a tecla "Enter".
   */
  onKeyPress(event: any) {
    console.log('onKeyPress chamado!');
    if (event.key === 'Enter') {
      this.buscarClima();
    }
  }

  /**
   * Define a localização atual com base no clima atual.
   */
  definirLocalizacaoAtual(clima: any) {
    if (clima) {
      this.localizacaoService.definirLocalizacaoAtual(clima.name);
      console.log('Localização atual definida:', clima.name);
      this.mostrarToast(`Localização atual definida como ${clima.name}`, 'success');
    } else {
      this.mostrarErro('Por favor, digite o nome de uma cidade');
    }
  }
}
