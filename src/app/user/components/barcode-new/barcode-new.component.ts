import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { Location } from '@angular/common';

@Component({
  selector: 'app-barcode-new',
  templateUrl: './barcode-new.component.html',
  styleUrl: './barcode-new.component.css'
})
export class BarcodeNewComponent {

  public data: any = []
  public res: any;
  public item: any;
  public num: number = 1;
  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore, private location: Location) {

  }

  ngOnInit(): void {
    let code;
    this.route.params.subscribe(param =>{
      this.item=param['id'];
      code=param['id'];
      //this.pid=param['id'];
      //this.generateSVG(1,code);
      //this.sleep(1000);
      this.generateBarcode(code);

    })
    //this.getData();
    //this.MyQuery();

  }

  handleRegister(value: any){
    console.log(value.codigo);
    this.addData(value);
    this.Barcode(value.codigo);

  }

  generateBarcode(value: any){
    let number =1;
    var text = value;
    this.res=text;

    JsBarcode("#barcode", text, {//
      format: "CODE128"
    });


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
      }
      )
      /*.then(() => {
        alert('Data Sent')
      })
      .catch((err) => {
        alert(err.message)
      })*/

    if(value.id){



      dbInstance = doc(this.firestore, 'projects',value.id);

      setDoc(dbInstance,
        {
          name: value.id
        }
        )
        /*.catch((err) => {
          alert(err.message)
        })*/

    }

    if(value.ud){

      dbInstance = doc(this.firestore, 'unidad-produccion', value.ud);

      setDoc(dbInstance,
      {
        codigo: value.ud
      }
      )
      /*.catch((err) => {
        alert(err.message)
      })*/

    }



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
    this.router.navigate(['user/barcode/'+ id]);
    //window.location.href='#/auth/login';
  }






}
