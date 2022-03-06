import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
  styleUrls: ['./lookup.component.css'],
})
export class LookupComponent {
  faSearch = faSearch;
  @Input()
  symbol: string | undefined;
  @Output()
  symbolChange: EventEmitter<string> = new EventEmitter<string>();

  public emitValue() {
    this.symbolChange.emit(this.symbol);
  }
}
