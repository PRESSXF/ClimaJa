import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'detalhes-clima',
    loadChildren: () => import('./detalhes-clima/detalhes-clima.module').then(m => m.DetalhesClimaPageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico-clima/historico-clima.module').then(m => m.HistoricoClimaPageModule)
  },
  {
    path: 'forecast',
    loadChildren: () => import('./forecast/forecast.module').then(m => m.ForecastPageModule)
  },
  {
    path: 'resultados-busca',
    loadChildren: () => import('./resultados-busca/resultados-busca.module').then( m => m.ResultadosBuscaModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
