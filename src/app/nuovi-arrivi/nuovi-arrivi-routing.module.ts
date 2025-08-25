import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuoviArriviComponent } from './nuovi-arrivi.component';

const routes: Routes = [{ path: '', component: NuoviArriviComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuoviArriviRoutingModule { }
