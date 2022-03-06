import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'readableNumber',
})
export class ReadableNumberPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}
  transform(value: number | null, ...args: unknown[]): string {
    if (value === null) return '-';
    if (value >= 100000000000) return `${(value / 1000000000).toPrecision(4)}B`;
    if (value >= 1000000000) return `${(value / 1000000000).toPrecision(3)}B`;
    if (value >= 1000000) return `${(value / 1000000).toPrecision(3)}M`;
    return this.decimalPipe.transform(value)!;
  }
}
