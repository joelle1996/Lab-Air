import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DettaglioRoutingModule } from './dettaglio-routing.module';
import { DettaglioComponent } from './dettaglio.component';


@NgModule({
  declarations: [
    DettaglioComponent,

  ],
  imports: [
    CommonModule,
    DettaglioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DettaglioComponent]
})
export class DettaglioModule { }
