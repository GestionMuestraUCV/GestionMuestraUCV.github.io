import { Component } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth'
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Platform } from '@angular/cdk/platform';
import { AdminModule } from 'src/app/admin/admin.module';
import { PromptComponent } from 'src/app/prompt/prompt.component';
import { PwaService } from 'src/app/services/pwa.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public data: any = []
  public current: any
  public nid: number = 1;
  constructor(public auth: Auth, private router: Router,public firestore: Firestore, private platform: Platform){
    this.getData();

    if (this.platform.IOS) {this.hidInstText=false; this.hidInstBut=true;}
    if (this.platform.ANDROID) {this.hidInstText=true; this.hidInstBut=false;}

    window.addEventListener("appinstalled", () => {
      this.disableInAppInstallPrompt();
      this.hidInstBut=true;
    });

    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.promptEvent = event;
      //console.log("promptEvent");

    });

  }

  public myValue:any;
  public hidInstText:boolean= true;
  public hidInstBut:boolean= true;/* false */
  private promptEvent: any;


  getData() {
    //console.log(this.auth.currentUser)
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }

  Signup(){
    this.router.navigate(['/auth/signup']);
    //window.location.href='#/auth/login';
  }

  Salir(){
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.router.navigate(['auth/select']);
    //window.location.href='#/auth/login';
  }

  Credits(){
    this.router.navigate(['/auth/credits']);
  }

  disableInAppInstallPrompt() {
    this.hidInstBut=true;
  }

  Login(){
    this.router.navigate(['/auth/login']);
    //window.location.href='#/auth/login';
  }

  public installPwa(): void {
    this.promptEvent.prompt();
  }





  async handleLogin(value:any){
    let res;
    signInWithEmailAndPassword(this.auth, value.email, value.password)
    .then(async (response: any)=>{
      this.current=response.user.email;
      res=response.user.email;
      //console.log(res)
      const q = query(collection(this.firestore, "users"), where("email", "==", res));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let info=doc.data();

        if(info['role']=="Adminitrador"){
          this.router.navigate(['/admin/land']); // /admin/users
        }else if(info['role']=="Investigador"){
          this.router.navigate(['/user/land']); // '/user/projects' '/user/unidad-produccion-all'
        }
        else if(info['role']=="Cliente"){
          this.router.navigate(['/client/land']); // '/client/projects' '/client/unidad-produccion-all'
        }
        else{
          ;
        }

      });


    })
    .catch((err) =>{
     alert(err.message);
    })

  }

}




