import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input('appHighlight') corDestaque: string = 'yellow';
  private corOriginal: string = '';

  constructor(private el: ElementRef) {
    // Salva a cor de fundo original
    this.corOriginal = el.nativeElement.style.backgroundColor;
  }

  /**
   * Evento quando o mouse passa por cima do elemento
   */
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.corDestaque);
  }

  /**
   * Evento quando o mouse sai do elemento
   */
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.corOriginal);
  }

  /**
   * Aplica o destaque ao elemento
   * @param cor Cor a ser aplicada como destaque
   */
  private highlight(cor: string) {
    this.el.nativeElement.style.backgroundColor = cor;
    
    // Ajusta a cor do texto para garantir contraste
    if (cor !== this.corOriginal) {
      this.el.nativeElement.style.transition = 'all 0.3s ease';
      this.el.nativeElement.style.color = this.getContrasteTexto(cor);
    } else {
      this.el.nativeElement.style.color = '';
  }
}

  /**
   * Calcula a cor do texto para melhor contraste
   * @param corFundo Cor de fundo
   * @returns Cor do texto (preto ou branco)
   */
  private getContrasteTexto(corFundo: string): string {
    // Converte cores comuns para RGB
    const cores: { [key: string]: number[] } = {
      'yellow': [255, 255, 0],
      'white': [255, 255, 255],
      'black': [0, 0, 0]
    };

    let rgb = cores[corFundo.toLowerCase()] || [255, 255, 0]; // Padrão para amarelo

    // Calcula luminosidade
    const luminosidade = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
    
    return luminosidade > 0.5 ? '#000000' : '#FFFFFF';
  }
}
