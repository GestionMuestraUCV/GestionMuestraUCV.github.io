import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-barcode-cantidad',
  templateUrl: './barcode-cantidad.component.html',
  styleUrl: './barcode-cantidad.component.css'
})
export class BarcodeCantidadComponent {
  public data: any = []
  public res: any;
  public item: any;

  constructor(private router: Router, private route: ActivatedRoute, public auth: Auth, public firestore: Firestore) {

  }

  ngOnInit(): void {
    let code;
    this.route.params.subscribe((param: { [x: string]: any; }) =>{
      this.item=param['id'];
      code=param['id'];
      //this.pid=param['id'];

      console.log(param);
      console.log(param['id']);
      this.generateBarcode(code);

    })
    //this.getData();
    //this.MyQuery();

  }

  generateBarcode(value: any){
    //var text = value.txt_input;
    var text = value;
    console.log(value);
    console.log(text);
    this.res=text;

        JsBarcode("#barcode", text, {
            format: "CODE128"
        });
  }

  toPrint(){
    //this.router.navigate(['/print/'+ this.res]);
    window.open('/print/' + this.res, '_blank');

  }


}
