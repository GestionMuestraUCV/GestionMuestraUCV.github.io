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
  //public tooltip: any;
  //public tooltipComponent: any;

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private elem: ElementRef) {
    //this.pid=" ";
    this.getData();


    //this.MyQuery();
  }

  //@ViewChild('#cdk-describedby-message-ng-1-2', {static: true, read: MatTooltip}) tooltipComponent: MatTooltip | undefined;

  //@ViewChild('ElementRefName') element: ElementRef | undefined;



  /*setTooltip(event: MouseEvent): void {

    //this.tooltip = tooltip;
      let elements = document.querySelectorAll('.cdk-describedby-message-container');
      console.log(elements[0]);
      //var el = new Element(document.querySelectorAll('.cdk-describedby-message-container'));
      elements = this.elem.nativeElement.querySelectorAll('.list');
      console.log(elements[0]);
      let el =elements[0];
      //let rect= el.getBoundingClientRect();
      //console.log(rect);
      let rect=el.getClientRects();
      console.log(rect);
      //console.log(this.tooltipComponent);
      console.log(event.clientX);
      //this.tooltipComponent?.show(0, {x: event.clientX, y: event.clientY });
  }*/

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      //this.item=param['id'];
      this.pid=param['id'];

      console.log(param);
      console.log(param['id']);
      //this.generateBarcode(param);

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
    //window.location.href='#/auth/login';
  }

  Home(){

    this.router.navigate(['user/projects']);
    //window.location.href='#/auth/login';
  }

  Muestras(id: any, up:any){

    this.router.navigate(['user/muestras/'+ id+'/'+ up ]);
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

  newUnidad(id: string){
    this.router.navigate(['user/unidad-produccion-new/'+ id]);
    //window.location.href='#/auth/login';
  }

  editUnidad(id: any){
    this.router.navigate(['user/unidad-produccion-edit/'+ id]);
    //window.location.href='#/auth/login';
  }

  infoProject(id: any){
    this.router.navigate(['user/project-info/'+ id]);
    //window.location.href='#/auth/login';
  }

  infoUnidad(id: any){
    this.router.navigate(['user/unidad-produccion-info/'+ id]);
    //window.location.href='#/auth/login';
  }



  async MyQuery(){
    //let str="Project 10";
    let str=this.pid;
    //this.pid=str;
    console.log(str);
    const q = query(collection(this.firestore, "unidad-produccion"), where("project", "==",str));


    getDocs(q)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
        //console.log(this.data.length);
        /*if(this.data.length==0){
          //alert(err.message);
          console.log("empty");

        };*/

      })





    /*const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());

    });*/


    const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        //console.log("here2");
        //this.list= doc;
        //this.data=doc;
      });
      //console.log("done");


  }

}
