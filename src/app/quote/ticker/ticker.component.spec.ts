import { DecimalPipe } from '@angular/common';
import {
  createComponentFactory,
  Spectator,
  SpyObject,
} from '@ngneat/spectator/jest';
import { DateTime } from 'luxon';
import { from, of, throwError } from 'rxjs';
import { Quote } from 'src/app/quote';
import { ReadableNumberPipe } from '../../readable-number.pipe';
import { QuoteService } from '../quote.service';
import { TickerComponent } from './ticker.component';

describe('TickerComponent', () => {
  const date = new Date();
  date.setHours(12);
  date.setMinutes(55);
  const testData = {
    Status: 'SUCCESS',
    data: {
      Name: 'Test Name',
      Change: 0,
      ChangePercent: 0,
      ChangePercentYTD: 0,
      ChangeYTD: 0,
      High: 56.78,
      LastPrice: 55.55,
      Low: 12.34,
      MSDate: 0,
      MarketCap: 123123123123,
      Open: 44.44,
      Symbol: 'TEST',
      Volume: 33316760,
      Timestamp: date,
    },
  } as { Status: string; data: Quote };

  let spectator: Spectator<TickerComponent>;
  let service: SpyObject<QuoteService>;
  const createComponent = createComponentFactory({
    declarations: [ReadableNumberPipe],
    providers: [DecimalPipe],
    component: TickerComponent,
    mocks: [QuoteService],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
    service = spectator.inject(QuoteService);
    service.getQuote.mockReturnValueOnce(of(testData));
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should take a stock symbol as input and call getQuote', () => {
    // Arrange

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(service.getQuote).toHaveBeenCalled();
    expect(service.getQuote).toHaveBeenCalledWith('test');
  });

  it('should display the expected title', () => {
    // Arrange

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(service.getQuote).toHaveBeenCalled();
    expect(service.getQuote).toHaveBeenCalledWith('test');
    expect(spectator.component.quote).toBeDefined();
    expect(spectator.query('#symbol-name')).toHaveText('Test Name');
  });

  it('should show the expected price', () => {
    // Arrange

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(service.getQuote).toHaveBeenCalled();
    expect(service.getQuote).toHaveBeenCalledWith('test');
    expect(service.getQuote).toHaveBeenCalledTimes(1);
    expect(spectator.component.quote).toBeDefined();
    expect(spectator.query('#price')).toHaveText('55.55');
  });

  it('should show a positive change in green', () => {
    // Arrange

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(service.getQuote).toHaveBeenCalled();
    expect(service.getQuote).toHaveBeenCalledWith('test');
    expect(spectator.query('#change')).toHaveClass('text-success');
  });

  it('should show a negative change in red', () => {
    // Arrange
    var newTestData = testData;
    newTestData.data.Change = -1;
    service.getQuote.mockReturnValue(of(newTestData));

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(service.getQuote).toHaveBeenCalled();
    expect(service.getQuote).toHaveBeenCalledWith('test');
    expect(spectator.query('#change')).toHaveClass('text-danger');
  });

  it('should show the timestamp', () => {
    // Arrange
    var dt = DateTime.local();
    var timezone = dt.offsetNameShort;

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(service.getQuote).toHaveBeenCalled();
    expect(service.getQuote).toHaveBeenCalledWith('test');
    expect(spectator.query('#date')).toHaveText(`As of 12:55 PM ${timezone}`);
  });

  it('should show the range correctly', () => {
    // Arrange

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(spectator.query('table tr:nth-child(1) td:nth-child(2)')).toHaveText(
      '12.34 - 56.78'
    );
  });

  it('should show the open value correctly', () => {
    // Arrange

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(spectator.query('table tr:nth-child(2) td:nth-child(2)')).toHaveText(
      '44.44'
    );
  });

  it('should show the volume correctly', () => {
    // Arrange

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(spectator.query('table tr:nth-child(3) td:nth-child(2)')).toHaveText(
      '33.3M'
    );
  });

  it('should show the market cap correctly', () => {
    // Arrange

    // Act
    spectator.setInput('symbol', 'test');
    spectator.detectChanges();

    // Assert
    expect(spectator.query('table tr:nth-child(4) td:nth-child(2)')).toHaveText(
      '123.1B'
    );
  });
});
