import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uvColor'
})
export class UvColorPipe implements PipeTransform {
  transform(uvIndex: number): string {
    if (uvIndex <= 2) {
      return '#289500'; // Verde - Baixo
    } else if (uvIndex <= 5) {
      return '#F7D708'; // Amarelo - Moderado
    } else if (uvIndex <= 7) {
      return '#F85900'; // Laranja - Alto
    } else if (uvIndex <= 10) {
      return '#D8001D'; // Vermelho - Muito Alto
    } else {
      return '#6B49C8'; // Roxo - Extremo
    }
  }
}
