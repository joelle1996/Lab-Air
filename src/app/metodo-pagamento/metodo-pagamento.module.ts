import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetodoPagamentoRoutingModule } from './metodo-pagamento-routing.module';
import { MetodoPagamentoComponent } from './metodo-pagamento.component';


@NgModule({
  declarations: [
    MetodoPagamentoComponent
  ],
  imports: [
    CommonModule,
    MetodoPagamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MetodoPagamentoModule { }
