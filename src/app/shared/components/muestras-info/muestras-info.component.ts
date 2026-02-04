import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-muestras-info',
  templateUrl: './muestras-info.component.html',
  styleUrls: ['./muestras-info.component.css']
})
export class MuestrasInfoComponent {
  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public res: any;
  public item: any;
  public text: any;

  public mostrarFotoInicial: boolean = true;
  public mostrarFotoTipico: boolean = false;
  public mostrarFotoTardios: boolean = false;

  public fotoUrls: { inicial?: string; tipico?: string; tardios?: string } = {}; // Nueva propiedad

  placeholderUrl: string = '../../../../assets/landscape-placeholder.jpg';


  @ViewChild('geo') geo: any;//ElementRef | undefined;
  public htmlToAdd: any;
  @Input() something !: any;
  @Output() somethingChange= new EventEmitter<any>();



  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private location: Location){
    this.getData();
    this.MyQuery();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.text=param['id'];

    })
    this.getData();
    this.MyQuery();

  }

  alternarFotoInicial() {
    this.mostrarFotoInicial = true;
    this.mostrarFotoTipico = false;
    this.mostrarFotoTardios = false;
  }

  alternarFotoTipico() {
    this.mostrarFotoInicial = false;
    this.mostrarFotoTipico = true;
    this.mostrarFotoTardios = false;
  }

  alternarFotoTardios() {
    this.mostrarFotoInicial = false;
    this.mostrarFotoTipico = false;
    this.mostrarFotoTardios = true;
  }


  handleRegister(value: any){
     this.addData(value);
  }

  addData(value: any) {
    //const dbInstance = collection(this.firestore, 'users');
    const dbInstance = doc(this.firestore, 'muestras', value.codigo);
    setDoc(dbInstance, value)
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

    var x = position.coords.latitude;
    var y = position.coords.longitude;
    //MuestrasNewComponent.text = x+", "+ y;

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
      //this.res= MuestrasNewComponent.text;
      console.log(this.res);
      }
      ,1000);



  }


  async MyQuery(){
    let str=this.text;
    const q = query(collection(this.firestore, "muestras"), where("codigo", "==",str));

    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      querySnapshot.forEach((doc) => {
        this.item=doc.data();
        //console.log(this.item);

        this.fotoUrls = {
          inicial: this.item.fotos['inicial'] ,
          tipico: this.item.fotos['tipico'] ,
          tardios: this.item.fotos['tardios']
        };


      });
    }

  }

  editMuestra(){
    let str=this.text;
    this.router.navigate(['../muestras-edit/'+ str], { relativeTo: this.route });

    //this.router.navigate(['user/muestras-edit/'+ str]);
    //window.location.href='#/auth/login';
  }



  deleteData(id: string) {
    const dataToDelete = doc(this.firestore, 'users', id);
    deleteDoc(dataToDelete)
    .then(() => {
      alert('Data Deleted');
      this.getData()
    })
    .catch((err) => {
      alert(err.message)
    })
  }


  backPage(){
    this.location.back();
  }

}
