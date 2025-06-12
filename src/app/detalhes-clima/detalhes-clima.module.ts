import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DetalhesClimaPageRoutingModule } from './detalhes-clima-routing.module';
import { DetalhesClimaPage } from './detalhes-clima.page';
import { SharedModule } from '../shared/shared.module';

import { DetalhesClimaComponent } from './detalhes-clima.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalhesClimaPageRoutingModule,
    SharedModule
  ],
  declarations: [DetalhesClimaPage, DetalhesClimaComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [DetalhesClimaComponent]
})
export class DetalhesClimaPageModule {}
