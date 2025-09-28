import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, getFirestore, collection, doc, getDocs, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePickerComponent } from 'ng2-date-picker/lib/date-picker.module';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Location } from '@angular/common';


@Component({
  selector: 'app-muestras-new',
  templateUrl: './muestras-new.component.html',
  styleUrls: ['./muestras-new.component.css']
})
export class MuestrasNewComponent {
  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public pid: any;
  public res: any="";
  public static text: string = "";
  public email: string ="";

  public fotoUrls: { inicial?: string; tipico?: string; tardios?: string } = {};


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


    })
    //this.getData();
    //this.MyQuery();

  }


  async onFileSelected(event: any, etapa: 'inicial' | 'tipico' | 'tardios') {
    const file: File = event.target.files[0];
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `muestras/${this.res}/${etapa}/${file.name}`);
      try {
        const uploadResult = await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(uploadResult.ref);

        // Guardar la URL en la propiedad del componente
        this.fotoUrls[etapa] = imageUrl;

        alert(`Imagen de ${etapa} subida con éxito.`);
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Ocurrió un error al guardar la imagen.");
      }
    }
  }

  handleRegister(value:any){
     this.addData( { ...value, fotos: this.fotoUrls });
     this.Home();
  }

  addData(value: any) {



    const dbInstance = doc(this.firestore, 'muestras', value.codigo);

    setDoc(dbInstance,
      {
        codigo: value.codigo,
        cliente: value.cliente,
        fecha: value.fecha,
        cultivo: value.cultivo,
        tipo: value.tipo,
        fitopatogeno: value.fitopatogeno,
        repeticion: value.repeticion,
        coordenadas: value.coordenadas,
        sintomas: value.sintomas,
        comentarios: value.comentarios,
        unidad: this.pid,
        lote: value.lote,
        fotos: value.fotos
      }

      )
      .then(() => {
        alert('Data Sent')
      })
      .catch((err) => {
        alert(err.message)
      })
      //console.log(value.comentarios)

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

  Home(){

    this.router.navigate(['user/unidad-produccion-all']);
    //window.location.href='#/auth/login';
  }

  convertDecimalToDMS(decimal: number, isLatitude: boolean): string {
    const degrees = Math.floor(Math.abs(decimal));
    const minutesDecimal = (Math.abs(decimal) - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = (minutesDecimal - minutes) * 60;

    let direction = '';
    if (isLatitude) {
      direction = decimal >= 0 ? 'N' : 'S';
    } else {
      direction = decimal >= 0 ? 'E' : 'W';
    }

    // Usar toFixed para limitar los decimales de los segundos
    return `${degrees}° ${minutes}' ${seconds.toFixed(2)}'' ${direction}`;
  }

  showPosition(position: any) {

    var latitud = position.coords.latitude;
    var longitud= position.coords.longitude;

    var x = latitud.toFixed(6);
    var y = longitud.toFixed(6);


    MuestrasNewComponent.text = x+", "+ y;

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
      this.res= MuestrasNewComponent.text;
      console.log(this.res);
      }
      ,1000);



  }


  /*
    <div class="one" [innerHtml]="htmlToAdd"></div>
    this.htmlToAdd = '<div class="two">two</div>';
  */


  backPage(){
      this.location.back();
    }




}
