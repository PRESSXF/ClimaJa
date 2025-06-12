import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ResultadosBuscaComponent } from './resultados-busca.component';

@NgModule({
  declarations: [
    ResultadosBuscaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ResultadosBuscaComponent]
})
export class ResultadosBuscaModule { }
