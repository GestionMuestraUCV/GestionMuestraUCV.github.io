import { Component, HostListener } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'
import { Firestore, enableIndexedDbPersistence } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-muestras';


  constructor(public auth: Auth, private router: Router, firestore: Firestore){


  }



  handleSignOut(){

    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }


}
