import {Component, HostListener} from '@angular/core';
import {User} from "./_models/User";
import {NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "./_services/authentication/authentication.service";
import {fadeAnimation} from "./_helpers/route-animations";
import 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})

export class AppComponent {
  @HostListener("window:onbeforeunload", ["$event"])
  currentUser: User | any;
  itemsMenu: any;
  public isIe: boolean | any;
  public _opened: boolean = true;
  public title: string | any
  mostrarLogo = false

  constructor(private router: Router, titleService: Title,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.authenticationService.menuObs.subscribe(x => {
      this.itemsMenu = x
    });

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        var title = this.getTitle(router.routerState, router.routerState.root).join('-');
        this.title = title;
        console.log('title', title);
        titleService.setTitle(title);
      }
    });

  }

  public getTitle(state: any, parent: any): any {
    var data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }

  clearLocalStorage(event: any) {
    localStorage.clear();
  }

  public goHome() {
    this.router.navigate(['/home']);
  }

  public _toggleSidebar() {
    this._opened = !this._opened;
    this.mostrarLogo = !this._opened;
  }

  public getRouterOutletState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }


  public isExplorer() {
    return this.isIe = /msie\s|trident\/|edge\//i.test(window.navigator.userAgent)
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}



