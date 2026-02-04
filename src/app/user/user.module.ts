import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { FormsModule } from '@angular/forms';;

import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';
import { SafePipe } from './safe.pipe';

import {MatTooltipModule} from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


//import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


//LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res))




@NgModule({
  declarations: [
    UserComponent,
    SafePipe

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
