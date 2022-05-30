import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../../_models/User';
import {BaseService} from '../base/base.service';
import * as _ from 'lodash';


@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private menuSubject: BehaviorSubject<any>;
  public menuObs: Observable<any>;

  constructor(public api: BaseService, public http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>sessionStorage.getItem('currentUser')));
    this.menuSubject = new BehaviorSubject<any>(JSON.parse(<string>sessionStorage.getItem('menu')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.menuObs = this.menuSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentMenuValue(): any {
    return this.menuSubject.value;
  }


  public login(username: any, password: any, companyId: any) {
    const subject = new Subject<any>();
    this.api.postLogin(`/authenticator/signin?companyId=${companyId}`, null, {username, password}).subscribe(
      user => {
        const userData = {
          token: user.token,
          username,
          companyId
        };
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        this.currentUserSubject.next(user);
        this.menu(username, companyId);
        subject.next(user);
      });

    return subject;
  }

  public menu(username: any, companyId: any) {
    const subject = new Subject<any>();
    this.api.get(`/authenticator/getpathaccesmenu?companyId=${companyId}&userId=${username}`).subscribe(
      (menuR: any) => {
        const menuJson = _.map(menuR.detalles, (menus: any) => {
          return JSON.parse(menus.reg)
        })
        const addHref = _.map(menuJson, (menuFormat: any) => {
          return {
            pather: menuFormat.pather,
            href: menuFormat.pather.replace(/\s/g, '-'),
            childs: menuFormat.childs
          }
        })
        sessionStorage.setItem('menu', JSON.stringify(addHref));
        this.menuSubject.next(addHref);
        subject.next(addHref);
      }, (error:any) => {
      }, () => {
      });
    return subject;
  }

  public logout() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('menu');
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
