import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarellooComponent } from './carelloo.component';

const routes: Routes = [{ path: '', component: CarellooComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarellooRoutingModule { }
