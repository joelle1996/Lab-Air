import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuttiprodottiComponent } from './Tutti-Prodotti.component';

const routes: Routes = [
  { path: '', component: TuttiprodottiComponent },
  { path: 'Dettaglio/:id', loadChildren: () => import('../dettaglio/dettaglio.module').then(m => m.DettaglioModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TuttiprodottiRoutingModule { }
