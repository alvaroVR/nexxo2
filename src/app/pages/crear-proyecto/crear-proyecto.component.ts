import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive, Routes} from "@angular/router";

export interface TabItem {
  label: string;
  route: string;
}

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.component.html',
  styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements AfterViewInit, OnInit {
  isViewInitialized = false;

  navLinks: any = [];
  title = 'angular-material-tab-router';
  activeLinkIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.navLinks = (
      this.route.routeConfig && this.route.routeConfig.children ?
        this.buildNavItems(this.route.routeConfig.children) :
        []
    );
  }


  ngAfterViewInit() {
    this.isViewInitialized = true;
    this.changeDetector.detectChanges();
  }

  buildNavItems(routes: Routes) {
    return (routes)
      .filter(route => {
        return route
      })
      .map(({path = '', data}: any) => {
          return {
            path: path,
            label: data.label
          }
        }
      );
  }

  isLinkActive(rla: RouterLinkActive): boolean {
    if (rla.linksWithHrefs.first) {
      const routerLink: any = rla.linksWithHrefs.first;
      return this.router.isActive(routerLink.urlTree, false);
    } else {
      return false
    }
  }
}
