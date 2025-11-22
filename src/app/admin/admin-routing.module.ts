import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MuestrasComponent } from './components/muestras/muestras.component';
import { UsersComponent } from './components/users/users.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UnidadProduccionComponent } from './components/unidad-produccion/unidad-produccion.component';
import { MuestrasAllComponent } from './components/muestras-all/muestras-all.component';
import { BarcodeCantidadComponent } from './components/barcode-cantidad/barcode-cantidad.component';
import { BarcodeComponent } from './components/barcode/barcode.component';
import { BarcodeNewComponent } from './components/barcode-new/barcode-new.component';
import { UnidadProduccionAllComponent } from './components/unidad-produccion-all/unidad-produccion-all.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientsNewComponent } from '../user/components/clients-new/clients-new.component';
import { ClientsEditComponent } from '../user/components/clients-edit/clients-edit.component';
import { ClientsInfoComponent } from '../user/components/clients-info/clients-info.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { ScanComponent } from './components/scan/scan.component';

const routes: Routes = [
  {
    path:'admin', component: AdminComponent, children:[
    {path: 'users', component: UsersComponent},
    {path: 'user-new', component: UserNewComponent},
    {path: 'user-edit/:id', component: UserEditComponent},
    {path: 'muestras', component: MuestrasComponent},
    {path: 'muestras-all', component: MuestrasAllComponent},

    {path: 'barcode/:id', component:BarcodeComponent},
    {path: 'barcode-cantidad/:id', component:BarcodeCantidadComponent},
    {path: 'barcode-new', component:BarcodeNewComponent},

    {path: 'unidad-produccion-all', component:UnidadProduccionAllComponent},
    {path:'clients', component:ClientsComponent},
    {path:'clients-new', component:ClientsNewComponent},
    {path:'clients-edit/:id', component:ClientsEditComponent},
    {path:'clients-info/:id', component:ClientsInfoComponent},
    {path:'resultados', component:ResultadosComponent},
    {path: 'scan', component:ScanComponent}


  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


