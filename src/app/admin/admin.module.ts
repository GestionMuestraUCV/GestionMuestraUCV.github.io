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
import { ScanComponent } from '../shared/components/scan/scan.component';
import { BarcodeComponent } from '../shared/components/barcode/barcode.component';
import { MuestrasAllComponent } from '../shared/components/muestras-all/muestras-all.component';
import { ResultadosComponent } from '../shared/components/resultados/resultados.component';
import { ClientsComponent } from '../shared/components/clients/clients.component';
import { BarcodeNewComponent } from '../shared/components/barcode-new/barcode-new.component';
import { UnidadProduccionAllComponent } from '../shared/components/unidad-produccion-all/unidad-produccion-all.component';
import { MuestrasNewComponent } from '../shared/components/muestras-new/muestras-new.component';
import { MuestrasEditComponent } from '../shared/components/muestras-edit/muestras-edit.component';
import { MuestrasInfoComponent } from '../shared/components/muestras-info/muestras-info.component';
import { ClientsNewComponent } from '../shared/components/clients-new/clients-new.component';
import { ClientsEditComponent } from '../shared/components/clients-edit/clients-edit.component';
import { ClientsInfoComponent } from '../shared/components/clients-info/clients-info.component';
import { UnidadProduccionNewComponent } from '../shared/components/unidad-produccion-new/unidad-produccion-new.component';
import { UnidadProduccionEditComponent } from '../shared/components/unidad-produccion-edit/unidad-produccion-edit.component';
import { UnidadProduccionInfoComponent } from '../shared/components/unidad-produccion-info/unidad-produccion-info.component';
import { MuestrasComponent } from '../shared/components/muestras/muestras.component';
import { BarcodeCantidadComponent } from '../shared/components/barcode-cantidad/barcode-cantidad.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserEditComponent,
    UserNewComponent,
    //ScanComponent,
    /*BarcodeComponent,
    BarcodeCantidadComponent,
    MuestrasComponent,
    MuestrasAllComponent,
    MuestrasNewComponent,
    MuestrasEditComponent,
    MuestrasInfoComponent,*/
    /*ResultadosComponent,
    ClientsComponent,
    ClientsNewComponent,
    ClientsEditComponent,
    BarcodeNewComponent,
    ClientsInfoComponent,
    UnidadProduccionAllComponent,
    UnidadProduccionNewComponent,
    UnidadProduccionEditComponent,
    UnidadProduccionInfoComponent*/

  ],
  imports: [
    AdminRoutingModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxScannerQrcodeModule,
    SharedModule,
    RouterModule
  ]
})
export class AdminModule {
  public Hello(){
    //console.log("hello")
  }

}
