import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFailuresComponent } from './add-failures.component';

describe('AddFailuresComponent', () => {
  let component: AddFailuresComponent;
  let fixture: ComponentFixture<AddFailuresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFailuresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFailuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
