import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {AuthenticationService} from '../_services/authentication/authentication.service';
import * as _ from 'lodash';


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    public authenticationService: AuthenticationService
  ) {

  }

  public canActivate(router: ActivatedRouteSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    const menu = this.authenticationService.currentMenuValue;
    if (menu) {
      var a: any[] = []
      const listMenusEnabled = _.map(menu, (childes: { childs: any; }) => {
        return childes.childs
      })

      _.map(menu, (childes: any) => {
        a.push(childes)
      })

      if (router.url.length > 0) {
        if (router.url[0].path === 'home') {
          return true;
        }
        var exist;
        var b = _.filter(a, (menu: { childs: any; }) => {
          var existSome = _.some(menu.childs, {path: router.url[0].path, activo: 'S'})

          if (existSome) {
            exist = true
          }
        })
        if (!exist) {
          this.router.navigate(['/home']);
          return false;
        }
      }
    }

    if (currentUser) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
