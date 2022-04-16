import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarOfallasComponent } from './eliminar-ofallas.component';

describe('EliminarOfallasComponent', () => {
  let component: EliminarOfallasComponent;
  let fixture: ComponentFixture<EliminarOfallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarOfallasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarOfallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
