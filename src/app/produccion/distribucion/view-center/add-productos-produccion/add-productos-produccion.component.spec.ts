import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductosProduccionComponent } from './add-productos-produccion.component';

describe('AddProductosProduccionComponent', () => {
  let component: AddProductosProduccionComponent;
  let fixture: ComponentFixture<AddProductosProduccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductosProduccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductosProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
