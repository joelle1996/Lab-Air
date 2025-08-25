import { Component, OnInit } from '@angular/core';
import { Prodotti } from '../../models/models';
import { ProdottiService } from '../../services/prodotti.service';
import { ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-vetrina',
  templateUrl: './vetrina.component.html',
  styleUrl: './vetrina.component.css'
})
export class VetrinaComponent implements OnInit {


  LarghezzaSchermo: number = window.innerWidth


  InputUtente: string = ''
  ProdottiFiltrati: Prodotti[] = []
  Prodotti: Prodotti[] = []
  NuoviArrivi: Prodotti[] = []
  SlideCorrente = 0

  constructor(private ps: ProdottiService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    // PRODOTTI DELLA RICERCA RECUPERATI DAL LOCAL STORAGE NELL'INIZIAZIONE DEL COMPONENTE

    this.ps.RecuperaProdotti()




    const resizeObserver = new ResizeObserver(() => {


      this.LarghezzaSchermo = window.innerWidth

      if (this.LarghezzaSchermo < 1000) {

        this.SlideCorrente = this.SlideCorrente
        this.cdr.detectChanges();
      }
      if (this.LarghezzaSchermo >= 1000 && this.SlideCorrente > 1) {

        this.SlideCorrente = 1
        this.cdr.detectChanges();
      }
    })



    resizeObserver.observe(document.body);



    //////  CHIAMATA SERVIZIO API E FILTRAGGIO PRODOTTI CASUALI(TRAMITE ID IN 'IdVetrina') PER CAROSELLO IMMAGINI NEI CONSIGLIATI

    this.ps.getProdotti().subscribe({

      next: (dati: Prodotti[]) => {

        const idVetrina = ["1", "3", "8", "11"]

        this.Prodotti = dati.filter(p => idVetrina.includes(p.id))
      },

      error: (err: any) => console.error('Errore durante la ricerca', err),
      complete: () => console.log('Ricerca completata')

    });


    ////// SOTTOSCRIZIONE AI SUBJECT DEL SERVIZIO CHE RESTITUIRANNO I PRODOTTI GIA FILTRATI DALLA RICERCA E IL TESTO INSERITO DALL'UTENTE


    this.ps.ProdFiltrati$.subscribe(prodotti => {
      this.ProdottiFiltrati = prodotti

    })

    this.ps.InputUtente$.subscribe(value => {
      this.InputUtente = value

    })


  }

  // FUNZIONE PER PULSANTI DI SCORRIMENT0 DEI PRODOTTI CONSIGLIATI CAROSELLO IMMAGINI

  Successiva() {

    this.SlideCorrente = this.SlideCorrente + 1

  }

  Precedente() {

    this.SlideCorrente = this.SlideCorrente - 1

  }

}






