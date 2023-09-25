import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { EmpformComponent } from "./empform.component";





const empformroutes:Routes=[
    {path:'',component:EmpformComponent},
    {path:'empform',component:EmpformComponent}
]
@NgModule({
imports:[RouterModule.forChild(empformroutes)],
exports:[RouterModule]
}
)

export class EmpFormRoutingModule{}