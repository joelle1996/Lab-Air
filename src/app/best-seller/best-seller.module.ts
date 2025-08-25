import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BestSellerRoutingModule } from './best-seller-routing.module';
import { BestSellerComponent } from './best-seller.component';


@NgModule({
  declarations: [
    BestSellerComponent
  ],
  imports: [
    CommonModule,
    BestSellerRoutingModule
  ]
})
export class BestSellerModule { }
