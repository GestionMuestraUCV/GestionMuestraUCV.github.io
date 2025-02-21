import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { AuthComponent } from './auth.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

let authMock: any; // Mock for Auth

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  authMock = { // Mock Firebase Auth
      authState: of({ // Mock the authState Observable
        uid: 'mockUserId', // Example: Mock a logged-in user
        // ... other user properties you might need
      }),
      currentUser: Promise.resolve({
          uid: 'mockUserId',
          displayName: 'Mock User'
      }),
      // Mock other Auth methods your component uses (e.g., signInWithEmailAndPassword)
      // ...
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [
        FormsModule,
        RouterModule,
      ],
      providers: [{ provide: Auth, useValue: authMock }]
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
