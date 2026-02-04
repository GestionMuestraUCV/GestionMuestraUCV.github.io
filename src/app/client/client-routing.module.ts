import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MuestrasComponent } from './components/muestras/muestras.component';
import { MuestrasAllComponent } from './components/muestras-all/muestras-all.component';
import { UnidadProduccionAllComponent } from './components/unidad-produccion-all/unidad-produccion-all.component';
import { UnidadProduccionInfoComponent } from './components/unidad-produccion-info/unidad-produccion-info.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PerfilEditComponent } from './components/perfil-edit/perfil-edit.component';
import { MuestrasInfoComponent } from './components/muestras-info/muestras-info.component';
import { LandClientComponent } from './components/land-client/land.component';
import { AuthGuard } from '../services/guard';

const routes: Routes = [
  {
    path:'client', component: ClientComponent,canActivate: [AuthGuard], canActivateChild: [AuthGuard], children:[
    {path: 'projects', component: ProjectsComponent},
    {path: 'muestras-all', component: MuestrasAllComponent},
    {path: 'muestras/:up', component: MuestrasComponent},
    {path: 'unidad-produccion-all', component: UnidadProduccionAllComponent},
    {path: 'muestras-info/:id', component: MuestrasInfoComponent},
    {path: 'unidad-produccion-info/:id', component: UnidadProduccionInfoComponent},
    {path: 'perfil', component: PerfilComponent},
    {path: 'perfil-edit', component: PerfilEditComponent},
    {path: 'land', component:LandClientComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }

//unidad-produccion-info
