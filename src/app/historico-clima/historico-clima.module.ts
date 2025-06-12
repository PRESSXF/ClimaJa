import { NgModule } from '@angular/core';
import { HistoricoClimaPageRoutingModule } from './historico-clima-routing.module';
import { HistoricoClimaPage } from './historico-clima.page';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    SharedModule,
    HistoricoClimaPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [HistoricoClimaPage]
})
export class HistoricoClimaPageModule {}
