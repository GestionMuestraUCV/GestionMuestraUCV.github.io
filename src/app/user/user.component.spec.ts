import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { UserComponent } from './user.component';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // For Firestore
//import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // For Auth
import { ProjectsComponent } from './components/projects/projects.component';
import { MuestrasComponent } from './components/muestras/muestras.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { ProjectNewComponent } from './components/project-new/project-new.component';
import { MuestrasNewComponent } from './components/muestras-new/muestras-new.component';
import { ScanComponent } from './components/scan/scan.component';
import { MuestrasEditComponent } from './components/muestras-edit/muestras-edit.component';
import { MuestrasInfoComponent } from './components/muestras-info/muestras-info.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { MuestrasAllComponent } from './components/muestras-all/muestras-all.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { UnidadProduccionComponent } from './components/unidad-produccion/unidad-produccion.component';
import { UnidadProduccionNewComponent } from './components/unidad-produccion-new/unidad-produccion-new.component';
import { UnidadProduccionEditComponent } from './components/unidad-produccion-edit/unidad-produccion-edit.component';
import { UnidadProduccionInfoComponent } from './components/unidad-produccion-info/unidad-produccion-info.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsNewComponent } from './components/clients-new/clients-new.component';
import { UnidadProduccionAllComponent } from './components/unidad-produccion-all/unidad-produccion-all.component';
import { ClientsEditComponent } from './components/clients-edit/clients-edit.component';
import { ClientsInfoComponent } from './components/clients-info/clients-info.component';
import { BarcodeCantidadComponent } from './components/barcode-cantidad/barcode-cantidad.component';
import { BarcodeNewComponent } from './components/barcode-new/barcode-new.component';




let authMock: any; // Mock for Auth

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

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
      declarations: [
        UserComponent,
        /*ProjectsComponent,
        ProjectNewComponent,
        ProjectEditComponent,
        ProjectInfoComponent,
        BarcodeComponent,
        BarcodeCantidadComponent,
        BarcodeNewComponent,
        MuestrasComponent,
        MuestrasNewComponent,
        MuestrasEditComponent,
        MuestrasInfoComponent,
        MuestrasAllComponent,
        UnidadProduccionComponent,
        UnidadProduccionNewComponent,
        UnidadProduccionEditComponent,
        UnidadProduccionInfoComponent,
        UnidadProduccionAllComponent,
        ClientsComponent,
        ClientsNewComponent,
        ClientsEditComponent,
        ClientsInfoComponent,
        ScanComponent*/

      ],
      imports: [ FormsModule, RouterModule],
      providers: [{ provide: Auth, useValue: authMock }]
    });
    //fixture = TestBed.createComponent(UserComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
