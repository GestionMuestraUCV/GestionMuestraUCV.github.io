import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, query, setDoc, where } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { Location } from '@angular/common';

@Component({
  selector: 'app-barcode-new',
  templateUrl: './barcode-new.component.html',
  styleUrl: './barcode-new.component.css'
})
export class BarcodeNewComponent {

  //unidadProduccionNombres: string[] = [];
  unidadProduccionNombres: string[] = [];
  public data: any = []
  public res: any;
  public item: any;
  public num: number = 1;
  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private location: Location) {
    this.getUnidadesProduccion();
  }

  ngOnInit(): void {
    //await this.getUnidadProduccionNombres();
    let code;
    this.route.params.subscribe(param =>{
      this.item=param['id'];
      code=param['id'];;
      this.generateBarcode(code);

    })
    //this.getData();
    //this.MyQuery();

  }

  async handleRegister(value: any){
    //console.log(value.codigo);

    const isUnique = await this.checkExistence(value.codigo);

    if (isUnique) {
      this.addData(value);
      this.Barcode(value.codigo);

    }


  }

  generateBarcode(value: any){
    let number =1;
    var text = value;
    this.res=text;

    JsBarcode("#barcode", text, {//
      format: "CODE128"
    });


  }


  async getUnidadesProduccion() {
    const querySnapshot = await getDocs(collection(this.firestore, 'unidad-produccion'));
    querySnapshot.forEach((doc) => {
      this.unidadProduccionNombres.push(doc.data()['codigo']);
    });
  }


  /*
  async getUnidadProduccionNombres() {
    const unidadesRef = collection(this.firestore, 'unidad-produccion');
    const querySnapshot = await getDocs(unidadesRef);

    this.unidadProduccionNombres = querySnapshot.docs.map(doc => {
      // Asume que cada documento tiene un campo 'nombre'
      const data = doc.data() as any;
      return data.nombre;
    });
  */


async checkExistence(codigo: string): Promise<boolean> {
  const muestrasRef = collection(this.firestore, 'muestras');
  const q = query(muestrasRef, where("codigo", "==", codigo));

  try {
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // If the snapshot is NOT empty, the sample exists
      alert("Error: El código de muestra ya existe. Intente con otro.");
      return false;
    }
    return true; // Code is unique, proceed!
  } catch (error) {
    console.error("Error verifying existence:", error);
    alert("Error de conexión al verificar el código.");
    return false;
  }
}

//
  generateSVG(number:any, value: any){
    for(let i=0;i<number; i++){
      const div = document.createElement("div");
      const para = document.createElement("svg");
      //const node = document.createTextNode("This is new.");
      //para.appendChild(node);
      div.setAttribute("class", "subcode");
      let str= "barcode" + i;
      para.setAttribute("id", str);
      const element = document.getElementById("codes");
      element?.appendChild(para);

    }
  }
//


  addData(value: any) {
    let dbInstance = doc(this.firestore, 'muestras', value.codigo);

    setDoc(dbInstance,
      {
        codigo: value.codigo,
        unidad: value.ud
      }
      )
      /*.then(() => {
        alert('Data Sent')
      })
      .catch((err) => {
        alert(err.message)
      })*/


    /*
    if(value.ud){

      dbInstance = doc(this.firestore, 'unidad-produccion', value.ud);

      setDoc(dbInstance,
      {
        codigo: value.ud
      }
      )

    }
    */



  }


  toPrint(num:number){
    this.router.navigate(['/print/'+ this.res+'/'+ num]);
  }

  async sleep(ms: number): Promise<void> {
    return new Promise(
        (resolve) => setTimeout(resolve, ms));
  }


  backPage(){
    this.location.back();
  }

  Barcode(id: any){
    this.router.navigate(['../barcode/'+ id], { relativeTo: this.route });
    //this.router.navigate(['user/barcode/'+ id]);
    //window.location.href='#/auth/login';
  }






}
