import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ScanComponent } from './components/scan/scan.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { MuestrasAllComponent } from './components/muestras-all/muestras-all.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { ClientsComponent } from './components/clients/clients.component';
import { BarcodeNewComponent } from './components/barcode-new/barcode-new.component';
import { UnidadProduccionAllComponent } from './components/unidad-produccion-all/unidad-produccion-all.component';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserEditComponent,
    UserNewComponent,
    ScanComponent,
    BarcodeComponent,
    MuestrasAllComponent,
    ResultadosComponent,
    ClientsComponent,
    BarcodeNewComponent,
    UnidadProduccionAllComponent

  ],
  imports: [
    AdminRoutingModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxScannerQrcodeModule,
    RouterModule
  ]
})
export class AdminModule {
  public Hello(){
    console.log("hello")
  }

}
