import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalhesClimaPage } from './detalhes-clima.page';

const routes: Routes = [
  {
    path: '',
    component: DetalhesClimaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalhesClimaPageRoutingModule {}
