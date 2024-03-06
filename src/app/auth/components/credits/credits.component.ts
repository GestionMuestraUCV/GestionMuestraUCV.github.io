import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {
  constructor(public auth: Auth, private router: Router){

  }

  Login(){
    this.router.navigate(['/auth/login']);
    //window.location.href='#/auth/login';
  }

  Signup(){
    this.router.navigate(['/auth/signup']);
    //window.location.href='#/auth/login';
  }

}
