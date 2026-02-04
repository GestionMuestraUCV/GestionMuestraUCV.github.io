import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirebaseApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore, enableIndexedDbPersistence, initializeFirestore, connectFirestoreEmulator, persistentLocalCache, persistentSingleTabManager} from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { UserModule } from './user/user.module';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { PrintComponent } from './print/print.component';
import {MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBottomSheetModule} from '@angular/material/bottom-sheet';



import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { SafePipe } from './safe.pipe';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClientModule } from './client/client.module';
import { PwaService } from './services/pwa.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

import { PromptComponent } from './prompt/prompt.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ImageControlComponent } from "./image-control/image-control.component";





//LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res))

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();

/*
export function initializerZ(){
  return (pwaService: PwaService) => {
    console.log("initializerZ");
    return pwaService.initPwaPrompt();

  }

}
*/


//
export function basicLoader(){
  return () => {
    console.log("basicLoader");
    return Promise.resolve();

  }

}


@NgModule({
  declarations: [
    PromptComponent,
    AppComponent,
    PrintComponent,
    SafePipe
  ],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => //getFirestore()),
     {
        //const firestore = getFirestore();
        //connectFirestoreEmulator(firestore, 'localhost', 8080);
        //enableIndexedDbPersistence(firestore);

        const app = initializeApp(environment.firebase);
        const firestore = initializeFirestore(app, {
          localCache: persistentLocalCache({
            tabManager: persistentSingleTabManager({})
          })
        });
        //persistentLocalCache({ tabManager: persistentSingleTabManager({}) });
        return firestore;
    }),
    provideFunctions(() => getFunctions()),
    UserModule,
    AdminModule,
    ClientModule,
    NgxScannerQrcodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
    }),
    ImageControlComponent
],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true},
    //{provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},


    //{provide: APP_INITIALIZER, useFactory: initializerZ, deps: [PwaService], multi: true},

   //
    //{provide: APP_INITIALIZER, useFactory: basicLoader, deps: [], multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  //constructor(pwaService: PwaService){pwaService.initPwaPrompt();}





}
