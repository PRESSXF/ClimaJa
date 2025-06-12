import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClimaService } from '../services/clima.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  @Input() climaAtual: any;
  @Output() definirLocalizacao = new EventEmitter<any>();
  public forecastData: any[] = [];

  constructor(private climaService: ClimaService, private router: Router) { }

  ngOnInit() {
    if (this.climaAtual) {
      this.climaService.getPrevisao(this.climaAtual.name).subscribe(data => {
        this.forecastData = data.list;
      });
    }
  }

  getIconeClima(icone: string): string {
    return `https://openweathermap.org/img/wn/${icone}@2x.png`;
  }

  verDetalhes(forecast: any) {
    this.router.navigate(['/detalhes-clima'], {
      queryParams: {
        cidade: this.climaAtual.name,
        data: forecast.dt_txt
      }
    });
  }

  onDefinirLocalizacaoAtual() {
    this.definirLocalizacao.emit(this.climaAtual);
  }
}
