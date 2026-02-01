import { Component } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged, signOut } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-muestras-all',
  templateUrl: './muestras-all.component.html',
  styleUrls: ['./muestras-all.component.css']
})
export class MuestrasAllComponent {

  public data: any = [];
  public dataTem : any;
  public arr : any = [];
  public item: any;
  public pid: any;

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore) {
    this.getData();
    //this.MyQuery();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.item=param['id'];


    })
    //this.getData();
    //this.MyQuery();

  }

   getData() {
    //console.log(this.auth.currentUser)
    const dbInstance = collection(this.firestore, 'muestras');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }


  updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'muestras', id);
    updateDoc(dataToUpdate, {})
      .then(() => {
        alert('Data updated');
        this.getData()
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'muestras', id);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  Scan(){

    this.router.navigate(['user/scan']);
    //window.location.href='#/auth/login';
  }

  Home(){

    this.router.navigate(['user/projects']);
    //window.location.href='#/auth/login';
  }

  logOut(){
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.router.navigate(['auth/select']);
    //window.location.href='#/auth/login';
  }

  newMuestra(){
    this.router.navigate(['user/muestras-new']);
    //window.location.href='#/auth/login';
  }

  editMuestra(id: any){
    this.router.navigate(['user/muestras-edit/'+ id]);
    //window.location.href='#/auth/login';
  }

  infoProject(id: any){
    this.router.navigate(['user/project-edit/'+ id]);
    //window.location.href='#/auth/login';
  }

  infoMuestra(id: any){
    this.router.navigate(['client/muestras-info/'+ id]);
    //window.location.href='#/auth/login';
  }



  async MyQuery(){
    //let str="Project 10";
    const gauth = getAuth();
    let temail: string;
    let arrTemp:any=[];
    temail="";
    //console.log(gauth);
    onAuthStateChanged(gauth, async (user) => {
      if (user) {
        console.log(user.email);
        if(user.email){
          temail =user.email;


          const q = query(collection(this.firestore, "projects"), where("cliente", "==", temail));

          getDocs(q)
          .then((response) => {
            this.dataTem = [...response.docs.map((item) => {
              return { ...item.data(), id: item.id }

            })]

          });



          const querySnapshot = await getDocs(q)
          querySnapshot.forEach((doc) => {

          });
          console.log(this.dataTem.length);
          //console.log(this.data);
          console.log(this.dataTem[0].name);
          let lengthArr = this.dataTem.length;
          console.log(lengthArr );


          for(let i=0;i< lengthArr; i++){
            console.log(this.dataTem[i].name);
            arrTemp.push(this.dataTem[i].name);

          }
          console.log(arrTemp);


        }

      }

      //

      console.log("next");
      console.log(arrTemp);
      let str=this.item;
      this.pid=str;
      //console.log(str);
      const p = query(collection(this.firestore, "muestras"), where("project", "in",arrTemp));


      getDocs(p)
        .then((response) => {
          this.data = [...response.docs.map((item) => {
            return { ...item.data(), id: item.id }
          })]
        })





      const querySnapshot = await getDocs(p)

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());

        });





    });





  }

}
