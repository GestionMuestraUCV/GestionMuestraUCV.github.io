import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


//import { FormsModule } from '@angular/forms';
//import { BrowserModule } from '@angular/platform-browser';

import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

//import { SafePipe } from './safe.pipe';
//import { ScanComponent } from './scan.component';

 LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res))
 //LOAD_WASM('./assets/wasm/index.js').subscribe();



@NgModule({
  declarations: [],
  imports: [
    NgxScannerQrcodeModule,
    CommonModule
  ]
})
export class ScanModule { }
