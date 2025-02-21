import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptComponent } from './prompt.component';
import { FormsModule } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';



describe('PromptComponent', () => {
  let component: PromptComponent;
  let fixture: ComponentFixture<PromptComponent>;
  let mockBottomSheet = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromptComponent],
      imports: [ FormsModule],
      providers: [
        { provide: MatBottomSheetRef, useValue: mockBottomSheet },
        { provide: MAT_BOTTOM_SHEET_DATA, useValue: MAT_BOTTOM_SHEET_DATA}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
