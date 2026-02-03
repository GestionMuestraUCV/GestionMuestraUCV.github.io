

import { SharedRoutingModule } from './shared-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { RouterModule } from '@angular/router';
import { ScanComponent } from './components/scan/scan.component';



@NgModule({
  declarations: [

  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxScannerQrcodeModule,
    RouterModule
  ]
})
export class SharedModule  {
  public Hello(){
    console.log("hello")
  }

}
