import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarrelloService } from '../services/carrello.service';
import { ProdottiSelezionati } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carelloo',
  templateUrl: './carelloo.component.html',
  styleUrl: './carelloo.component.css'
})
export class CarellooComponent implements OnInit, OnDestroy {


  ProdottiCarrello: ProdottiSelezionati[] = []
  TotalePrezzo: number = 0
  ModalOn: boolean = false

  constructor(public Cs: CarrelloService, private route: Router) { }



  ngOnInit(): void {

    // CHIAMATA PRODOTTI INSERITI NEL CARRELLO SALVATI NELLO STORAGE

    this.ProdottiCarrello = this.Cs.recuperaCarrello();

    // AGGIORNAMENTO TOTALE PREZZO E SOTTOSCRIZIONE AL SUBJECT PER OTTENERE IL PREZZO COMPLESSIVO
    this.Cs.AggiornaTotale()
    this.Cs.TotalePrezzo$.subscribe(v => this.TotalePrezzo = v)


  }


  // RIMOZIONE DEL PRODOTTO CON AGGIORNAMENTO DEL CONTENUTO DEL CARRELLO E IL TOTALE
  rimuoviProdotto(prodotto: ProdottiSelezionati) {
    this.Cs.rimuoviProdotto(prodotto);
    this.ProdottiCarrello = this.Cs.recuperaCarrello();
    this.Cs.AggiornaTotale()
  }




  AggiornaQuantita(prodotto: ProdottiSelezionati) {
    this.Cs.AggiornaQuantita(prodotto, prodotto.quantita)
    this.Cs.AggiornaTotale()


  }


  // APERTURA DEL MODAL CON SCROLL DISATTIVATO E INTERAZIONE CON ALTRI ELEMENTI DISATTIVATA
  apriModal() {
    this.ModalOn = true
    document.body.style.overflow = 'hidden'
    window.scrollTo({ top: 0, behavior: 'instant' });

    document.body.classList.add('disable-interaction');

  }


  // CHIUSURA MODAL E PULIZIA REGOLE IMPOSTATE ALL'ATTIVAZIONE DEL MODAL
  ChiudiModal(event: MouseEvent) {

    this.ModalOn = false
    document.body.style.overflow = 'auto'
    document.body.classList.remove('disable-interaction');

  }



  // FUNZIONE PER EVITARE LA CHIUSURA DEL MODAL CLICCANDO SUL CONTENUTO DEL MODAL
  StopPropagation(event: MouseEvent) {

    event.stopPropagation()
  }


  // PULIZIA REGOLE MODAL ALLA DISTRUZIONE DEL COMPONENTE
  ngOnDestroy(): void {

    document.body.style.overflow = 'auto'
    document.body.classList.remove('disable-interaction');


  }



}



