import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BarcodeComponent } from './barcode.component';
import { of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

let firestoreMock: any;
let authMock: any;
let activatedRouteMock: any;

describe('BarcodeComponent', () => {
  let component: BarcodeComponent;
  let fixture: ComponentFixture<BarcodeComponent>;

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
  //

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarcodeComponent],
      imports: [  FormsModule ],
      providers: [ // Provide the mock here
        { provide: Firestore, useValue: firestoreMock },
        { provide: Auth, useValue: authMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock } // Provide the mock

      ]
    });
    fixture = TestBed.createComponent(BarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});






/*
activatedRouteMock = { // Mock ActivatedRoute
    params: of({ // Mock paramMap (for route parameters)
      get: (paramName: string) => {
        if (paramName === 'id') { // Example: Mock 'id' parameter
          return '123';
        }
        return null; // Or return a different value for other params
      }
    }),
    paramMap: of({ // Mock paramMap (for route parameters)
      get: (paramName: string) => {
        if (paramName === 'id') { // Example: Mock 'id' parameter
          return '123';
        }
        return null; // Or return a different value for other params
      }
    }),
    queryParams: of({ // Mock queryParams (for query parameters)
      get: (paramName: string) => {
        if (paramName === 'filter') {
          return 'active';
        }
        return null;
      }
    }),
    snapshot: {  // Mock snapshot (for initial route data)
      paramMap: {
        get: (paramName: string) => {
          if (paramName === 'id') {
            return '123';
          }
          return null;
        }
      },
      queryParams: {
          filter: 'active'
      }
    }
  };
*/
