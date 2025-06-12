import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ResultadosBuscaModule } from '../resultados-busca/resultados-busca.module';
import { CurrentWeatherComponent } from '../current-weather/current-weather.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    SharedModule,
    ResultadosBuscaModule
  ],
  declarations: [
    HomePage,
    CurrentWeatherComponent
  ]
})
export class HomePageModule {}
