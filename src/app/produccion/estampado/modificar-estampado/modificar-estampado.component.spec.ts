import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEstampadoComponent } from './modificar-estampado.component';

describe('ModificarEstampadoComponent', () => {
  let component: ModificarEstampadoComponent;
  let fixture: ComponentFixture<ModificarEstampadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarEstampadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarEstampadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
