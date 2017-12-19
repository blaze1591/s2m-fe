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
      .catch((error: any) => Observable.throw(error.json().error || 'Get all science units error'));
  }

  getAllScienceUnits(): Observable<Array<any>> {
    return this.http.get(`${environment.apiUrl}/unit`, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Get all science units error'));
  }

  saveScienceUnit(scienceUnit: ScienceUnit): void {
    this.http.post(`${environment.apiUrl}/unit`, scienceUnit, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Get all science units error'))
      .subscribe();
  }

  updateScienceUnit(scienceUnit: ScienceUnit): void {
    this.http.put(`${environment.apiUrl}/unit/${scienceUnit.id}`, scienceUnit, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Get all science units error'))
      .subscribe();
  }

  deleteScienceUnit(id: string): void {
    this.http.delete(`${environment.apiUrl}/unit/${id}`, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Get all science units error'))
      .subscribe();
  }
}
