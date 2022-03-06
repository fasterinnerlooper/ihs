import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReadableNumberPipe } from '../readable-number.pipe';
import { TickerComponent } from './ticker/ticker.component';

@NgModule({
  declarations: [TickerComponent, ReadableNumberPipe],
  imports: [CommonModule],
  exports: [TickerComponent],
})
export class QuoteModule {}
