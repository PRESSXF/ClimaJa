import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatura'
})
export class TemperaturaPipe implements PipeTransform {
  transform(value: number): string {
    if (value === null || value === undefined) {
      return '';
    }
    // Arredonda para uma casa decimal
    return `${Math.round(value * 10) / 10}`;
  }
}
