import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';

@Injectable()
export class ScienceUnitService {

  constructor(private http: Http,
              private auth: AuthService) {
  }

  getAllScienceUnits(): Observable<any> {
    return this.http.get(environment.apiUrl + '/unit')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
