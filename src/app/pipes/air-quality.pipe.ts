import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'airQuality'
})
export class AirQualityPipe implements PipeTransform {
  transform(aqi: number): { text: string, color: string } {
    switch (aqi) {
      case 1:
        return { text: 'Boa', color: '#00E400' };
      case 2:
        return { text: 'Razoável', color: '#FFFF00' };
      case 3:
        return { text: 'Moderada', color: '#FF7E00' };
      case 4:
        return { text: 'Ruim', color: '#FF0000' };
      case 5:
        return { text: 'Muito Ruim', color: '#8F3F97' };
      default:
        return { text: 'Desconhecida', color: '#999999' };
    }
  }
}
