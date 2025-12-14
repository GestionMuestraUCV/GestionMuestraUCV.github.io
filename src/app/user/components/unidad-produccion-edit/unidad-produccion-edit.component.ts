import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unidad-produccion-edit',
  templateUrl: './unidad-produccion-edit.component.html',
  styleUrls: ['./unidad-produccion-edit.component.css']
})
export class UnidadProduccionEditComponent {

  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public res: any = "";
  public item: any = {
    codigo: null, // Usar null/vacío para que el *ngIf funcione si es necesario
    cliente: "",
    localidad: "",
    estado: "",
    altitud: "",
    coordenadas: "",
    tempmax: "",
    tempmin: "",
    precipitacion: ""
  };
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
    })
    this.getData();
    this.MyQuery();

  }

  handleRegister(value: any){
    this.addData(value);
  }

  async addData(value: any) {
    const dbInstance = doc(this.firestore, 'unidad-produccion', value.codigo);

    updateDoc(dbInstance,
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
      //console.log(this.pid)


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

    var x = position.coords.latitude;
    var y = position.coords.longitude;
    UnidadProduccionEditComponent.text = x+", "+ y;

  }

  async getLocation() {

    var test = "...";
    this.res=test;



    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(this.showPosition);

    } else {
      console.log("error");
    }
    setTimeout(() => {
      this.res= UnidadProduccionEditComponent.text;
      //console.log(this.res);
      }
      ,1000);



  }


  async MyQuery(){
    let str=this.x;
    const q = query(collection(this.firestore, "unidad-produccion"), where("codigo", "==",str));

    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        this.item = data;
        this.item.id = doc.id;

        if (!this.item.cliente) {
          this.item.cliente = "";
        }
        if (!this.item.localidad) {
          this.item.localidad=  "";
        }
        if (!this.item.estado) {
          this.item.estado =  "";
        }
        if (!this.item.tipo) {
          this.item.tipo =  "";
        }
        if (!this.item.altitud) {
          this.item.altitud =  "";
        }
        if (!this.item.coordenadas) {
          this.item.coordenadas =  "";
        }
        if (!this.item.tempmax) {
          this.item.tempmax =  "";
        }
        if (!this.item.tempmin) {
          this.item.tempmin =  "";
        }
        if (!this.item.precipitacion) {
          this.item.precipitacion =  "";
        }

        //
        this.res=this.item.coordenadas;
      });
    }
  }


  /*
    <div class="one" [innerHtml]="htmlToAdd"></div>
    this.htmlToAdd = '<div class="two">two</div>';
  */

  deleteData(id: string) {

    let text = "Seguro que desea eliminar esta Unidad de Producción?";
    if (confirm(text) == true) {
      //text = "You pressed OK!";
      let str=this.x;
      const dataToDelete = doc(this.firestore, 'unidad-produccion', str);
      //console.log(id);
      //console.log(dataToDelete);
      deleteDoc(dataToDelete)
      .then(() => {
        alert('Data Deleted');
        //this.getData()
        this.router.navigate(['user/unidad-produccion-all']);
      })
      .catch((err) => {
        alert(err.message)
      })


    } else {
      //text = "You canceled!";
      ;
    }

  }

  Home(){

    this.router.navigate(['user/unidad-produccion-all']);
    //window.location.href='#/auth/login';
  }


  backPage(){
    this.location.back();
  }


}
