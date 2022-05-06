import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { AppUtility } from '../../utility/app.utility';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpService {
  private user: User;
  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  public setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  public getUser(): User {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != undefined && user != null) {
      this.user = user;
    } else {
      this.user = new User();
    }
    return (AppUtility.isEmptyObject(this.user) || AppUtility.isEmptyString(this.user.token)) ? new User() : user;
  }

  public isLoggedIn(): boolean {
    this.user = this.getUser();
    if (this.user.token != undefined) {
      return (AppUtility.isEmptyObject(this.user) || AppUtility.isEmptyString(this.user.token)) ?
        false : true;
    } else {
      return false;
    }
  }

  get(endPoint: string): Observable<any> {
    let url = this.createUrl(endPoint);
    return this.http.get(url, this.getOptions());
  }

  getForgotPassword(endPoint: string): Observable<any> {
    let url = this.createUrl(endPoint);
    return this.http.get(url, this.getOptionsLogin());
  }
  
  delete(endPoint: string): Observable<any> {
    let url = this.createUrl(endPoint);
    return this.http.delete(url);
  }
  
  post(endPoint: string, object: any): Observable<any> {
    let url = this.createUrl(endPoint);
    return this.http.post(url, object, this.getOptions());
  }

  postWithParams(endPoint: string, object: any, params: HttpParams): Observable<any> {
    let url = this.createUrl(endPoint);
    return this.http.post(url, object, this.getHttpParamsOptions(params));
  }

  postWithParamss(endPoint: string, object: any, params: HttpParams): Observable<any> {
    let url = this.createUrls(endPoint);
    return this.http.post(url, object, this.getHttpParamsOptions(params));
  }


  put(endPoint: string, object: any): Observable<any> {
    let url = this.createUrl(endPoint);
    return this.http.put(url, object, this.getOptions());
  }

  postLogin(endPoint: string, object: any): Observable<any> {
    let url = environment.webBaseUrl + endPoint;
    return this.http.post(url, object, this.getOptionsLogin());
  }

  postMultiPart(endPoint: string, object: any,id?:any): Observable<any> {
    let formData: any = new FormData();
    formData.append('file', object);
    formData.append('productId', id);
    let url = this.createUrl(endPoint);
    return this.http.post(url, formData, this.getOptionsFormMultipart());
  }

  postMultiPartMultipleFile(endPoint: string, object: any): Observable<any> {
    let url = this.createUrl(endPoint);
    return this.http.post(url, object, this.getOptionsFormMultipart());
  }

  createUrl(endPoint: string): string {
    return environment.webBaseUrl + environment.apiUrl + endPoint;
  }

  createUrls(endPoint: string): string {
    return environment.webBaseUrl + endPoint;
  }

  getOptions() {
    this.user = JSON.parse(localStorage.getItem('user'));
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.user.token
      })
    }
  }

  getOptionsLogin() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'basic ZGV2Z2xhbi1jbGllbnQ6ZHVy'
      })
    }
  }
  getOptionsFormMultipart() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.user.token
      })
    }
  }

  getHttpParamsOptions(parameter: HttpParams) {
    if (this.getUser() != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + this.user.token,
        }),
        params: parameter
      };
      return httpOptions;
    }
  }
}