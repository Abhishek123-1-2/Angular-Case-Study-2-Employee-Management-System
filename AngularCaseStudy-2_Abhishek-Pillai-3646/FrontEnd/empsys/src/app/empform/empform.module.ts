import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpformComponent } from './empform.component';
import { EmpFormRoutingModule } from './empform-routing.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [EmpformComponent],
  imports: [
    CommonModule,EmpFormRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule
  ],providers:[],
  bootstrap:[EmpformComponent]
})
export class EmpformModule { }
