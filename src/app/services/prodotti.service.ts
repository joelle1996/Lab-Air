import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Prodotti, CheckBoxStato } from "../models/models";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpParams } from '@angular/common/http';
import { map } from "rxjs";



@Injectable({

    providedIn: 'root'

})

export class ProdottiService {




    constructor(public http: HttpClient) { }






    // SUBJECT DEI PRODOTTI FILTRATI

    public ProdFilterService = new BehaviorSubject<Prodotti[]>([])
    ProdFiltrati$ = this.ProdFilterService.asObservable()




    // SUBJECT DEL VALORE DELL'INPUT INSERITO DALL'UTENTE

    public InputUtenteService = new BehaviorSubject<string>('')
    InputUtente$ = this.InputUtenteService.asObservable()









    // PASSAGGIO PRODOTTI ED INPUT AI SUBJECT E SALVATAGGIO NELLO STORAGE

    AggiornaProdFilter(prodotti: Prodotti[], valueInput: string) {


        this.ProdFilterService.next(prodotti)
        localStorage.setItem('ProdottiFiltrati', JSON.stringify(prodotti))

        this.InputUtenteService.next(valueInput)
        localStorage.setItem('valueInput', valueInput)


    }

    // RECUPERO PRODOTTI E VALORE UTENTE DALLO STORAGE

    RecuperaProdotti() {
        const ProdottiSalvati = localStorage.getItem('ProdottiFiltrati')
        const prodotti = ProdottiSalvati ? JSON.parse(ProdottiSalvati) : [];

        this.ProdFilterService.next(prodotti)

        const StringSalvata = localStorage.getItem('valueInput')
        const stringa = StringSalvata ? StringSalvata : '';


        this.InputUtenteService.next(stringa)

    }



    // CHIAMATA API DI TUTTI I PRODOTTI

    getProdotti(): Observable<Prodotti[]> {
        return this.http.get<Prodotti[]>(environment.ApiKey)
    }



    // CHIAMATA API SINGOLO PRODOTTO TRAMITE ID

    getProdotto(id: string): Observable<Prodotti> {
        return this.http.get<Prodotti>(environment.ApiKey + id)

    }




    ProdottiFiltratiStorage(Prodotti: Prodotti[]) {

        localStorage.setItem('ProdFiltrati', JSON.stringify(Prodotti));

    }

    RecuperoProdStorage() {

        const ProdottiSalvati = localStorage.getItem('ProdFiltrati')


        return ProdottiSalvati ? JSON.parse(ProdottiSalvati) : [];
    }



    SalvaCheckbox(stato: CheckBoxStato) {

        localStorage.setItem('StatoCheck', JSON.stringify(stato));

    }



    RecuperoStatoCheck() {

        const CheckSalvati = localStorage.getItem('StatoCheck')


        return CheckSalvati ? JSON.parse(CheckSalvati) : [];
    }


}




// CHIAMATA PRODOTTI FILTRATI CON PARAMETRO VALORE DEL CHECKBOX

// getProdottiFiltrati(filtri: string[]): Observable<Prodotti[]> {


// TRASFORMAZIONE DEL PARAMETRO FILTRI(ARRAY DI VALORI CHECKBOX) IN QUERY STRING CON IL NOME DI FILTERS
// const lowerCaseFilters = filtri.map(filtro => filtro.toLowerCase());

// const params = new HttpParams().set('filters', lowerCaseFilters.join(','));


// RITORNO DEI PRODOTTI FILTRATI

// return this.http.get<Prodotti[]>(environment.ApiKey, { params }).pipe(

//     map(prodotti => prodotti.filter(prod => {

// FILTRAGGIO PER CATEGORIA COLORE E PREZZO

// const categoria = prod.categoria ? lowerCaseFilters.includes(prod.categoria.toLowerCase()) : []



// const colore = prod.colori_disponibili ? prod.colori_disponibili.some(
//     col => lowerCaseFilters.includes(col.toLowerCase())) : []



// let prezzo;


// if (lowerCaseFilters.includes('prezzomin'.toLocaleLowerCase())) {
//     prezzo = prod.prezzo >= 100 && prod.prezzo <= 150;

//     console.log(prezzo)
// }

// if (lowerCaseFilters.includes('prezzomax'.toLocaleLowerCase())) {
//     prezzo = prod.prezzo > 150;


// }


// }))
//         );
//     }
// }





