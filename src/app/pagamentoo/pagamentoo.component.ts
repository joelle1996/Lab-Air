import { Component, OnInit } from '@angular/core';
import { ProdottiSelezionati } from '../models/models';
import { CarrelloService } from '../services/carrello.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatiUtente } from '../models/models';

@Component({
  selector: 'app-pagamentoo',
  templateUrl: './pagamentoo.component.html',
  styleUrl: './pagamentoo.component.css'
})

export class PagamentooComponent implements OnInit {

  RiepilogoProd?: ProdottiSelezionati[] = []
  TotalePrezzo?: number
  formConsegna: FormGroup

  constructor(private Cs: CarrelloService, private router: Router) {


    // ///////// FORM PER LE OPZIONI DI CONSEGNA

    this.formConsegna = new FormGroup({

      nome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/)]),

      cognome: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25), Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/)]),

      indirizzo: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),


      email: new FormControl('', [Validators.required,
      Validators.pattern(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm)]),

      tel: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20),
      Validators.pattern(/^\d+$/)]),

      cap: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5),
      Validators.pattern(/^\d+$/)]),

      citta: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\s']+$/)]),

      nazione: new FormControl({ value: 'italia', disabled: true })


    })









  }


  ngOnInit(): void {

    // CHIAMATA DEL SERVIZIO ALL'INIZIAZIONE DEL COMPONENTE PER FAR SI CHE VENGA AGGIORNATO IL TOTALE ED I PRODOTTI
    this.Cs.RiepilogoProd()
    this.Cs.AggiornaTotale()


    // SOTTOSCRIZIONE AI SUBJECT PER OTTENERE TOTALE E PRODOTTI INSERITI NEL CARRELLO
    this.Cs.TotalePrezzo$.subscribe(v => this.TotalePrezzo = v)

    this.Cs.DatiForm$.subscribe(d => this.formConsegna.patchValue(d!))



    // SOTTOSCRIZIONE AL SUBJECT PER OTTENERE IL RIEPILOGO DEI PRODOTTI SCELTI DALL'UTENTE

    const observer = {
      next: (dati: ProdottiSelezionati[]) => { this.RiepilogoProd = dati; console.log(dati) },
      err: (err: any) => console.error('Errore', err),
      complete: () => console.log('operazione completata')
    }


    this.Cs.ArrayRiepilogoProd$.subscribe(observer)

    // CONDIZIONE PER RIMANDARE ALLA PAGINA DEL CARRELLO NEL CASO I PRODOTTI NON SIANO PIU PRESENTI NEL CARRELLO
    if (this.RiepilogoProd?.length === 0) {
      this.router.navigate(['/Carrello']);

    }




  }


  // INVIO DEI DATI DEL FORM PER FARNE UN RIEPILOGO NELLA SEZIONE 'METODO DI PAGAMENTO'
  inviaDati() {

    const DatiForm = this.formConsegna.getRawValue()

    this.Cs.inviaDati(DatiForm)
  }

}
