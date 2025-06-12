import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaSemana'
})
export class DiaSemanaPipe implements PipeTransform {

  private diasSemana = [
    'Domingo',
    'Segunda-feira', 
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];

  private diasSemanaAbrev = [
    'Dom',
    'Seg',
    'Ter', 
    'Qua',
    'Qui',
    'Sex',
    'Sáb'
  ];

  /**
   * Transforma uma data em nome do dia da semana em português
   * @param value - Data a ser transformada
   * @param abreviado - Se true, retorna versão abreviada (Dom, Seg, etc)
   * @returns Nome do dia da semana em português
   */
  transform(value: Date | string, abreviado: boolean = false): string {
    if (!value) return '';
    
    const data = new Date(value);
    const hoje = new Date();
    const amanha = new Date(hoje);
    amanha.setDate(hoje.getDate() + 1);
    
    // Verifica se é hoje
    if (this.isSameDay(data, hoje)) {
      return 'Hoje';
    }
    
    // Verifica se é amanhã
    if (this.isSameDay(data, amanha)) {
      return 'Amanhã';
    }
    
    // Retorna o dia da semana
    const diaSemana = data.getDay();
    return abreviado ? this.diasSemanaAbrev[diaSemana] : this.diasSemana[diaSemana];
  }

  /**
   * Verifica se duas datas são do mesmo dia
   */
  private isSameDay(data1: Date, data2: Date): boolean {
    return data1.getDate() === data2.getDate() &&
           data1.getMonth() === data2.getMonth() &&
           data1.getFullYear() === data2.getFullYear();
  }
}
