import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosBuscaComponent } from './resultados-busca.component';

describe('ResultadosBuscaComponent', () => {
  let component: ResultadosBuscaComponent;
  let fixture: ComponentFixture<ResultadosBuscaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultadosBuscaComponent]
    });
    fixture = TestBed.createComponent(ResultadosBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
