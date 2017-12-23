import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 's2mUserFromBE'})
export class UserFromBEPipe implements PipeTransform {

  transform(input: Array<any>): Array<any> {
    return input.map((user) => {
      return {
        id: user.id,
        fioUkr: `${user.firstNameUa} ${user.middleNameUa} ${user.lastNameUa}`,
        fioRu: `${user.firstNameRu} ${user.middleNameRu} ${user.lastNameRu}`,
        fioEng: `${user.firstName} ${user.middleName} ${user.lastName}`,
        email: user.email,
        institute: user.institute,
        faculty: user.faculty,
        academicTitle: user.academicTitle,
        scienceDegree: user.scienceDegree,
        cathedra: user.cathedras && user.cathedras.find((c) => c.key).name,
      };
    });
  }
}
