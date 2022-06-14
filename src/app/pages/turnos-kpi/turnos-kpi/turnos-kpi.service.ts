import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class TurnosKpiService {

  constructor(public api: BaseService) {
  }

  getdomcompanies(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomcompanies`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomclientes(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomclientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomproyectos(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomproyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }
  //getDomYearsTurnoKpi?userId=admin&companyIdUsr=90844000-5
  getDomYearsTurnoKpi(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomYearsTurnoKpi`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //
  // getDetWeeksTurnoKpi?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003&yearId=2022
  getDetWeeksTurnoKpi(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetWeeksTurnoKpi`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///getDaylyGraphTurnoKpi?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003&yearId=2022
  getDaylyGraphTurnoKpi(req: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDaylyGraphTurnoKpi`, req).subscribe((data: any) => {
      let prueba;
      if (data.detalles.length > 0) {
        prueba = {
          title: data.detalles[0].title,
          labels: _.map(data.detalles, (param, index) => {
            return _.map(data.detalles[index].values, (r) => {
              return r.x
            })
          }),
          datasets: _.map(data.detalles, (param, index) => {
            return {
              data: _.map(data.detalles[index].values, (r) => {
                return r.y
              }),
              label: data.detalles[index].serie,
              hoverBackgroundColor: `#${param.idcolor}`,
              backgroundColor: `#${param.idcolor}`,
              borderColor: `#${param.idcolor}`,
            }
          })
        }
      }
      subject.next(prueba);
    }, error => {
      subject.error(error);
    });
    return subject;
  }


  ///getWeeklyGraphTurnoKpi?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003&yearId=2022
  getWeeklyGraphTurnoKpi(req: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getWeeklyGraphTurnoKpi`, req).subscribe((data: any) => {
      let prueba;
      if (data.detalles.length > 0) {
        prueba = {
          title: data.detalles[0].title,
          labels: _.map(data.detalles, (param, index) => {
            return _.map(data.detalles[index].values, (r) => {
              return r.x
            })
          }),
          datasets: _.map(data.detalles, (param, index) => {
            return {
              data: _.map(data.detalles[index].values, (r) => {
                return r.y
              }),
              label: data.detalles[index].serie,
              hoverBackgroundColor: `#${param.idcolor}`,
              backgroundColor: `#${param.idcolor}`,
              borderColor: `#${param.idcolor}`,
            }
          })
        }
      }
      subject.next(prueba);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  public putTurnoHHDisponiblesTurnoKpi(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putTurnoHHDisponiblesTurnoKpi`, null, request).subscribe((response: any) => {
      subject.next(response);
    }, error => {
      return subject.error(error);
    });
    return subject.asObservable();
  }

}
