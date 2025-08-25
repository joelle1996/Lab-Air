import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DettaglioModule } from '../dettaglio/dettaglio.module';
import { CarellooRoutingModule } from './carelloo-routing.module';
import { CarellooComponent } from './carelloo.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CarellooComponent,

  ],
  imports: [
    CommonModule,
    CarellooRoutingModule,
    DettaglioModule,
    FormsModule
  ]
})
export class CarellooModule { }
