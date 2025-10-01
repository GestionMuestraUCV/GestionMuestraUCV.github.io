import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-muestras-edit',
  templateUrl: './muestras-edit.component.html',
  styleUrls: ['./muestras-edit.component.css']
})
export class MuestrasEditComponent {
  title = 'gestion-de-muestras-de-campo';
  public data: any = []
  public res: any = "";
  public item: any;
  public x: any;
  public pid: any;
  public static text: string = "";

  public fotoUrls: { inicial?: string; tipico?: string; tardios?: string } = {};

  @ViewChild('geo') geo: any;//ElementRef | undefined;
  public htmlToAdd: any;
  @Input() something !: any;
  @Output() somethingChange= new EventEmitter<any>();

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore,  private location: Location, private datePipe: DatePipe){
    //this.getData();
    //this.MyQuery();
  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.x=param['id'];
      //this.generateBarcode(param);

    })
    this.getData();
    this.MyQuery();

  }


  async onFileSelected(event: any, etapa: 'inicial' | 'tipico' | 'tardios') {
      const file: File = event.target.files[0];

      /*console.log(etapa);
      console.log(file);*/
      if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, `muestras/${etapa}/${file.name}`);

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


  handleRegister(value: any){

    this.addData( { ...value, fotos: this.fotoUrls });

    this.Home();
  }

  async addData(value: any) {
    const dbInstance = doc(this.firestore, 'muestras', value.codigo);
    value.fecha= this.datePipe.transform(value.fecha, 'dd/MM/yyyy')

    updateDoc(dbInstance,
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
        lote: value.lote,
        fotos: value.fotos,
        resultados: value.resultados,
        estadoDiag: value.estadoDiag


      }

      )
      .then(() => {

        alert('Data Sent')
      })
      .catch((err) => {
        alert(err.message)
      })


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

      return `${degrees}° ${minutes}' ${seconds.toFixed(2)}'' ${direction}`;

    }

  showPosition(position: any) {



    var latitud = position.coords.latitude;
    var longitud = position.coords.longitude;


    /*const degrees = Math.floor(Math.abs(latitud));
    const minutesDecimal = (Math.abs(latitud) - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = (minutesDecimal - minutes) * 60;

    let direction = '';
    direction = x >= 0 ? 'N' : 'S';
    const formattedLatitude = `${degrees}° ${minutes}' ${seconds.toFixed(2)}'' ${direction}`;
    */


    var x = latitud.toFixed(6);
    var y = longitud.toFixed(6);


    MuestrasEditComponent.text = x+", "+ y;

    //const formattedLatitude = this.convertDecimalToDMS(latitud, true);
    //const formattedLongitude = this.convertDecimalToDMS(longitud, false);


    //MuestrasEditComponent.text = `${formattedLatitude}, ${formattedLongitude}`;




  }

  async getLocation() {
    //d1.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
    var test = "...";
    this.res=test;



    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(this.showPosition);



    } else {
      //x.innerHTML = "Geolocation is not supported by this browser.";
      console.log("error");
    }
    setTimeout(() => {
      this.res= MuestrasEditComponent.text;
      }
      ,1000);



  }


  async MyQuery(){
    let str=this.x;
    const q = query(collection(this.firestore, "muestras"), where("codigo", "==",str));

    const querySnapshot = await getDocs(q);
    if(!querySnapshot.empty){
      querySnapshot.forEach((doc) => {
        this.item=doc.data();


        this.res=this.item.coordenadas;
        this.pid=this.item.project;

        this.fotoUrls = {
          inicial: this.item.fotos['inicial'] ,
          tipico: this.item.fotos['tipico'] ,
          tardios: this.item.fotos['tardios']
        };


      });
    }
  }

  backPage(){
      this.location.back();
    }



  deleteData(id: string) {


    let text = "Seguro que desea eliminar esta Muestra?";
    if (confirm(text) == true) {
      let str=this.x;
      const dataToDelete = doc(this.firestore, 'muestras', str);

      deleteDoc(dataToDelete)
      .then(() => {
        alert('Data Deleted');
        this.Home();
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


}

