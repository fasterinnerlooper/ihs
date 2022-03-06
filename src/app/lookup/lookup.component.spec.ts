import { FormsModule } from '@angular/forms';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  byPlaceholder,
  createComponentFactory,
  Spectator,
} from '@ngneat/spectator/jest';
import { LookupComponent } from './lookup.component';

describe('LookupComponent', () => {
  let spectator: Spectator<LookupComponent>;
  const createComponent = createComponentFactory({
    imports: [FormsModule, NgSelectModule, FontAwesomeTestingModule],
    component: LookupComponent,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should take an input', () => {
    spectator.typeInElement('test', byPlaceholder('Symbol Lookup'));
    expect(spectator.component.symbol).toBe('test');
  });

  it('should emit the value when the search button is clicked', (done) => {
    // Arrange
    spectator.component.symbolChange.subscribe((value) => {
      // Assert
      expect(value).toBe('test');
      done();
    });

    // Act
    spectator.typeInElement('test', byPlaceholder('Symbol Lookup'));
    spectator.click('button');
  });
});
