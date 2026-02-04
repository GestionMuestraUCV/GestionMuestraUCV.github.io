import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './components/users/users.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UnidadProduccionComponent } from '../shared/components/unidad-produccion/unidad-produccion.component';
import { MuestrasComponent } from '../shared/components/muestras/muestras.component';
import { MuestrasAllComponent } from '../shared/components/muestras-all/muestras-all.component';
import { MuestrasNewComponent } from '../shared/components/muestras-new/muestras-new.component';
import { MuestrasEditComponent } from '../shared/components/muestras-edit/muestras-edit.component';
import { MuestrasInfoComponent } from '../shared/components/muestras-info/muestras-info.component';
import { BarcodeCantidadComponent } from '../shared/components/barcode-cantidad/barcode-cantidad.component';
import { BarcodeComponent } from '../shared/components/barcode/barcode.component';
import { BarcodeNewComponent } from '../shared/components/barcode-new/barcode-new.component';
import { UnidadProduccionAllComponent } from '../shared/components/unidad-produccion-all/unidad-produccion-all.component';
import { ClientsComponent } from '../shared/components/clients/clients.component';
import { ClientsNewComponent } from '../shared/components/clients-new/clients-new.component';
import { ClientsEditComponent } from '../shared/components/clients-edit/clients-edit.component';
import { ClientsInfoComponent } from '../shared/components/clients-info/clients-info.component';
import { ResultadosComponent } from '../shared/components/resultados/resultados.component';
import { ScanComponent } from '../shared/components/scan/scan.component';
import { LandComponent } from './components/land/land.component';
import { AuthGuard } from '../auth/auth.guard';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  {
    path:'admin', component: AdminComponent, canActivate: [AdminGuard ], canActivateChild: [AdminGuard ], children:[
    {path: 'users', component: UsersComponent},
    {path: 'user-new', component: UserNewComponent},
    {path: 'user-edit/:id', component: UserEditComponent},
    {path: 'muestras/:up', component: MuestrasComponent},
    {path: 'muestras-all', component: MuestrasAllComponent},
    {path: 'muestras-new/:id', component:MuestrasNewComponent},
    {path: 'muestras-edit/:id', component:MuestrasEditComponent},
    {path: 'muestras-info/:id', component:MuestrasInfoComponent},

    {path: 'barcode/:id', component:BarcodeComponent},
    {path: 'barcode-cantidad/:id', component:BarcodeCantidadComponent},
    {path: 'barcode-new', component:BarcodeNewComponent},

    {path: 'unidad-produccion-all', component:UnidadProduccionAllComponent},
    {path:'clients', component:ClientsComponent},
    {path:'clients-new', component:ClientsNewComponent},
    {path:'clients-edit/:id', component:ClientsEditComponent},
    {path:'clients-info/:id', component:ClientsInfoComponent},
    {path:'resultados', component:ResultadosComponent},
    {path: 'scan', component:ScanComponent},
    {path: 'land', component:LandComponent}


  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


