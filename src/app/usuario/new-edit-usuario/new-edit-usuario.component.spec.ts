import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEditUsuarioComponent } from './new-edit-usuario.component';

describe('NewEditUsuarioComponent', () => {
  let component: NewEditUsuarioComponent;
  let fixture: ComponentFixture<NewEditUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEditUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEditUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
