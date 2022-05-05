import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticuloCartComponent } from './edit-articulo-cart.component';

describe('EditArticuloCartComponent', () => {
  let component: EditArticuloCartComponent;
  let fixture: ComponentFixture<EditArticuloCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArticuloCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticuloCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
