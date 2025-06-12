import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resultados-busca',
  templateUrl: './resultados-busca.component.html',
  styleUrls: ['./resultados-busca.component.css']
})
export class ResultadosBuscaComponent {
  @Input() sugestoes: string[] = [];
  @Output() cidadeSelecionada = new EventEmitter<string>();

  selecionarSugestao(sugestao: string) {
    this.cidadeSelecionada.emit(sugestao);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
