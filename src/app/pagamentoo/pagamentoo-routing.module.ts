import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagamentooComponent } from './pagamentoo.component';

const routes: Routes = [{ path: '', component: PagamentooComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentooRoutingModule { }
