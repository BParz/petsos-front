import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrPlatesSection } from './qr-plates-section';

describe('QrPlatesSection', () => {
  let component: QrPlatesSection;
  let fixture: ComponentFixture<QrPlatesSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrPlatesSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrPlatesSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
