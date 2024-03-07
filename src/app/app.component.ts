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

   /* enableIndexedDbPersistence(firestore).catch((err) => {
      if (err.code == 'failed-precondition') {
        console.error('Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (err.code == 'unimplemented') {
        console.error('The current browser does not support all of the features required to enable persistence');
      }
    });*/
    /*this.installPWA();*/

  }







  handleSignOut(){
    //const auth = getAuth();

    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log("here");
      // An error happened.
    });

  }


  /*
  public promptEvent: any;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void; }) {
    e.preventDefault();
    this.promptEvent = e;
  }

  public installPWA() {
    this.promptEvent.prompt();
  }

  public shouldInstall(): boolean {
    return !this.isRunningStandalone() && this.promptEvent;
  }

  public isRunningStandalone(): boolean {
    return (window.matchMedia('(display-mode: standalone)').matches);
  }
  */




}
