import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandClientComponent } from './land.component';

describe('LandComponent', () => {
  let component: LandClientComponent;
  let fixture: ComponentFixture<LandClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
