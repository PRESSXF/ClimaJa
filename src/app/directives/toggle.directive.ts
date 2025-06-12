import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appToggle]'
})
export class ToggleDirective {
  @Input('appToggle') targetId: string;
  private isVisible = true;

  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    const targetElement = document.getElementById(this.targetId);
    if (targetElement) {
      this.isVisible = !this.isVisible;
      targetElement.style.display = this.isVisible ? 'block' : 'none';
      
      // Atualiza o ícone se existir
      const icon = this.el.nativeElement.querySelector('ion-icon');
      if (icon) {
        icon.name = this.isVisible ? 'chevron-up' : 'chevron-down';
      }
    }
  }
}
