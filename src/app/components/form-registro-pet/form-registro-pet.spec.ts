import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRegistroPet } from './form-registro-pet';

describe('FormRegistroPet', () => {
  let component: FormRegistroPet;
  let fixture: ComponentFixture<FormRegistroPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRegistroPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRegistroPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
