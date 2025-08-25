import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../services/prodotti.service';
import { Prodotti } from '../models/models';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css'
})
export class BestSellerComponent implements OnInit {


  ProdBestSeller: Prodotti[] = []

  constructor(private Ps: ProdottiService) {

  }









  ngOnInit(): void {

    // CHIAMATA DEI PRODOTTI E FILTRAGGIO SU NUOVI ARRIVI

    this.Ps.getProdotti().subscribe({

      next: (dati: Prodotti[]) => {
        this.ProdBestSeller = dati.filter(p => p.best_seller > 3);
        console.log(this.ProdBestSeller)
      },
      error: (err: any) => console.error('Errore', err),
      complete: () => console.log('Ricerca completata')

    })



  }




}
