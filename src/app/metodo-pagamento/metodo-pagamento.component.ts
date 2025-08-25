import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarrelloService } from '../services/carrello.service';
import { DatiUtente } from '../models/models';
import { Router } from '@angular/router';



@Component({
  selector: 'app-metodo-pagamento',
  templateUrl: './metodo-pagamento.component.html',
  styleUrl: './metodo-pagamento.component.css'
})





export class MetodoPagamentoComponent implements OnInit {

  form: FormGroup
  metodo: string = 'carta'
  DatiUtente: DatiUtente | null = null
  totale?: number
  VerificaOrdine: boolean = false



  // FORM PER LA COMPILAZIONE DEI DATI DI PAGAMENTO CON CARTA DI CREDITO

  constructor(private Cs: CarrelloService, private route: Router) {

    this.form = new FormGroup({


      numero: new FormControl('', [Validators.required, Validators.minLength(16),
      Validators.pattern(/^\d{16}$/)]),

      data: new FormControl('', Validators.required),


      cvv: new FormControl('', [Validators.required, Validators.minLength(3),
      Validators.pattern(/^\d+$/)]),


    })




  }

  ngOnInit(): void {


    // CHIAMATA DEL SERVIZIO E SOTTOSCRIZIONE PER OTTENERE I DATI INSERITI NEL FORM DI OPZIONI DI CONSEGNA
    this.Cs.RecuperaDatiForm()
    this.Cs.DatiForm$.subscribe(v => { this.DatiUtente = v })
    this.Cs.AggiornaTotale()

    //  SOTTOSCRIZIONE PER OTTENERE IL TOTALE DEL PREZZO
    this.Cs.TotalePrezzo$.subscribe(t => {
      this.totale = t;
      // CONDIZIONE PER RIMANDARE ALLA PAGINA DEL CARRELLO NEL CASO I PRODOTTI VENGANO RIMOSSI
      if (this.totale === 0) {

        this.route.navigate(['/Carrello']);
      }
    })
  }




  // CONDIZIONE PER MOSTRARE LA SEZIONE 'VERIFICA ORDINE'
  Verifica() {
    this.VerificaOrdine = true
  }



}
