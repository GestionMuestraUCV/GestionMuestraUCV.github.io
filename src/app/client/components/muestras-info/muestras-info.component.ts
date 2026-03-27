import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
    //this.getData();
    //this.MyQuery();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.text=param['id'];
      //console.log(param);
      //console.log(param['id']);
      //this.generateBarcode(param);

    })
    //this.getData();
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
    /*
      const p: HTMLParagraphElement = this.renderer.createElement('p');
      p.innerHTML = "add new"
      this.renderer.appendChild(this.div.nativeElement, p)
    */
    //console.log(position.coords.latitude);
    //console.log(position.coords.longitude);
    //console.log(res);
    //MuestrasNewComponent.lat= position.coords.latitude;
    //this.somethingChange.emit(position.coords.latitude);
    //console.log(position.coords.longitude);
    //this.something=position.coords.latitude;
    //this.somethingChange.emit(this.something);
    //var text = position.coords.latitude;
    //this.geo=text;
    var x = position.coords.latitude;
    var y = position.coords.longitude;
    //MuestrasNewComponent.text = x+", "+ y;
    //console.log(MuestrasNewComponent.text);




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
        // doc.data() is never undefined for query doc snapshots
        //this.item=doc.data();
        this.item= querySnapshot.docs[0].data();
        //console.log(this.item);
        //this.item=doc.data();
        //console.log(doc.id, " => ", doc.data());

        this.fotoUrls = {
          inicial: this.item.fotos['inicial'] ,
          tipico: this.item.fotos['tipico'] ,
          tardios: this.item.fotos['tardios']
        };
      });
    }


  }

  /*
    <div class="one" [innerHtml]="htmlToAdd"></div>
    this.htmlToAdd = '<div class="two">two</div>';
  */


  backPage(){
    this.location.back();
  }


}

