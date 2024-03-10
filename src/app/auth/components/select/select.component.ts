import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { AdminModule } from 'src/app/admin/admin.module';
import { PromptComponent } from 'src/app/prompt/prompt.component';
import { PwaService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  public myValue:any;
  constructor(public auth: Auth, private router: Router, private platform: Platform){
    /*const installTest = document.getElementById('installTest');
    //installTest!.style.display="none";
    installTest!.style.visibility="hidden";*/
    //this.platform.ANDROID


  }

  Credits(){
    this.router.navigate(['/auth/credits']);
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
