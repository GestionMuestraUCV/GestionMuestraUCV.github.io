import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MuestrasComponent } from '../shared/components/muestras/muestras.component';
import { BarcodeComponent } from '../shared/components/barcode/barcode.component';
import { MuestrasNewComponent } from '../shared/components/muestras-new/muestras-new.component';
import { ScanComponent } from '../shared/components/scan/scan.component';
import { MuestrasEditComponent } from '../shared/components/muestras-edit/muestras-edit.component';
import { MuestrasInfoComponent } from '../shared/components/muestras-info/muestras-info.component';
import { MuestrasAllComponent } from '../shared/components/muestras-all/muestras-all.component';
import { UnidadProduccionComponent } from '../shared/components/unidad-produccion/unidad-produccion.component';
import { UnidadProduccionNewComponent } from '../shared/components/unidad-produccion-new/unidad-produccion-new.component';
import { UnidadProduccionEditComponent } from '../shared/components/unidad-produccion-edit/unidad-produccion-edit.component';
import { UnidadProduccionInfoComponent } from '../shared/components/unidad-produccion-info/unidad-produccion-info.component';
import { ClientsComponent } from '../shared/components/clients/clients.component';
import { ClientsNewComponent } from '../shared/components/clients-new/clients-new.component';
import { UnidadProduccionAllComponent } from '../shared/components/unidad-produccion-all/unidad-produccion-all.component';
import { ClientsEditComponent } from '../shared/components/clients-edit/clients-edit.component';
import { ClientsInfoComponent } from '../shared/components/clients-info/clients-info.component';
import { BarcodeCantidadComponent } from '../shared/components/barcode-cantidad/barcode-cantidad.component';
import { BarcodeNewComponent } from '../shared/components/barcode-new/barcode-new.component';
import { ResultadosComponent } from '../shared/components/resultados/resultados.component';
import { LandComponent } from './components/land/land.component';
import { AuthGuard } from '../services/guard';

const routes: Routes = [
  {
    path:'user', component: UserComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children:[
    {path: 'barcode/:id', component:BarcodeComponent},
    {path: 'barcode-cantidad/:id', component:BarcodeCantidadComponent},
    {path: 'barcode-new', component:BarcodeNewComponent},
    {path: 'muestras/:up', component:MuestrasComponent}, ///:id/:up
    {path: 'muestras-new/:id', component:MuestrasNewComponent},
    {path: 'muestras-edit/:id', component:MuestrasEditComponent},
    {path: 'muestras-info/:id', component:MuestrasInfoComponent},
    {path: 'muestras-all', component:MuestrasAllComponent},
    {path: 'unidad-produccion/:id', component:UnidadProduccionComponent},
    {path: 'unidad-produccion-new', component:UnidadProduccionNewComponent},
    {path: 'unidad-produccion-edit/:id', component:UnidadProduccionEditComponent},
    {path: 'unidad-produccion-info/:id', component:UnidadProduccionInfoComponent},
    {path: 'unidad-produccion-all', component:UnidadProduccionAllComponent},
    {path:'clients', component:ClientsComponent},
    {path:'clients-new', component:ClientsNewComponent},
    {path:'clients-edit/:id', component:ClientsEditComponent},
    {path:'clients-info/:id', component:ClientsInfoComponent},
    {path:'resultados', component:ResultadosComponent},
    {path:'land', component:LandComponent},
    {path: 'scan', component:ScanComponent}

  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
