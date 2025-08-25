import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TuttiprodottiRoutingModule } from './Tutti-Prodotti-routing.module';
import { TuttiprodottiComponent } from './Tutti-Prodotti.component';




@NgModule({
  declarations: [
    TuttiprodottiComponent,

  ],
  imports: [
    CommonModule,
    TuttiprodottiRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class TuttiprodottiModule { }
