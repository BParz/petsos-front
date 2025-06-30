import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollarsSection } from './collars-section';

describe('CollarsSection', () => {
  let component: CollarsSection;
  let fixture: ComponentFixture<CollarsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollarsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollarsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
