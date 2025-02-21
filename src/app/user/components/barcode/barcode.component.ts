import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';
import { Location } from '@angular/common';




@Component({
  selector: 'app-barcode',
  templateUrl: './barcode.component.html',
  styleUrls: ['./barcode.component.css']
})
export class BarcodeComponent {
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

      console.log(param);
      //console.log(param['id']);
      //this.generateSVG(1,code);
      //this.sleep(1000);
      this.generateBarcode(code);

    })
    //this.getData();
    //this.MyQuery();

  }

  handleRegister(value: any){
    console.log(value.cantidad);
    this.toPrint(value.cantidad);
  }

  generateBarcode(value: any){//number:any
    //var text = value.txt_input;
    let number =1;
    var text = value;
    //console.log(value);
    //console.log(text);
    this.res=text;


    /*const element = document.getElementById("barcode");
    //element!.style.display="inline";
    console.log(element!.style.display);*/

    JsBarcode("#barcode", text, {//
      format: "CODE128"
    });

    /*
    for(let i=0;i<number; i++){
      let str= "#barcode" + i;
      console.log(str);
      JsBarcode(str, text, {//"#barcode"
          format: "CODE128"
      });

    }*/



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

    //this.generateBarcode(value);


  }
//



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






}
