import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { QuoteService } from './quote.service';
import MockDate from 'mockdate';

describe('Quote Service', () => {
  let spectator: SpectatorService<QuoteService>;
  const createService = createServiceFactory(QuoteService);

  beforeEach(() => (spectator = createService()));

  afterEach(() => {
    MockDate.reset();
  });

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });

  it('should return expected symbol data', (done) => {
    // Arrange
    MockDate.set(new Date());
    var expectedData = {
      Status: 'SUCCESS',
      data: {
        Name: 'Metlife Inc',
        Symbol: 'MET',
        LastPrice: 50.425,
        Change: -0.705000000000005,
        ChangePercent: -1.37883825542735,
        MSDate: 42892.6630324074,
        MarketCap: 54253921525,
        Volume: 3751545,
        ChangeYTD: 53.89,
        ChangePercentYTD: -6.42976433475599,
        High: 50.83,
        Low: 50.13,
        Open: 50.7,
        Timestamp: new Date(),
      },
    };

    // Act
    spectator.service.getQuote('MET').subscribe((result) => {
      // Assert
      expect(result).toEqual(expectedData);
      done();
    });
  });
});
