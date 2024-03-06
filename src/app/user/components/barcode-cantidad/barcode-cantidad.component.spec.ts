import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeCantidadComponent } from './barcode-cantidad.component';

describe('BarcodeCantidadComponent', () => {
  let component: BarcodeCantidadComponent;
  let fixture: ComponentFixture<BarcodeCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarcodeCantidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarcodeCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
