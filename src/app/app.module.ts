import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenuComponent } from './features/menu/menu.component';

import { InputComponent } from './shared/input/input.component';
import { AddressPipe } from './shared/pipes/address.pipe';
import { LocationPipe } from './shared/pipes/location.pipe';


import { LocationSearchComponent } from './features/location-search/location-search.component';
import { LocationSearchService } from './features/location-search/location-search.service';
@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    MenuComponent,
    LocationSearchComponent,
    AddressPipe,
    LocationPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    LocationSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
