import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-clients-new',
  templateUrl: './clients-new.component.html',
  styleUrls: ['./clients-new.component.css']
})
export class ClientsNewComponent {
  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public pid: any;
  public res: any="";
  public static text: string = "";

  @ViewChild('geo') geo: any;//ElementRef | undefined;
  public htmlToAdd: any;
  @Input() something !: any;
  @Output() somethingChange= new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private location: Location){
    //this.getData();
  }
  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.pid=param['id'];
      //this.pid=param['id'];
      //this.generateBarcode(param);

    })
    //this.getData();
    //this.MyQuery();

  }

  handleRegister(value: any){
     this.addData(value);
     this.backPage();
  }

  addData(value: any) {
    //const dbInstance = collection(this.firestore, 'users');
    const dbInstance = doc(this.firestore, 'clientes', value.email);
    //if (typeof value.cliente === 'undefined') value.cliente ="";

    //setDoc(dbInstance, value)
    setDoc(dbInstance,
      {
        email: value.email,
        nombre: value.nombre,
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
      console.log(value.comentarios)

  }

  getData() {
    const dbInstance = collection(this.firestore, 'muestras');
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
    ClientsNewComponent.text = x+", "+ y;
    console.log(ClientsNewComponent.text);

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
      this.res= ClientsNewComponent.text;
      console.log(this.res);
      }
      ,1000);

  }

  backPage(){
    this.location.back();
  }


}
