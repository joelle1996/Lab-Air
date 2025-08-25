import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TuttiprodottiModule } from './Tutti-Prodotti/Tutti-Prodotti.module';
import { DettaglioModule } from './dettaglio/dettaglio.module';
import { VetrinaComponent } from './components/vetrina/vetrina.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    VetrinaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TuttiprodottiModule,
    DettaglioModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
