import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicComponent } from './public.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('PublicComponent', () => {
  let component: PublicComponent;
  let fixture: ComponentFixture<PublicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicComponent],
      imports: [ FormsModule, RouterModule],
    });
    fixture = TestBed.createComponent(PublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
