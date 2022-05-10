import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerTalleresComponent } from './ver-talleres.component';

describe('VerTalleresComponent', () => {
  let component: VerTalleresComponent;
  let fixture: ComponentFixture<VerTalleresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerTalleresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerTalleresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
