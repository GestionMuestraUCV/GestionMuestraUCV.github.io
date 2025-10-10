import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { MuestrasComponent } from './components/muestras/muestras.component';
import { UsersComponent } from './components/users/users.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {
    path:'admin', component: AdminComponent, children:[
    {path: 'users', component: UsersComponent},
    {path: 'user-new', component: UserNewComponent},
    {path: 'user-edit/:id', component: UserEditComponent},
    {path: 'muestras', component: MuestrasComponent}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


