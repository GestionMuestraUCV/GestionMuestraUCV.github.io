import { Component, HostListener, signal } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'
import { Firestore, enableIndexedDbPersistence } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DataSyncService } from './services/data-sync.service';
import { fromEvent, Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-muestras';
  private onlineSubscription!: Subscription;


  constructor(public auth: Auth, private router: Router, firestore: Firestore, public dataSync: DataSyncService){

  }

  ngOnInit() {
    // Start downloading data as soon as the app opens
    // 1. Initial fetch when the app first loads
    this.dataSync.fetchAllData();
    //console.log('here');


      // 2. Listen for the moment the browser goes back online
      this.onlineSubscription = fromEvent(window, 'online').subscribe(() => {
        //console.log('🌐 Internet restored! Re-syncing data...');


        this.dataSync.fetchAllData();
        // Optional: You could trigger a notification here
        //alert('Conexión restaurada. Sincronizando datos...');

      });

      /*fromEvent(window, 'offline').subscribe(() => {
        console.log('🚫 Internet lost! Working in offline mode...');
        // You could set a UI variable here to show a "Disconnected" icon
      });*/


  }

  handleSignOut(){

    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }

  /* */
  height = signal(250);
  width = signal(250);

  imageReady(imageUrl: string) {
    console.log('Firebase Uploaded Image: ', imageUrl);
  }
  /* */



  ngOnDestroy() {
    // Clean up the listener when the app is closed
    if (this.onlineSubscription) {
      this.onlineSubscription.unsubscribe();
    }
  }


}
