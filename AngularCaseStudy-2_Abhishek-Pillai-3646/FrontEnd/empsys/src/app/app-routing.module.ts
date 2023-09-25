import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpformComponent } from './empform/empform.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthGuard } from 'src/auth.guard';

const routes: Routes = [
  {path:'login',component:LoginComponent,loadChildren:()=>import('./login/login.module').then(p=>p.LoginModule)},
  {path:'empform',component:EmpformComponent,loadChildren:()=>import('./empform/empform.module').then(p=>p.EmpformModule)},
  {path:'welcome',component:WelcomeComponent,loadChildren:()=>import('./welcome/welcome.module').then(p=>p.WelcomeModule),canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
