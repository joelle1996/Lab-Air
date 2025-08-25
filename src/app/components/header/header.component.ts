import { Component, OnInit } from '@angular/core';
import { ProdottiService } from '../../services/prodotti.service';
import { FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  SearchBarActive: boolean = false

  // Input Barra di ricerca
  ValidatoreRicerca = new FormControl('', [Validators.minLength(1)])








  constructor(private Ps: ProdottiService) { }


  // Chiamata API prodotti e filtraggio con il valore scritto nella barra di ricerca
  Ricerca() {

    const valueInput = this.ValidatoreRicerca.value || undefined

    if (valueInput) {

      this.Ps.getProdotti().subscribe(v => {

        const ProdFiltrati = v.filter(p => p.nome.toLowerCase().includes(valueInput.toLowerCase()))

        this.Ps.AggiornaProdFilter(ProdFiltrati, valueInput)
      }
      )
    }
  }





  // Trigger booleano per visualizzare la barra di ricerca o nasconderla
  SearchBar() {

    if (!this.SearchBarActive) {
      this.SearchBarActive = true
    }
    else {
      this.SearchBarActive = false
    }
  }
}
