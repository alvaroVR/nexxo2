import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment as ENV} from '../../../environments/environment';
import {forkJoin, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  environmentUrl: string = 'Debug api';

  constructor(public http: HttpClient) {
    this.environmentUrl = ENV.apiUrl;
  }

  public get(url: string, body?: any) {
    const currentUser = JSON.parse(<string>sessionStorage.getItem('currentUser'));
    const token = currentUser ? `Bearer ${currentUser.token}` : '';

    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.get(this.environmentUrl + url, {
      params: body,
      headers
    });
  }

  public post(url: string, body?: any, query?: any) {
    const currentUser = JSON.parse(<string>sessionStorage.getItem('currentUser'));
    const token = currentUser ? `Bearer ${currentUser.token}` : '';

    const headers = new HttpHeaders({
      Authorization: token
    });
    return this.http.post<any>(this.environmentUrl + url, body, {
      params: query,
      headers
    });
  }

  public postList(url: string, body?: any): Observable<any> {
    const currentUser = JSON.parse(<string>sessionStorage.getItem('currentUser'));
    const token = currentUser ? `Bearer ${currentUser.token}` : '';
    const array = [];

    const headers = new HttpHeaders({
      Authorization: token
    });
    array.push(this.http.post<any>(this.environmentUrl + url, body, {
      headers
    }));
    return forkJoin(array);
  }

  public getList(url: string, body?: any): Observable<any> {
    const currentUser = JSON.parse(<string>sessionStorage.getItem('currentUser'));
    const token = currentUser ? `Bearer ${currentUser.token}` : '';
    const array = [];

    const headers = new HttpHeaders({
      Authorization: token
    });

    array.push(this.http.get<any>(this.environmentUrl + url, {
      params: body,
      headers
    }));

    return forkJoin(array);
  }

  public postLogin(url: string, body?: any, header?: any) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${window.btoa(header.username + ':' + header.password)}`
    });
    return this.http.post<any>(this.environmentUrl + url, null, {
      headers
    });

  }


}
