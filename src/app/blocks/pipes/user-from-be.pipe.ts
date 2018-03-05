import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({name: 's2mUserFromBE'})
export class UserFromBEPipe implements PipeTransform {

  datePipe: DatePipe = new DatePipe('uk-UA');

  transform(input: Array<any>): Array<any> {
    return input.map((user) => {
      user.scopusEntities = user.scopusEntities && user.scopusEntities.map((entity) => {
        const dateProp = {date: this.datePipe.transform(entity.date, 'dd/MM/yyyy')};
        return Object.assign(entity, dateProp);
      }) || [];
      user.googleScholarEntities = user.googleScholarEntities && user.googleScholarEntities.map((entity) => {
        const dateProp = {date: this.datePipe.transform(entity.date, 'dd/MM/yyyy')};
        return Object.assign(entity, dateProp);
      }) || [];
      user.webOfScienceEntities = user.webOfScienceEntities && user.webOfScienceEntities.map((entity) => {
        const dateProp = {date: this.datePipe.transform(entity.date, 'dd/MM/yyyy')};
        return Object.assign(entity, dateProp);
      }) || [];
      return {
        id: user.id,
        fioUkr: `${user.lastNameUa} ${user.firstNameUa} ${user.middleNameUa}`,
        fioRu: `${user.lastNameRu} ${user.firstNameRu} ${user.middleNameRu}`,
        fioEng: `${user.lastName} ${user.firstName}`,
        login: user.credentials['userName'],
        birth: this.datePipe.transform(user.birthDate, 'dd/MM/yyyy'),
        scopusEntities: user.scopusEntities,
        googleScholarEntities: user.googleScholarEntities,
        webOfScienceEntities: user.webOfScienceEntities,
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
