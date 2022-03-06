import { DecimalPipe } from '@angular/common';
import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';
import { ReadableNumberPipe } from './readable-number.pipe';

describe('ReadableNumberPipe', () => {
  let spectator: SpectatorPipe<ReadableNumberPipe>;
  const createPipe = createPipeFactory({
    providers: [DecimalPipe],
    pipe: ReadableNumberPipe,
  });

  it.each([
    [33316760, '33.3M'],
    [297, '297'],
    [25331662, '25.3M'],
    [4082775, '4.08M'],
    [40054809, '40.1M'],
    [94192, '94,192'],
    [1253948, '1.25M'],
    [2953535, '2.95M'],
    [601580, '601,580'],
    [4133041, '4.13M'],
    [3812490, '3.81M'],
    [5471583, '5.47M'],
    [3751545, '3.75M'],
    [558038824200, '558.0B'],
    [191827050000, '191.8B'],
    [802566391200, '802.6B'],
    [19041750000, '19.0B'],
    [null, '-'],
    [1853412910, '1.85B'],
    [2162268080, '2.16B'],
    [77135009480, '77.1B'],
    [14158545240, '14.2B'],
    [6656194420, '6.66B'],
    [79267344975, '79.3B'],
    [79531377090, '79.5B'],
    [54253921525, '54.3B'],
  ])('should display %i as %s (3 sig figs)', (actual, expected) => {
    spectator = createPipe(`{{${actual} | readableNumber}}`);
    expect(spectator.element).toHaveText(expected);
  });
});
