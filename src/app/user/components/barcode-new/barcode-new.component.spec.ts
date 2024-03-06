import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeNewComponent } from './barcode-new.component';

describe('BarcodeNewComponent', () => {
  let component: BarcodeNewComponent;
  let fixture: ComponentFixture<BarcodeNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarcodeNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarcodeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
