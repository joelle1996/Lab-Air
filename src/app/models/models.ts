export interface Prodotti {
    id: string;
    nome: string;
    categoria: string;
    prezzo: number;
    taglie_disponibili: string[];
    colori_disponibili: string[];
    descrizione: string;
    immagine: string;
    nuovo_arrivi: boolean;
    best_seller: number;
}

export interface ProdottiSelezionati extends Prodotti {
    colore: string;
    taglia: string;
    quantita: number;
}


export interface DatiUtente {
    nome: string;
    cognome: string;
    indirizzo: string;
    email: string;
    tel: string;
    cap: string;
    citta: string;
}


export interface CheckBoxStato {

    colori: string[]
    categoria: string[]
    prezzomin: boolean | undefined
    prezzomax: boolean | undefined

}
