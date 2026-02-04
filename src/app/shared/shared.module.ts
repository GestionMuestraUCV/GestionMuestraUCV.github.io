import { SharedRoutingModule } from './shared-routing.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { RouterModule } from '@angular/router';
import { ScanComponent } from './components/scan/scan.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { BarcodeCantidadComponent } from './components/barcode-cantidad/barcode-cantidad.component';
import { MuestrasComponent } from './components/muestras/muestras.component';
import { MuestrasAllComponent } from './components/muestras-all/muestras-all.component';
import { MuestrasNewComponent } from './components/muestras-new/muestras-new.component';
import { MuestrasEditComponent } from './components/muestras-edit/muestras-edit.component';
import { MuestrasInfoComponent } from './components/muestras-info/muestras-info.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { ClientsNewComponent } from './components/clients-new/clients-new.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsEditComponent } from './components/clients-edit/clients-edit.component';
import { BarcodeNewComponent } from './components/barcode-new/barcode-new.component';
import { ClientsInfoComponent } from './components/clients-info/clients-info.component';
import { UnidadProduccionAllComponent } from './components/unidad-produccion-all/unidad-produccion-all.component';
import { UnidadProduccionNewComponent } from './components/unidad-produccion-new/unidad-produccion-new.component';
import { UnidadProduccionEditComponent } from './components/unidad-produccion-edit/unidad-produccion-edit.component';
import { UnidadProduccionInfoComponent } from './components/unidad-produccion-info/unidad-produccion-info.component';



@NgModule({
  declarations: [
    ScanComponent,
    BarcodeComponent,
    BarcodeCantidadComponent,
    MuestrasComponent,
    MuestrasAllComponent,
    MuestrasNewComponent,
    MuestrasEditComponent,
    MuestrasInfoComponent,
    ResultadosComponent,
    ClientsComponent,
    ClientsNewComponent,
    ClientsEditComponent,
    BarcodeNewComponent,
    ClientsInfoComponent,
    UnidadProduccionAllComponent,
    UnidadProduccionNewComponent,
    UnidadProduccionEditComponent,
    UnidadProduccionInfoComponent

  ],
  imports: [
    SharedRoutingModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxScannerQrcodeModule,
    RouterModule
  ]
})
export class SharedModule  {
  public Hello(){
    //console.log("hello")
  }
}
