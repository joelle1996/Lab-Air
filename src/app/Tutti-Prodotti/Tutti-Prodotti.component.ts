import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../services/prodotti.service';
import { Prodotti } from '../models/models';


@Component({
  selector: 'app-tuttiprodotti',
  templateUrl: './Tutti-Prodotti.component.html',
  styleUrl: './Tutti-Prodotti.component.css'
})
export class TuttiprodottiComponent implements OnInit {



  prezzoMin?: boolean
  prezzoMax?: boolean

  CheckboxColore: string[] = []
  CheckboxCategoria: string[] = []


  categorie = ['running', 'basket', 'sneakers', 'training'];
  colori = ['bianco', 'nero', 'grigio', 'rosso', 'blu', 'verde', 'marrone'];


  Prodotti: Prodotti[] = []
  filterActive: boolean = false

  NessunRisultato: boolean = false



  constructor(public Ps: ProdottiService) { }


  ngOnInit(): void {

    // CHIAMATA PER OTTENERE TUTTI I PRODOTTI
    const observer = {
      next: (dati: Prodotti[]) => this.Prodotti = dati,
      err: (err: any) => console.error('Errore', err),
      complete: () => console.log('Richiesta completata')
    }



    // RECUPERO DELLO STATO CHECKBOX DALLO STORAGE

    const StatoSalvato = this.Ps.RecuperoStatoCheck()

    this.CheckboxCategoria = StatoSalvato.categoria || []

    this.CheckboxColore = StatoSalvato.colori || []

    this.prezzoMax = StatoSalvato.prezzomax

    this.prezzoMin = StatoSalvato.prezzomin





    const ProdottiSalvati = this.Ps.RecuperoProdStorage()


    // CONDIZIONE IN CUI I PRODOTTI SALVATI VENGONO VISUALIZZATI SE LE CHECKBOX RISULTANO SELEZIONATE,ALTRIMENTI VENGONO VISUALIZZATI TUTTI GLI ARTICOLI.

    if (Object.values(StatoSalvato).some(v => Array.isArray(v) ? v.length > 0 : Boolean(v))) {

      this.Prodotti = ProdottiSalvati
    }



    else {
      this.Ps.getProdotti().subscribe(observer)
    }



  }












  // FUNZIONI CON LA CONDIZIONE DI APRIRE E CHIUDERE IL MODAL DEL FILTRO
  filterOn() {
    if (!this.filterActive) {
      this.filterActive = true

    }
    else {
      this.filterActive = false
    }
  }

  closeFilter() {
    this.filterActive = false

  }








  changeChekbox(event: any) {

    const value = event.target.value.toLowerCase();



    // CONDIZIONE PER AGGIUNGERE O TOGLIERE IL VALORE DELLE CHECKBOX SELEZIONATE 
    if (event.target.checked) {


      if (this.colori.includes(value)) {

        this.CheckboxColore.push(value)

      }



      if (this.categorie.includes(value)) {

        this.CheckboxCategoria.push(value)

      }

    }

    else {

      if (this.colori.includes(value)) {
        this.CheckboxColore = this.CheckboxColore.filter(c => c !== value);
      }

      if (this.categorie.includes(value)) {
        this.CheckboxCategoria = this.CheckboxCategoria.filter(c => c !== value);

      }




    }


    // CHIAMATA DELLA FUNZIONE DEI PRODOTTI FILTRATI

    this.getProdottiFiltrati()




    // SALAVATAGGIO STATO DELLE CHECKBOX NELLO STORAGE

    const StatoCheckbox = {

      colori: this.CheckboxColore,
      categoria: this.CheckboxCategoria,
      prezzomax: this.prezzoMax,
      prezzomin: this.prezzoMin

    }


    this.Ps.SalvaCheckbox(StatoCheckbox)




  }











  getProdottiFiltrati() {




    this.Ps.getProdotti().subscribe(v => {



      this.Prodotti = v.filter(p => {


        // VARIABILE UTILE PER GESTIRE E POI RIPORTARE LE CONDIZIONI TRUE PER IL PREZZO

        const Prezzo = (this.prezzoMin && this.prezzoMax && p.prezzo > 100) || (this.prezzoMin && p.prezzo > 100 && p.prezzo <= 150) || (this.prezzoMax && p.prezzo > 150);






        // GESTIONE DELLA COMBINAZIONE DEI FILTRI 


        // CONDIZIONE NEL CASO TUTTI I FILTRI SONO APPLICATI 

        const MatchFilters = (this.prezzoMin || this.prezzoMax) && this.CheckboxCategoria.length > 0 && this.CheckboxColore.length > 0 ?


          (this.CheckboxCategoria.includes(p.categoria.toLowerCase())) &&


          this.CheckboxColore.every(coloreSelezionato =>


            p.colori_disponibili.map(c => c.toLowerCase()).includes(coloreSelezionato)) && (Prezzo) :




          // CONDIZIONE DOVE COLORE E CATEGORIA VENGONO SELEZIONATI

          this.CheckboxCategoria.length > 0 && this.CheckboxColore.length > 0 ? (this.CheckboxCategoria.includes(p.categoria.toLowerCase())) &&


            this.CheckboxColore.every(coloreSelezionato =>


              p.colori_disponibili.map(c => c.toLowerCase()).includes(coloreSelezionato)) :



            // CONDIZIONE IN CUI CATEGORIA E PREZZO VENGONO SELEZIONATI

            (this.prezzoMax || this.prezzoMin) && this.CheckboxCategoria.length > 0 ?

              this.CheckboxCategoria.includes(p.categoria.toLowerCase()) && (Prezzo) :




              // CONDIZIONE IN CUI COLORE E PREZZO VENGONO SELEZIONATI

              (this.prezzoMax || this.prezzoMin) && this.CheckboxColore.length > 0 ?


                p.colori_disponibili.some(colore => this.CheckboxColore.includes(colore.toLocaleLowerCase())) && (Prezzo) :






                // CONDIZIONE IN CUI SOLAMENTE LA CATEGORIA VIENE SELEZIONATA

                this.CheckboxCategoria.length > 0 ? this.CheckboxCategoria.includes(p.categoria.toLowerCase()) :


                  // CONDIZIONE IN CUI SOLAMENTE LA COLORE VIENE SELEZIONATA

                  this.CheckboxColore.length > 0 ? p.colori_disponibili.some(colore => this.CheckboxColore.includes(colore.toLocaleLowerCase())) :




                    (this.prezzoMin || this.prezzoMax ? Prezzo : true)




        return MatchFilters

      })





      // SE IL COLORE SELEZIONATI è PIU DI UNO,ICOLORI SLEZIONATI SUCCESSIVAMENTE VERRANO AGGIUNTI IN MANIERA CUMULATIVA E NON SPECIFICA

      this.Prodotti = this.CheckboxCategoria.length > 0 && this.CheckboxColore.length > 1 ? this.Prodotti = v.filter(p =>

        p.colori_disponibili.some(colore => this.CheckboxColore.includes(colore.toLocaleLowerCase())) &&

        this.CheckboxCategoria.includes(p.categoria.toLowerCase())

      ) : this.Prodotti








      // SALVATAGGIO PRODOTTI NELLO STORAGE

      this.Ps.ProdottiFiltratiStorage(this.Prodotti)


    }


    )



  }




}



















