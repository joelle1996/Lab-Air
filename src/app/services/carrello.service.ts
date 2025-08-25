import { Injectable } from '@angular/core';
import { ProdottiSelezionati } from '../models/models';
import { BehaviorSubject } from 'rxjs';
import { DatiUtente } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class CarrelloService {

  private key = 'carrello'



  constructor() { }


  // SUBJECT PER LIMITARE L INSERIMENTO DELLO STESSO PRODOTTO PIU DI 5 VOLTE
  public EsaurimentoProd = new BehaviorSubject<boolean | null>(null)
  EsaurimentoProd$ = this.EsaurimentoProd.asObservable()



  // SUBJECT PER IL RIEPILOGO DEI PRODOTTI
  public ArrayRiepilogoProd = new BehaviorSubject<ProdottiSelezionati[]>([])
  ArrayRiepilogoProd$ = this.ArrayRiepilogoProd.asObservable()




  // SUBJECT PER IL TOTALE DEL PREZZO
  public TotalePrezzo = new BehaviorSubject<number>(0)
  TotalePrezzo$ = this.TotalePrezzo.asObservable()




  // SUBJECT DEI DATI DEL FORM 'OPZIONI DI CONSEGNA'
  public DatiForm = new BehaviorSubject<DatiUtente | null>(null)
  DatiForm$ = this.DatiForm.asObservable()








  // AGGIUNTA PRODOTTI CARRELLO

  aggiungiProdotti(ProdottiSelezionati: ProdottiSelezionati) {

    // CONTROLLO DEL PRODOTTO DE RISULTA GIA NEL CARRELLO
    const carrello = this.recuperaCarrello()

    const ProdottoEsistente = carrello.find(
      prodotto =>
        prodotto.id === ProdottiSelezionati.id &&
        prodotto.colore === ProdottiSelezionati.colore &&
        prodotto.taglia === ProdottiSelezionati.taglia
    )



    // SE IL PRODOTTO  RISULTA PRESENTE NE AUMENTERTÀ SOLO LA QUANTITÀ E NON VERRÀ AGGIUNTO LO STESSO OGGETTO DEL PRODOTTO

    if (ProdottoEsistente) {

      ProdottoEsistente.quantita += 1

      this.EsaurimentoProd.next(false)


      // SE LA QUANTITÀ RISULTA SUPERIORE A 5 IL PRODOTTO VERRÀ SEGNALATO COME ESAURITO (EsaurimentoProd=TRUE)
      if (ProdottoEsistente.quantita > 5) {

        this.EsaurimentoProd.next(true)


        return
      }
    }


    // ALTRIMENTI SE NON RISULTA PRESENTE VIENE INSERITO NEL CARRELLO
    else {

      carrello.push(ProdottiSelezionati)
      this.EsaurimentoProd.next(false)


    }

    this.salvaCarrello(carrello)


    // console.log(carrello);


  }







  // RIMOZIONE DEL PRODOTTO SELEZIONATO CHE CORRISPONDE AL PRODOTTO CONTENUTO NEL CARRELLO

  rimuoviProdotto(prodottoSelezionato: ProdottiSelezionati) {

    let carrello = this.recuperaCarrello();

    const indiceProdotto = carrello.findIndex(prodotto =>
      prodotto.id === prodottoSelezionato.id &&
      prodotto.colore === prodottoSelezionato.colore &&
      prodotto.taglia === prodottoSelezionato.taglia
    );


    if (indiceProdotto !== -1) {


      carrello.splice(indiceProdotto, 1);

      this.salvaCarrello(carrello);

    }

  }







  // AGGIORNAMENTO QUANTITÀ DEL PRODOTTO

  AggiornaQuantita(Prod: ProdottiSelezionati, NuovaQuantita: number) {

    const Carrello = this.recuperaCarrello()

    const prodotto = Carrello.find(prodotto =>
      prodotto.id == Prod.id &&
      prodotto.colore == Prod.colore &&
      prodotto.taglia == Prod.taglia
    )




    if (prodotto) {

      prodotto.quantita = Number(NuovaQuantita)


      this.salvaCarrello(Carrello)
    }



  }












  // PASSAGGIO DEI PRODOTTI AL SUBJECT 'RIEPILOGOPROD'

  RiepilogoProd() {

    this.ArrayRiepilogoProd.next(this.recuperaCarrello())

    this.salvaCarrello(this.recuperaCarrello())

  }





  // AGGIORNAMENTO PREZZO TOTALE

  AggiornaTotale() {

    const carrello = this.recuperaCarrello();

    const totale = carrello.reduce((accumulatore, prodotto) => {

      return accumulatore + prodotto.prezzo * prodotto.quantita;

    }, 0);



    this.salvaCarrello(carrello)


    this.TotalePrezzo.next(totale);


  }







  // MEMORIZZARE I PRODOTTI DEL CARRELLO NEL LOCAL STORAGE

  salvaCarrello(carrello: ProdottiSelezionati[]) {
    localStorage.setItem(this.key, JSON.stringify(carrello));
  }


  // RECUPERARE I PRODOTTI DEL CARRELLO DAL LOCAL STORAGE

  recuperaCarrello(): ProdottiSelezionati[] {

    const carrello = localStorage.getItem(this.key);
    return carrello ? JSON.parse(carrello) : [];
  }





  //  DATI DEL FORM 'OPZIONI CONSEGNA' SALVATI NELLO STORAGE

  inviaDati(datiForm: DatiUtente) {

    localStorage.setItem('datiForm', JSON.stringify(datiForm))


  }





  // DATI DEL FORM 'OPZIONI CONSEGNA' RECUPERATI DALLO STORAGE E PASSATI AL SUBJECT


  RecuperaDatiForm() {

    const datiForm = localStorage.getItem('datiForm')

    const datijson = datiForm ? JSON.parse(datiForm) : null

    this.DatiForm.next(datijson)



  }


}