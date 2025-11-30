import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { FormsModule } from '@angular/forms';
import { ProjectsComponent } from './components/projects/projects.component';
import { MuestrasComponent } from './components/muestras/muestras.component';
import { AppRoutingModule } from '../app-routing.module';
import { LOAD_WASM, NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { RouterModule } from '@angular/router';
import { ClientComponent } from './client.component';
import { MuestrasAllComponent } from './components/muestras-all/muestras-all.component';
import { MuestrasInfoComponent } from './components/muestras-info/muestras-info.component';
import { UnidadProduccionAllComponent } from './components/unidad-produccion-all/unidad-produccion-all.component';
import { UnidadProduccionInfoComponent } from './components/unidad-produccion-info/unidad-produccion-info.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilEditComponent } from './components/perfil-edit/perfil-edit.component';

//LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res))

@NgModule({
  declarations: [
    ClientComponent,
    ProjectsComponent,
    MuestrasComponent,
    MuestrasAllComponent,
    MuestrasInfoComponent,
    UnidadProduccionAllComponent,
    UnidadProduccionInfoComponent,
    PerfilComponent,
    PerfilEditComponent
  ],
  imports: [
    ClientRoutingModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    NgxScannerQrcodeModule,
    RouterModule
  ]
})
export class ClientModule { }
