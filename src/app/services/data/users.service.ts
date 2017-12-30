import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';

@Injectable()
export class UserService {

  constructor(private http: Http,
              private auth: AuthService) {
  }

  getUserById(userId): Observable<any> {
    return this.http.get(`${environment.apiUrl}/user/${userId}`, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'getUserById error'));
  }

  getUsers(): Observable<Array<any>> {
    return this.http.get(`${environment.apiUrl}/user`, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'getUsers error'));
  }

  modifyUser(user): Observable<any> {
    return this.http.post(`${environment.apiUrl}/user`, user, this.auth.generateOptions())
      .map((res: Response) => res.json())
      .catch(error => {
        throw Error(error.json().message);
      });
  }

  deleteUser(userId): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/user/${userId}`, this.auth.generateOptions())
      .catch((error: any) => Observable.throw(error.json().error || 'deleteUser error'));
  }
}
