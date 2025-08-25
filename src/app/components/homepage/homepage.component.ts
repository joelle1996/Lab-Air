import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { Prodotti } from '../../models/models';
import { ChangeDetectorRef } from '@angular/core'




@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {


  // @ViewChild('mediaScreenDiv') mediaScreenDiv!: ElementRef
  // @ViewChild('swiperContainer', { static: false }) swiperContainer!: ElementRef;


  LarghezzaSchermo: number = window.innerWidth

  VetrinaHome: Prodotti[] = []
  prodotti: Prodotti[] = []
  slideCorrente = 0
  slideCorrenteSport = 0
  SlideCorrenteScopri = 0
  checked: boolean = false
  checkedAssistenza: boolean = false
  checkedAzienda: boolean = false


  brokepoint: boolean = false


  // RICORDATI DI AGGIORNARE LA LOGICA DELLA SLIDE CORRENTE SCOPRI QUANDO LA LARGHEZZA SCHERMO è 800 PX PROVARE ANCHE A CREARE UNA 
  // CONDIZIONE IF NEL METODO SWITCH


  ImmaginiSport = [
    { nome: "Calcio", immagine: "/img/calcio.jpg" },
    { nome: "Basket", immagine: "/img/basket.jpg" },
    { nome: "Running", immagine: "/img/running.webp" },
    { nome: "Danza", immagine: "/img/danza.jpg" },
    { nome: "Yoga", immagine: "/img/yoga.jpg" }
  ]
  ImmaginiScopri = [

    { nome: "Uomo", immagine: "/img/uomo.png" },
    { nome: "Donna", immagine: "/img/donna.jpg" },
    { nome: "Kids", immagine: "/img/kids.webp" },
    { nome: "Teen", immagine: "/img/teen.jpg" }
  ]



  constructor(public Ps: ProdottiService, private cdr: ChangeDetectorRef) {



  }







  ngOnInit(): void {

    // CHIAMATA DEI PRODOTTI CON FILTRAGGIO NUMERI ARRAY PER AGGIUNGERE IMMAGINI DEI PRODOTTI AL CAROSELLO
    const observer = {

      next: (dati: Prodotti[]) => {
        this.prodotti = dati;
        const idVetrina = ["1", "3", "8", "11"]
        this.VetrinaHome = this.prodotti.filter(p => idVetrina.includes(p.id));
      },

      error: (err: any) => console.error('Errore', err),
      complete: () => console.log('Richiesta Completata')

    }


    this.Ps.getProdotti().subscribe(observer)



    // GESTIONE COMPORTAMENTO CAROSELLO BREAKPOINT 800PX CON OBSERVER SULLA LARGHEZZA SCHERMO(RESIZE OBSERVER)

    const resizeObserver = new ResizeObserver(() => {


      this.LarghezzaSchermo = window.innerWidth


      // GESTIONE DELLA POSIZIONE DELLE IMMAGGINI ALL'NTERNO DEL CAROSELLO FINO A GLI 800PX

      if (this.LarghezzaSchermo < 800) {


        this.slideCorrente = this.slideCorrente

        this.slideCorrenteSport = this.slideCorrenteSport

        this.SlideCorrenteScopri = this.SlideCorrenteScopri

        this.cdr.detectChanges();

      }

      switch (true) {

        // GESTIONE DELLA POSIZIONE DELLE IMMAGGINI ALL'NTERNODEL CAROSELLO DOPO A GLI 800PX

        case this.LarghezzaSchermo > 800: {


          this.slideCorrente = this.slideCorrente > 1 ? 1 : this.slideCorrente

          this.slideCorrenteSport = this.slideCorrenteSport > 2 ? 2 : this.slideCorrenteSport

          this.SlideCorrenteScopri = this.SlideCorrenteScopri > 1 ? 1 : this.SlideCorrenteScopri

          this.cdr.detectChanges();
          break;



        }




      }





    })



    resizeObserver.observe(document.body);
  }














  // FUNZIONI PER BOTTONI CAROSELLO IMMMAGINI

  Successiva(IdBottone: number) {

    switch (IdBottone) {

      case 1:

        this.slideCorrente = this.slideCorrente + 1;


        break;
      case 2:

        this.slideCorrenteSport = this.slideCorrenteSport + 1
        break
      case 3:
        this.SlideCorrenteScopri = this.SlideCorrenteScopri + 1


    }

  }

  Precedente(IdBottone: number) {
    switch (IdBottone) {

      case 1:
        this.slideCorrente = this.slideCorrente - 1

        break

      case 2:
        this.slideCorrenteSport = this.slideCorrenteSport - 1
        break

      case 3:
        this.SlideCorrenteScopri = this.SlideCorrenteScopri - 1
    }
  }


}




