import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricoClimaPage } from './historico-clima.page';

const routes: Routes = [
  {
    path: '',
    component: HistoricoClimaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricoClimaPageRoutingModule {}
