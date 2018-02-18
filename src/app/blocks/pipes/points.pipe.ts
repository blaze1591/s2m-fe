import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'points'})
export class PointsPipe implements PipeTransform {
  transform(input: any, name: string): any {
    const points = [];
    if (input && name) {
      for (const key of Object.keys(input)) {
        points.push({year: key, value: input[key][name]});
      }
    }
    return points;
  }
}
