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

  }

  ngOnInit(): void {
    this.route.params.subscribe(param =>{
      this.item=param;
      console.log(param);
      this.generateBarcode(param);

    })


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

    window.print();
  }

}
