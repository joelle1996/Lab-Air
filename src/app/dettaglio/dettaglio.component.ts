import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProdottiService } from '../services/prodotti.service';
import { Prodotti } from '../models/models';
import { ActivatedRoute } from '@angular/router';
import { ProdottiSelezionati } from '../models/models';
import { CarrelloService } from '../services/carrello.service';


@Component({
  selector: 'app-dettaglio',
  templateUrl: './dettaglio.component.html',
  styleUrl: './dettaglio.component.css'
})

export class DettaglioComponent implements OnInit, OnDestroy {

  prodotto?: Prodotti

  // VARIABILE UTILE PER IL MODAL
  UltimoProdotto: ProdottiSelezionati | null = null
  CarrelloClick: boolean = false


  coloreSelezionato: string = ""
  tagliaSelezionata: string = ""

  EsaurimentoProd?: boolean






  constructor(public Ps: ProdottiService, public Cs: CarrelloService,
    private route: ActivatedRoute) { }






  ngOnInit(): void {

    // VARIABILE BOOLEANA CHE CAMBIA A SECONDA DEL SUBJECT DEL SERVIZIO,SE LA QUANTITA DEL PRODOTTO SARÀ SUPERIORE A 5 RESTIUIRÀ TRUE

    this.Cs.EsaurimentoProd$.subscribe(v => this.EsaurimentoProd = v!)



    // CHIAMATA API PASSANDO L'ID DEL PRODOTTO AL SERVIZIO

    const observer = {
      next: (dato: Prodotti) => { this.prodotto = dato; },
      err: (err: any) => console.error('Errore', err),
      complete: () => console.log('operazione completata')
    }



    const id = this.route.snapshot.paramMap.get('id')

    this.Ps.getProdotto(id!).subscribe(observer)

  }






  // FUNZIONE PER L'INSERIMENTO DEL PRODOTTO NEL CARRELLO
  AggiungiCarrello() {


    if (this.coloreSelezionato && this.tagliaSelezionata) {


      // DEFINIZIONE CHIAVE VALORE DEL PRODOTTO E CON COLORE E TAGLIA SELEZIONATE
      const ProdottoSelezionato: ProdottiSelezionati = {

        ...this.prodotto!,
        colore: this.coloreSelezionato,
        taglia: this.tagliaSelezionata,
        quantita: 1
      }


      this.UltimoProdotto = ProdottoSelezionato
      this.CarrelloClick = true


      // COMPORTAMENTO DEL MODAL ALL'INSERIMENTO DEL MODAL
      document.body.style.overflow = 'hidden'
      window.scrollTo({ top: 0, behavior: 'instant' });

      document.body.classList.add('disable-interaction');


      setTimeout(() => {
        this.CarrelloClick = false;
        document.body.style.overflow = 'auto'
        document.body.classList.remove('disable-interaction');
      }, 5000)


      // PASSAGGIO DEL PRODOTTO SELEZIONATO COME PARAMETRO AL SERVIZIO E AGGIORNAMENTO DEL PREZZO TOTALE
      this.Cs.aggiungiProdotti(ProdottoSelezionato)
      this.Cs.AggiornaTotale()




    }

  }






  // FUNZIONE PER LA GESTIONE DELLA CHIUSURA DEL MODAL
  ChiudiModal(event: MouseEvent) {


    this.CarrelloClick = false
    document.body.style.overflow = 'auto'
    document.body.classList.remove('disable-interaction');

  }

  StopPropagation(event: MouseEvent) {

    event.stopPropagation()
  }




  // PULIZIA ALLA DISTRUZIONE DEL COMPONENTE
  ngOnDestroy(): void {

    document.body.style.overflow = 'auto'
    document.body.classList.remove('disable-interaction');

  }







}