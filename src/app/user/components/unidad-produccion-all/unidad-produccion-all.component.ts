import { Component, ElementRef, ViewChild } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@angular/fire/firestore';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidad-produccion-all',
  templateUrl: './unidad-produccion-all.component.html',
  styleUrls: ['./unidad-produccion-all.component.css']
})
export class UnidadProduccionAllComponent {

  public data: any = [];
  public item: any;
  public pid: any;

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private elem: ElementRef) {
    //this.pid=" ";
    this.getData();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      //this.item=param['id'];
      this.pid=param['id'];

    })
    //this.getData();
    //.MyQuery();
  }

  getData() {
    //console.log(this.auth.currentUser)
    const dbInstance = collection(this.firestore, 'unidad-produccion');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })

    /*
      this.dataSync.samples$.subscribe((samples) => {
        this.data = samples;
        console.log("Muestras loaded from sync service");
      });
    */
  }


  updateData(id: string) {
    const dataToUpdate = doc(this.firestore, 'unidad-produccion', id);
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
    const dataToDelete = doc(this.firestore, 'unidad-produccion', id);
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
  }

  Home(){
    this.router.navigate(['user/projects']);
  }

  Muestras(id: any, up:any){
    this.router.navigate(['user/muestras/'+ up ]);
  }

  logOut(){
    signOut(this.auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.router.navigate(['auth/select']);
  }

  newUnidad(id: string){
    this.router.navigate(['user/unidad-produccion-new']);
  }

  editUnidad(id: any){
    this.router.navigate(['user/unidad-produccion-edit/'+ id]);
  }

  infoProject(id: any){
    this.router.navigate(['user/project-info/'+ id]);
  }

  infoUnidad(id: any){
    this.router.navigate(['user/unidad-produccion-info/'+ id]);
  }



  async MyQuery(){
    //let str="Project 10";
    let str=this.pid;
    //this.pid=str;
    const q = query(collection(this.firestore, "unidad-produccion"), where("project", "==",str));

    getDocs(q)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })


    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //this.list= doc;
      //this.data=doc;
    });


  }

}
