import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadProduccionComponent } from './unidad-produccion.component';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';

let firestoreMock: any;
let authMock: any;
let activatedRouteMock: any;

describe('UnidadProduccionComponent', () => {
  let component: UnidadProduccionComponent;
  let fixture: ComponentFixture<UnidadProduccionComponent>;
  firestoreMock = { // Create the mock Firestore object
          collection: () => ({
            valueChanges: () => of([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]) // Mock valueChanges()
          })
        };

        authMock = { // Mock Firebase Auth
          authState: of({ // Mock the authState Observable
            uid: 'mockUserId', // Example: Mock a logged-in user
            // ... other user properties you might need
          }),
          currentUser: Promise.resolve({
              uid: 'mockUserId',
              displayName: 'Mock User'
          }),
        };

        activatedRouteMock = { // Mock ActivatedRoute
          params: of({ // Mock paramMap (for route parameters)
            get: (paramName: string) => {
              if (paramName === 'id') { // Example: Mock 'id' parameter
                return '123';
              }
              return null; // Or return a different value for other params
            }
          })
        };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadProduccionComponent],
      providers: [
        { provide: Firestore, useValue: firestoreMock },
        { provide: Auth, useValue: authMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }

      ]
    });
    fixture = TestBed.createComponent(UnidadProduccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
