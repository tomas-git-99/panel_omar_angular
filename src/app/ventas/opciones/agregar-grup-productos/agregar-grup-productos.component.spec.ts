import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarGrupProductosComponent } from './agregar-grup-productos.component';

describe('AgregarGrupProductosComponent', () => {
  let component: AgregarGrupProductosComponent;
  let fixture: ComponentFixture<AgregarGrupProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarGrupProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarGrupProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
