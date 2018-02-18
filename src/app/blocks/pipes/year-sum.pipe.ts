import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'yearSum'})
export class YearSumPipe implements PipeTransform {
  transform(input: any, name: string): any {
    let sum = 0;
    if (input && name) {
      for (const key of Object.keys(input)) {
        sum += input[key][name];
      }
    }
    return sum;
  }
}
