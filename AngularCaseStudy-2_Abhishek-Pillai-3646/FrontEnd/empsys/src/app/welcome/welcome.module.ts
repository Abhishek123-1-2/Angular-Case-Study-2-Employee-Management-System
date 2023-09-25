import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'


@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,WelcomeRoutingModule,ReactiveFormsModule,MatTableModule,MatIconModule
    ,MatButtonModule,MatCardModule,MatFormFieldModule,MatInputModule
  ]
})
export class WelcomeModule { }
