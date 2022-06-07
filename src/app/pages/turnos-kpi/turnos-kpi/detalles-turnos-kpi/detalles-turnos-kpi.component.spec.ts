import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesTurnosKpiComponent } from './detalles-turnos-kpi.component';

describe('DetallesTurnosKpiComponent', () => {
  let component: DetallesTurnosKpiComponent;
  let fixture: ComponentFixture<DetallesTurnosKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesTurnosKpiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesTurnosKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
