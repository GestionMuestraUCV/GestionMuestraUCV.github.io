import { Injectable, Component  } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root',
})

export class AdminGuard implements CanActivate, CanActivateChild {
  constructor( private auth: Auth, private router: Router, public firestore: Firestore) {}

  canActivateChild(next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    return this.checkLogin(state.url);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    let user = this.auth.currentUser;

    return this.checkLogin(state.url);
  }

  async checkLogin(url: string): Promise<boolean> {
    let user= this.auth.currentUser
    if (user) {
      //console.log('User email:', user.email);
      if(await this.checkRole(user.email)){
        return true;
      }

    }

    this.router.navigate(['/']);
    return false;
  }


  async checkRole(res: any): Promise<boolean> {
    //console.log(res)
    //const q = query(collection(this.firestore, "users"), where("email", "==", res));
    //const querySnapshot = await getDocs(q);
    let p = false;

    const docRef = doc(this.firestore, "users", res);
    const docSnap = await getDoc(docRef);
    let info=docSnap.data();
    if(info &&info['role']=="Adminitrador"){
      p= true;
    }


    /*querySnapshot.forEach((doc) => {
      let info=doc.data();

      if(info['role']=="Adminitrador"){
        //this.router.navigate(['/admin/land']); // /admin/users
        p= true;
      }

    });*/

    /*for (const doc of querySnapshot.docs) {
      //console.log(doc.id, " => ", doc.data());
      if (doc.id === res) {
        p= true;
        break; // This works
      }
    }*/


    return p;

  }







}
