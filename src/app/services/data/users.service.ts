import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  constructor(private http: Http) {
  }

  getUsers(): Observable<any> {
    return this.http.get('https://s2m-be.herokuapp.com/user')
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
