import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentooRoutingModule } from './pagamentoo-routing.module';
import { PagamentooComponent } from './pagamentoo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PagamentooComponent
  ],
  imports: [
    CommonModule,
    PagamentooRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class PagamentooModule { }
