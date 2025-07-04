import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPet } from './registro-pet';

describe('RegistroPet', () => {
  let component: RegistroPet;
  let fixture: ComponentFixture<RegistroPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
