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
  public isIOS:boolean= false;
  private promptEvent: any;

  constructor(public auth: Auth, private router: Router, private platform: Platform){
    /*const installTest = document.getElementByClassName('install');
    //installTest!.style.display="none";
    installTest!.style.visibility="hidden";*/
    //this.platform.ANDROID
    //this.platform.IOS
    if (this.platform.IOS) {this.isIOS=true}
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.promptEvent = event;
      //event.prompt();
      console.log("promptEvent");

    });



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

  public installPwa(): void {
    console.log("click");
    /*window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.promptEvent = event;
      //event.prompt();
      console.log("prompt");

    });*/
    this.promptEvent.prompt();
  }

}
