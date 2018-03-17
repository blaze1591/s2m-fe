import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'range'})
export class RangePipe implements PipeTransform {
  transform(start: number, count: number = 0, step: number = 1): any {
    if (!start) {
      return [];
    }
    return Array(count).fill('').map((v, i) => step * i + start);
  }
}
