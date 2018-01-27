import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';
import {ScienceUnit} from '../../pages/publications/model/science.unit';

@Injectable()
export class ScienceUnitService {

  constructor(private http: Http,
              private auth: AuthService) {
  }

  getScienceUnitInfo(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/unit/${id}`, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Get science unit error'));
  }

  getAllScienceUnits(): Observable<Array<any>> {
    return this.http.get(`${environment.apiUrl}/unit`, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Get all science units error'));
  }

  getAllScienceUnitsByUserId(userId: string): Observable<Array<any>> {
    return this.http.get(`${environment.apiUrl}/unit/user/${userId}`, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Get all science units by user error'));
  }

  saveScienceUnit(scienceUnit: ScienceUnit): Observable<any> {
    return this.http.post(`${environment.apiUrl}/unit`, scienceUnit, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Creating science unit error'));
  }

  updateScienceUnit(scienceUnit: ScienceUnit): Observable<any> {
    return this.http.put(`${environment.apiUrl}/unit/${scienceUnit.id}`, scienceUnit, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Updating science unit error'));
  }

  deleteScienceUnit(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/unit/${id}`, this.auth.generateOptions())
      .catch((error: any) => Observable.throw(error.json().error || 'Deleting science unit error'));

  }

  uploadBibtex(bibtexFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', bibtexFile, bibtexFile.name);

    return this.http.post(`${environment.apiUrl}/unit/upload`, formData, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Uploading bibtex file error'));
  }

  bulkSaveScienceUnits(userIds: Array<any>, scienceUnits: Array<any>): Observable<any> {
    return this.http.post(`${environment.apiUrl}/unit/bulk/${userIds}`, scienceUnits, this.auth.generateOptions())
      .catch((error: any) => Observable.throw(error.json().error || 'Bulk uploading science units error'));
  }
}
