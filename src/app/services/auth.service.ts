import {Injectable} from '@angular/core';

import {Headers, Http, RequestOptions, Response} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs/Observable';


/**
 * AuthService uses JSON-Web-Token authorization strategy.
 * Fetched token and user details are stored in sessionStorage.
 */
@Injectable()
export class AuthService {

  public static readonly SIGNUP_URL = environment.apiUrl + '/api/auth/signup';
  public static readonly SIGNIN_URL = environment.apiUrl + '/api/auth/signin';
  public static readonly REFRESH_TOKEN_URL = environment.apiUrl + '/api/auth/token/refresh';

  private token: string;

  constructor(private http: Http) {
    this.refreshUserData();
  }

  /**
   * Refreshes userId, username and token from sessionStorage
   */
  public refreshUserData(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.saveUserDetails(JSON.parse(user));
    }
  }

  /**
   * Registers new user and saves following token
   * @param username
   * @param email
   * @param password
   */
  public signUp(username: string, email: string, password: string): Observable<any> {

    const requestParam = {
      email: email,
      username: username,
      password: password,
    };

    return this.http.post(AuthService.SIGNUP_URL, requestParam, this.generateOptions())
      .map((res: Response) => {
        this.saveToken(res);
        this.saveUserDetails(JSON.parse(sessionStorage.getItem('user')));
      }).catch(err => {
        throw Error(err.json().message);
      });
  }

  /**
   * Fetches and saves token for given user
   * @param username
   * @param password
   */
  public signIn(username: string, password: string): Observable<any> {

    const requestParam = {
      username: username,
      password: password,
    };

    return this.http.post(AuthService.SIGNIN_URL, requestParam, this.generateOptions())
      .map((res: Response) => {
        this.saveToken(res);
        this.saveUserDetails(JSON.parse(sessionStorage.getItem('user')));
      }).catch(err => {
        throw Error(err.json().message);
      });
  }

  /**
   * Removes token and user details from sessionStorage and service's variables
   */
  public logout(): void {
    sessionStorage.removeItem('user');
    this.token = null;
  }

  /**
   * Refreshes token for the user with given token
   * @param token - which should be refreshed
   */
  public refreshToken(token: string): Observable<any> {
    const requestParam = {token: this.token};

    return this.http.post(AuthService.REFRESH_TOKEN_URL, requestParam, this.generateOptions())
      .map((res: Response) => {
        this.saveToken(res);
      }).catch(err => {
        throw Error(err.json().message);
      });
  }

  /**
   * Checks if user is authorized
   * @return true is user authorized (there is token in sessionStorage) else false
   */
  public isAuthorized(): boolean {
    return Boolean(this.token);
  }

  /**
   * @return username if exists
   */
  public getUsername(): string {
    const claims = this.getTokenClaims(this.token);
    return claims.sub;
  }

  /**
   * @return userId if exists
   */
  public getUserId(): number {
    const claims = this.getTokenClaims(this.token);
    return claims.id;
  }

  /**
   * @return token if exists
   */
  public getToken(): string {
    return this.token;
  }

  public getRole(): string {
    const claims = this.getTokenClaims(this.token);
    return claims.role[0]['authority'];
  }

  // Generates Headers
  public generateOptions(): RequestOptions {
    const headers = new Headers();
    headers.append('Authorization', this.token);
    const params = new URLSearchParams();
    return new RequestOptions({headers: headers, params: params});
  }

  // Saves user details with token into sessionStorage as user item
  private saveToken(res: Response): void {
    const response = res.json() && res.json().token;
    if (response) {
      const token = response;
      const claims = this.getTokenClaims(token);
      claims.token = token;
      sessionStorage.setItem('user', JSON.stringify(claims));
    } else {
      throw Error(res.json());
    }
  }

  // Saves user details into service properties
  private saveUserDetails(user): void {
    this.token = user.token || '';
  }

  // Retrieves user details from token
  private getTokenClaims(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
}
