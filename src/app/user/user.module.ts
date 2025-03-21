import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectNewComponent } from './components/project-new/project-new.component';
import { FormsModule } from '@angular/forms';
import { MuestrasComponent } from './components/muestras/muestras.component';
import { MuestrasNewComponent } from './components/muestras-new/muestras-new.component';
import { ScanComponent } from './components/scan/scan.component';
import { BarcodeComponent } from './components/barcode/barcode.component';

import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { SafePipe } from './safe.pipe';
import { MuestrasEditComponent } from './components/muestras-edit/muestras-edit.component';
import { ProjectEditComponent } from './components/project-edit/project-edit.component';
import { MuestrasInfoComponent } from './components/muestras-info/muestras-info.component';
import { MuestrasAllComponent } from './components/muestras-all/muestras-all.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { UnidadProduccionNewComponent } from './components/unidad-produccion-new/unidad-produccion-new.component';
import { UnidadProduccionEditComponent } from './components/unidad-produccion-edit/unidad-produccion-edit.component';
import { UnidadProduccionInfoComponent } from './components/unidad-produccion-info/unidad-produccion-info.component';
import { UnidadProduccionComponent } from './components/unidad-produccion/unidad-produccion.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsNewComponent } from './components/clients-new/clients-new.component';
import { ClientsEditComponent } from './components/clients-edit/clients-edit.component';
import { ClientsInfoComponent } from './components/clients-info/clients-info.component';
import { UnidadProduccionAllComponent } from './components/unidad-produccion-all/unidad-produccion-all.component';
import { BarcodeNewComponent } from './components/barcode-new/barcode-new.component';

import {MatTooltipModule} from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


//import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


//LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res))




@NgModule({
  declarations: [
    UserComponent,
    ProjectsComponent,
    ProjectNewComponent,
    MuestrasComponent,
    MuestrasNewComponent,
    ScanComponent,
    BarcodeComponent,
    SafePipe,
    MuestrasEditComponent,
    ProjectEditComponent,
    MuestrasInfoComponent,
    MuestrasAllComponent,
    ProjectInfoComponent,
    UnidadProduccionComponent,
    UnidadProduccionNewComponent,
    UnidadProduccionEditComponent,
    UnidadProduccionInfoComponent,
    ClientsComponent,
    ClientsNewComponent,
    ClientsEditComponent,
    BarcodeNewComponent,
    ClientsInfoComponent,
    UnidadProduccionAllComponent,

  ],
  providers: [provideNativeDateAdapter(),DatePipe],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    NgxScannerQrcodeModule,
    MatTooltipModule
    //MatNativeDateModule,
    //MatDatepickerModule
  ]
})
export class UserModule { }
