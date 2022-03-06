import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LookupComponent } from './lookup/lookup.component';
import { QuoteModule } from './quote/quote.module';
import { QuoteService } from './quote/quote.service';

@NgModule({
  declarations: [AppComponent, LookupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgSelectModule,
    QuoteModule,
  ],
  providers: [QuoteService, DecimalPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
