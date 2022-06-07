import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoTurnosKpiComponent } from './grafico-turnos-kpi.component';

describe('GraficoTurnosKpiComponent', () => {
  let component: GraficoTurnosKpiComponent;
  let fixture: ComponentFixture<GraficoTurnosKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficoTurnosKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoTurnosKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
