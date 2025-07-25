import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unidad-produccion-new',
  templateUrl: './unidad-produccion-new.component.html',
  styleUrls: ['./unidad-produccion-new.component.css']
})
export class UnidadProduccionNewComponent {
  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public pid: any;
  public res: any="";
  public static text: string = "";

  @ViewChild('geo') geo: any;//ElementRef | undefined;
  public htmlToAdd: any;
  @Input() something !: any;
  @Output() somethingChange= new EventEmitter<any>();
  public email: string ="";

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private location: Location){
    //this.getData();
  }
  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.pid=param['id'];
      //this.pid=param['id'];

      //console.log(param);
      //console.log(param['id']);
      //this.generateBarcode(param);

    })
    //this.getData();
    //this.MyQuery();

  }

  handleRegister(value: any){
    console.log(value);
     this.addData(value);
     this.Home();
  }

  addData(value: any) {
    //const dbInstance = collection(this.firestore, 'users');
    const dbInstance = doc(this.firestore, 'unidad-produccion', value.codigo);
    //if (typeof value.cliente === 'undefined') value.cliente ="";

    const gauth = getAuth();
    onAuthStateChanged(gauth, (user) => {
      if (user) {
        if(user.email){this.email= user.email;}
      }
    });

    //setDoc(dbInstance, value)
    setDoc(dbInstance,
      {
        codigo: value.codigo,
        cliente: value.cliente,
        localidad: value.localidad,
        estado: value.estado,
        altitud: value.altitud,
        coordenadas: value.coordenadas,
        tempmax: value.tempmax,
        tempmin: value.tempmin,
        precipitacion: value.precipitacion
        //project: this.pid
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
    const dbInstance = collection(this.firestore, 'unidad-produccion');
    getDocs(dbInstance)
      .then((response) => {
        this.data = [...response.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }


  showPosition(position: any) {
    /*
      const p: HTMLParagraphElement = this.renderer.createElement('p');
      p.innerHTML = "add new"
      this.renderer.appendChild(this.div.nativeElement, p)
    */
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    //console.log(res);
    //unidad-produccionNewComponent.lat= position.coords.latitude;
    //this.somethingChange.emit(position.coords.latitude);
    //console.log(position.coords.longitude);
    //this.something=position.coords.latitude;
    //this.somethingChange.emit(this.something);
    //var text = position.coords.latitude;
    //this.geo=text;
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    UnidadProduccionNewComponent.text = x+", "+ y;
    console.log(UnidadProduccionNewComponent.text);




    //x.innerHTML = "Latitude: " + position.coords.latitude +
    //"<br>Longitude: " + position.coords.longitude;
  }

  async getLocation() {
    //d1.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
    //console.log("click");
    var test = "...";
    this.res=test;
    //console.log(this.res);



    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(this.showPosition);



    } else {
      //x.innerHTML = "Geolocation is not supported by this browser.";
      console.log("error");
    }
    setTimeout(() => {
      this.res= UnidadProduccionNewComponent.text;
      console.log(this.res);
      }
      ,1000);



  }

  Home(){
    this.router.navigate(['user/unidad-produccion-all']);
    //window.location.href='#/auth/login';
  }

  backPage(){
    this.location.back();
  }


  /*
    <div class="one" [innerHtml]="htmlToAdd"></div>
    this.htmlToAdd = '<div class="two">two</div>';
  */


}
