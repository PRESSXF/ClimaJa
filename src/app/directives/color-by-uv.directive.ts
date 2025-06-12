import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appColorByUV]'
})
export class ColorByUVDirective implements OnChanges {
  @Input('appColorByUV') uvIndex: number;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.uvIndex === undefined || this.uvIndex === null) return;

    let color: string;
    if (this.uvIndex <= 2) {
      color = '#289500'; // Verde - Baixo
    } else if (this.uvIndex <= 5) {
      color = '#F7D708'; // Amarelo - Moderado
    } else if (this.uvIndex <= 7) {
      color = '#F85900'; // Laranja - Alto
    } else if (this.uvIndex <= 10) {
      color = '#D8001D'; // Vermelho - Muito Alto
    } else {
      color = '#6B49C8'; // Roxo - Extremo
    }

    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.color = this.uvIndex <= 5 ? '#000000' : '#FFFFFF';
  }
}
