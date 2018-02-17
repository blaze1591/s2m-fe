import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'month'})
export class MonthPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let translate;
    switch (value) {
      case '1' : {
        translate = 'Січ';
        break;
      }
      case '2' : {
        translate = 'Лют';
        break;
      }
      case '3' : {
        translate = 'Бер';
        break;
      }
      case '4' : {
        translate = 'Квіт';
        break;
      }
      case '5' : {
        translate = 'Трав';
        break;
      }
      case '6' : {
        translate = 'Чер';
        break;
      }
      case '7' : {
        translate = 'Лип';
        break;
      }
      case '8' : {
        translate = 'Сер';
        break;
      }
      case '9' : {
        translate = 'Вер';
        break;
      }
      case '10' : {
        translate = 'Жов';
        break;
      }
      case '11' : {
        translate = 'Лист';
        break;
      }
      case '12' : {
        translate = 'Груд';
        break;
      }
      default: {
        translate = '???';
        break;
      }
    }
    return translate;
  }
}
