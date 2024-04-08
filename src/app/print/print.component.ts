import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent {
  public item: any;

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore) {
    /*this.generateBarcode(this.item);
    window.print();*/

    /*this.sleep(3000);
    window.print();*/
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(param =>{
      this.item=param;
      console.log(param);
      this.generateBarcode(param);

      /*this.sleep(1000);
      window.print();
      */

    })
    await this.sleep(500);
    window.print();


  }

  async sleep(ms: number): Promise<void> {
    return new Promise(
        (resolve) => setTimeout(resolve, ms));
  }


  generateBarcode(value: any){
    var text = value.id;
    let number =value.num;

    JsBarcode("#barcode", text, {
        format: "CODE128"
    });


    for(let i=1;i<number; i++){
      let str= "#barcode" + i;
      console.log(str);
      JsBarcode(str, text, {//"#barcode"
          format: "CODE128"
      });

    }

    /*this.sleep(10000);

    window.print();*/
  }

}
