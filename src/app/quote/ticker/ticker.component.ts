import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { QuoteService } from '../quote.service';
import { Quote } from 'src/app/quote';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css'],
})
export class TickerComponent implements OnChanges {
  loading = false;
  quote: Quote | undefined;
  errorText: string | undefined;

  @Input()
  symbol: string | undefined;

  public get timezone(): string {
    var dt = DateTime.fromJSDate(this.quote!.Timestamp!);
    return dt.offsetNameShort;
  }

  constructor(private quoteService: QuoteService) {}

  ngOnChanges() {
    from(this.quoteService.getQuote(this.symbol!)).subscribe({
      next: ({ data }) => {
        this.errorText = undefined;
        this.quote = data;
      },
      error: ({ Message }) => {
        this.quote = undefined;
        this.errorText = Message;
      },
    });
  }
}
