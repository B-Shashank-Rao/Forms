import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { TableComponent } from './table/table.component';
import {ProductComponent} from './product/product.component';
import {SearchComponent} from './search/search.component';
const routes: Routes = [
  {
   path:'' ,redirectTo: 'login', pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'table',
    component:TableComponent
  },
  {
    path:'product',
    component:ProductComponent
  },
  {
    path:'search',
    component:SearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
