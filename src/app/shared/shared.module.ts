import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Pipes personalizados
import { TemperaturaPipe } from '../pipes/temperatura.pipe';
import { DiaSemanaPipe } from '../pipes/dia-semana.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { UvColorPipe } from '../pipes/uv-color.pipe';
import { AirQualityPipe } from '../pipes/air-quality.pipe';

// Diretivas personalizadas
import { HighlightDirective } from '../directives/highlight.directive';
import { ColorByUVDirective } from '../directives/color-by-uv.directive';
import { ToggleDirective } from '../directives/toggle.directive';

@NgModule({
  declarations: [
    TemperaturaPipe,
    DiaSemanaPipe,
    CapitalizePipe,
    UvColorPipe,
    AirQualityPipe,
    HighlightDirective,
    ColorByUVDirective,
    ToggleDirective
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CommonModule,
    IonicModule,
    TemperaturaPipe,
    DiaSemanaPipe,
    CapitalizePipe,
    UvColorPipe,
    AirQualityPipe,
    HighlightDirective,
    ColorByUVDirective,
    ToggleDirective
  ]
})
export class SharedModule { }
