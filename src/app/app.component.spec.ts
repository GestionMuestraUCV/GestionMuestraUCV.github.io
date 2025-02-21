import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { AngularFireModule, FIREBASE_OPTIONS } from '@angular/fire/compat'; // Import AngularFireModule
//import { environment } from 'src/environments/environment'; // Import your environment config

/*import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Import Firestore module
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Import Auth module
*/


let firestoreMock: any; // Define the mock
let authMock: any; // Mock for Auth

describe('AppComponent', () => {


/*
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
    // Mock other Auth methods your component uses (e.g., signInWithEmailAndPassword)
    // ...
  };
*/

  beforeEach(async () => { //() => TestBed.configureTestingModule({
    firestoreMock = {
      collection: () => ({
        valueChanges: () => of([]) // Mock an empty array initially
      })
    };

    authMock = {
      authState: of(null), // Mock no user logged in initially
      currentUser: Promise.resolve(null)
    };

    await TestBed.configureTestingModule({

      declarations: [AppComponent],
      imports: [
        FormsModule,
        RouterModule,
        RouterTestingModule,

        //AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase (use your config)
        /*AngularFirestoreModule, // Import Firestore module
        AngularFireAuthModule
        */
      ],
      providers: [ // Provide the mock here
        //{ provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        { provide: Firestore, useValue: firestoreMock },
        { provide: Auth, useValue: authMock }

        /*{ provide: Auth, useValue: {
            // Add any methods or properties that AppComponent uses
            isAuthenticated: () => true, // Example: Mock isAuthenticated
            login: () => Promise.resolve(), // Example: Mock login
            // ... other methods your component uses
          }
        }*/
      ]
    }).compileComponents();
  });


    /*let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges(); // Important!*/





  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gestion-muestras'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gestion-muestras');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement; //const compiled = fixture.nativeElement;
    //expect(compiled.querySelector('.content span')?.textContent).toContain('gestion-muestras app is running!');
    //toEqual('angular-app')
    //expect(compiled.querySelector('h1')?.textContent).toContain('Hello World');
  });




  // Example test for Auth interaction:
  it('should handle authentication state (if your component does this)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    // Modify authMock for a logged in user
    authMock.authState = of({ uid: 'testUserId' });
    authMock.currentUser = Promise.resolve({uid: 'testUserId'});

    fixture.detectChanges();

    // Add assertions based on how your AppComponent handles auth
    //expect(component.isLoggedIn).toBe(true); // Example
  });


  // Example test for Firestore interaction (adapt as needed)
  it('should fetch items from Firestore (if your component does this)', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    // Modify the mock to return some data for this specific test:
    firestoreMock.collection = () => ({
      valueChanges: () => of([{ id: 1, name: 'Test Item' }])
    });

    fixture.detectChanges(); // Important!

    // Add assertions based on how your AppComponent uses the data
    // expect(component.items.length).toBe(1); // If your component has an 'items' property
    // expect(component.items[0].name).toBe('Test Item'); // Example assertion
  });


});







//
/*it('should fetch items and handle authentication', () => {
    expect(component.items.length).toBe(1);
    expect(component.items[0].name).toBe('Item 1');

    // Add assertions related to authentication (e.g., check if user info is displayed)
    // ...
  });*/
  /*
  it('should fetch items from Firestore', () => {
    let fixture = TestBed.createComponent(AppComponent);
    let component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.items.length).toBe(2);
    expect(component.items[0].name).toBe('Item 1');
  });*/
  //
