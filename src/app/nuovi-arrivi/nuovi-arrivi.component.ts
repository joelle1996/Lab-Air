import { Component, OnInit } from '@angular/core';
import { Prodotti } from '../models/models';
import { ProdottiService } from '../services/prodotti.service';

@Component({
  selector: 'app-nuovi-arrivi',
  templateUrl: './nuovi-arrivi.component.html',
  styleUrl: './nuovi-arrivi.component.css'
})
export class NuoviArriviComponent implements OnInit {


  ProdNuoviArrivi: Prodotti[] = []


  constructor(public Ps: ProdottiService) {

  }


  ngOnInit(): void {
    // CHIAMATA DEI PRODOTTI E FILTRAGGIO SU NUOVI ARRIVI

    this.Ps.getProdotti().subscribe({

      next: (dati: Prodotti[]) => {
        this.ProdNuoviArrivi = dati.filter(p => p.nuovo_arrivi);
        console.log(this.ProdNuoviArrivi)
      },
      error: (err: any) => console.error('Errore', err),
      complete: () => console.log('Ricerca completata')

    })




  }








}
