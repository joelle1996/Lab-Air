import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetodoPagamentoComponent } from './metodo-pagamento.component';

const routes: Routes = [{ path: '', component: MetodoPagamentoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetodoPagamentoRoutingModule { }
