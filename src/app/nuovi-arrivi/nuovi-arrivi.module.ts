import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuoviArriviRoutingModule } from './nuovi-arrivi-routing.module';
import { NuoviArriviComponent } from './nuovi-arrivi.component';


@NgModule({
  declarations: [
    NuoviArriviComponent
  ],
  imports: [
    CommonModule,
    NuoviArriviRoutingModule
  ]
})
export class NuoviArriviModule { }
