import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';



const loginroutes:Routes=[
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent}
]
@NgModule({
  imports:[RouterModule.forChild(loginroutes)],
  exports:[RouterModule]
})
export class LoginRoutingModule { }
