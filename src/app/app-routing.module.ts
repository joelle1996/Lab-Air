import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { VetrinaComponent } from './components/vetrina/vetrina.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'vetrina', component: VetrinaComponent },
  { path: 'TuttiProdotti', loadChildren: () => import('./Tutti-Prodotti/Tutti-Prodotti.module').then(m => m.TuttiprodottiModule) },
  { path: 'Dettaglio/:id', loadChildren: () => import('./dettaglio/dettaglio.module').then(m => m.DettaglioModule) },
  { path: 'Carrello', loadChildren: () => import('./carelloo/carelloo.module').then(m => m.CarellooModule) },
  { path: 'NuoviArrivi', loadChildren: () => import('./nuovi-arrivi/nuovi-arrivi.module').then(m => m.NuoviArriviModule) },
  { path: 'pagamentoo', loadChildren: () => import('./pagamentoo/pagamentoo.module').then(m => m.PagamentooModule) },
  { path: 'metodo-pagamento', loadChildren: () => import('./metodo-pagamento/metodo-pagamento.module').then(m => m.MetodoPagamentoModule) },
  { path: 'best-seller', loadChildren: () => import('./best-seller/best-seller.module').then(m => m.BestSellerModule) },
  { path: 'thank-you', loadChildren: () => import('./thank-you/thank-you.module').then(m => m.ThankYouModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
