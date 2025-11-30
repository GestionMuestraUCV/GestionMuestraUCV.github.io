import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  title = 'gestion-muestras';

  constructor(public auth: Auth, private router: Router){

  }

  handleSignOut(){
    //const auth = getAuth();

    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log("here");
      // An error happened.
    });
    this.router.navigate(['auth/login']);

  }



  Perfil(){

    this.router.navigate(['client/perfil']);
    //window.location.href='#/auth/login';
  }
  Muestras(){

    this.router.navigate(['client/muestras-all']);
    //window.location.href='#/auth/login';
  }


  Unidad(){

    this.router.navigate(['client/unidad-produccion-all']);
    //window.location.href='#/auth/login';
  }


  Home(){

    this.router.navigate(['client/land']);
    //window.location.href='#/auth/login';
  }

  Resultados(){

    this.router.navigate(['client/resultados']);
    //window.location.href='#/auth/login';
  }

  Unidades(){
    this.router.navigate(['client/unidad-produccion-all']);

  }

  Codigo(){
    this.router.navigate(['user/barcode-new']);

  }

  Scan(){
    this.router.navigate(['user/scan']);
  }



}
