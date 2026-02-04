import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clients-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css']
})
export class ClientsEditComponent {

  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public res: any = "";
  public item: any;
  public x: any;
  public pid: any;
  public static text: string = "";

  @ViewChild('geo') geo: any;//ElementRef | undefined;
  public htmlToAdd: any;
  @Input() something !: any;
  @Output() somethingChange= new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private location: Location){
    //this.getData();
    //this.MyQuery();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.x=param['id'];
      console.log(param);
      console.log(param['id']);
      //this.generateBarcode(param);

    })
    this.getData();
    this.MyQuery();

  }

  handleRegister(value: any){
    //console.log(value);
    this.addData(value);
    this.backPage()
    //this.Home();
  }

  async addData(value: any) {
    //const dbInstance = collection(this.firestore, 'users');
    console.log(value);
    const dbInstance = doc(this.firestore, 'clientes', value.email);

    updateDoc(dbInstance,
      {
        email: value.email,
        nombre: value.nombre,
        fecha: value.fecha,
        telefono: value.telefono,
        direccion: value.direccion
      }

      )
      .then(() => {

        alert('Data Sent')
      })
      .catch((err) => {
        alert(err.message)
      })
      console.log(this.pid)


  }

  getData() {
    const dbInstance = collection(this.firestore, 'clientes');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })

  }


  showPosition(position: any) {

    console.log(position.coords.latitude);
    console.log(position.coords.longitude);

    var x = position.coords.latitude;
    var y = position.coords.longitude;
    ClientsEditComponent.text = x+", "+ y;

  }

  async getLocation() {
    var test = "...";
    this.res=test;

    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(this.showPosition);

    } else {
      //x.innerHTML = "Geolocation is not supported by this browser.";
      console.log("error");
    }
    setTimeout(() => {
      this.res= ClientsEditComponent.text;
      console.log(this.res);
      }
      ,1000);

  }


  async MyQuery(){
    let str=this.x;
    const q = query(collection(this.firestore, "clientes"), where("email", "==",str));

    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        this.item=doc.data();
        console.log(doc.id, " => ", doc.data());
        //
        this.res=this.item.coordenadas;
        this.pid=this.item.project;
      });
    }
  }



  deleteData(id: string) {
    let str=this.x;
    const dataToDelete = doc(this.firestore, 'clientes', str);

    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      //this.getData()
      this.backPage();
    })
    .catch((err) => {
      alert(err.message)
    })

  }

  Home(){

    this.router.navigate(['user/unidad-produccion-all']);
    //window.location.href='#/auth/login';
  }



  backPage(){
    this.location.back();
  }


}
