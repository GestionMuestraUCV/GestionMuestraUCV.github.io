import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Auth, deleteUser, getAuth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';


type myType = {
  email:any;
  pass: any;
};

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  public data: any = []
  //public current: myType | undefined ;
  public current: any;
  public key: any;
  public myVar: myType | undefined;

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore) {
    this.getData();
  }

  ngOnInit(): void {
    //console.log(history.state.user);
    //console.log(this.router);
    //console.log(this.route);
    /*this.route.params.subscribe(param =>{
      console.log(param);
    })*/

  }

  NewUser(){
    this.router.navigate(['/admin/user-new']);
  }

  getData() {
    //console.log(this.auth.currentUser)
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })


    //this.getUserData();
    //console.log(this.current);
    //console.log(this.key);



  }




  updateData(id: string, value:any) {
    //let value= this.data['id'];
    //console.log(value);
    const dataToUpdate = doc(this.firestore, 'users', id);
    //console.log(dataToUpdate);

    updateDoc(dataToUpdate, {
      email: value.email,
      nombre: value.nombre,
      password: value.password,
      role: value.role

    })
      .then(() => {
        alert('Data updated');
        this.getData()
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  deleteData(id: string) {
    let text = "Seguro que desea eliminar este usuario?";
    if (confirm(text) == true) {
      //text = "You pressed OK!";
      const dataToDelete = doc(this.firestore, 'users', id);
      deleteDoc(dataToDelete)
      .then(() => {
        alert('Data Deleted');
        this.getData();
      })
      .catch((err) => {
        alert(err.message)
      })


    } else {
      //text = "You canceled!";
      ;
    }
  }

  handleSignOut(){
    //const auth = getAuth();

    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      //console.log("here");
      // An error happened.
    });
    this.router.navigate(['auth/select']);

  }

  Home(){

    this.router.navigate(['admin']);
    //window.location.href='#/auth/login';
  }

  Projectos(){

    this.router.navigate(['admin']);
    //window.location.href='#/auth/login';
  }
  Muestras(){

    this.router.navigate(['admin']);
    //window.location.href='#/auth/login';
  }

  editUser(id: any){
    this.router.navigate(['admin/user-edit/' + id]);
    //window.location.href='#/auth/login';
  }





  async handleLogin(value:any){
    let res=value;
    const q = query(collection(this.firestore, "users"), where("email", "==", res));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      let info=doc.data();
      //.log(info['password']);
      let pass= info['password'];

      signInWithEmailAndPassword(this.auth, res, value.pass)
      .then(async (response: any)=>{
        //this.current=response.user.email;
        //res=response.user.email;
        //console.log(res)
        //const q = query(collection(this.firestore, "users"), where("email", "==", res));
        //console.log(this.auth.currentUser?.email);

      })

    });

  }




  async deleteMyUser(id:any){
    //console.log("here2");
    let str: any;
    let mail= this.auth.currentUser?.email;
    console.log(this.auth.currentUser);
    str=' ';
    if(mail==null){str=mail;}
    this.current= mail;
    const q = query(collection(this.firestore, "users"), where("email", "==", mail));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      let info=doc.data();
      //console.log(info['password']);
      let pass= info['password'];
      let admin= mail;
      this.key=pass;

      //
      this.handleLogin(id);
      console.log(this.auth.currentUser);


      //deleteUser(uid);

      //this.auth.currentUser?.delete().then(() => {
        //this.auth.signOut()
      //})

      //signOut(this.auth)


      signInWithEmailAndPassword(this.auth, str, pass);
      console.log(this.auth.currentUser);

    });



  }

  async getUserData(){
    let mail= this.auth.currentUser?.email;
    this.current= mail;
    const q = query(collection(this.firestore, "users"), where("email", "==", this.current));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      let info=doc.data();
      //console.log(info['password']);
      let pass= info['password'];
      this.key=pass;




    });

  }



}
