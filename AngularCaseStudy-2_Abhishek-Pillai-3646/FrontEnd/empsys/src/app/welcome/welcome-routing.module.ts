import { NgModule } from "@angular/core";
import { Route, RouterModule, Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome.component";





const welcomeroutes:Routes=[
    {path:'',component:WelcomeComponent},
    {path:'welcome',component:WelcomeComponent}
]
@NgModule({
imports:[RouterModule.forChild(welcomeroutes)],
exports:[RouterModule]
}
)

export class WelcomeRoutingModule{}