import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalhes-clima',
  templateUrl: './detalhes-clima.component.html',
  styleUrls: ['./detalhes-clima.component.scss'],
})
export class DetalhesClimaComponent {
  @Input() climaAtual: any;
}
