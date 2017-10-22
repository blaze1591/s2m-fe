import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';

@Injectable()
export class UserService {

  private users = [
    { name: 'Dima Salskiy', picture: 'assets/images/dimouns.jpg' },
    { name: 'Nick Jones', picture: 'assets/images/nick.png' },
    { name: 'Eva Moor', picture: 'assets/images/eva.png' },
    { name: 'Jack Williams', picture: 'assets/images/jack.png' },
    { name: 'Lee Wong', picture: 'assets/images/lee.png' },
    { name: 'Alan Thompson', picture: 'assets/images/alan.png' },
    { name: 'Kate Martinez', picture: 'assets/images/kate.png' },
  ];

  constructor(private http: Http) {
  }

  getUsers(): Observable<any> {
    return this.http.get('https://s2m-be.herokuapp.com/user')
                    .map((res: Response) => res.json())
                    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
