import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 's2mUserFromBE'})
export class UserFromBEPipe implements PipeTransform {

  datePipe: DatePipe = new DatePipe('uk-UA');

  transform(input: Array<any>): Array<any> {
    return input.map((user) => {
      return {
        id: user.id,
        fioUkr: `${user.lastNameUa} ${user.firstNameUa} ${user.middleNameUa}`,
        fioRu: `${user.lastNameRu} ${user.firstNameRu} ${user.middleNameRu}`,
        fioEng: `${user.lastName} ${user.firstName} ${user.middleName}`,
        login: user.credentials['userName'],
        birth: this.datePipe.transform(user.birthDate, 'dd/MM/yyyy'),
        hirshScholar: user.hirshScholar,
        hirshScopus: user.hirshScopus,
        email: user.email,
        institute: user.institute,
        faculty: user.faculty,
        academicTitle: user.academicTitle,
        scienceDegree: user.scienceDegree,
        role: user.credentials.role,
        cathedras: user.cathedras,
        cathedra: user.cathedras && user.cathedras.find((c) => c.key).name,
      };
    });
  }
}
