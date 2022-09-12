import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class MasterProjectService {

  constructor(public api: BaseService) {
  }

  getDetMstrRubros(request:any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrRubros`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetMstrCity(request:any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrCity`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetMstrClientes(request:any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrClientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetMstrCompany(request:any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrCompany`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getDetMstrProject?userId=admin
  getDetMstrProject(request:any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrProject`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putAddMstrClientes?userId=admin&clientId=1-7&clientName=Cliente1&mandanteId=1-7&mandanteName=MAndante 1
  putAddMstrClientes(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrClientes`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putEditMstrProject?userId=admin&proyectId=03&projectName=Rubro 03&companyId=123456&clientId=123456&cityId=01&rubroId=01
  putEditMstrProject(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrProject`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  ///putDelMstrProject?userId=admin&proyectId=03
  putDelMstrProject(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrProject`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //marketplace/putAddMstrProject?userId=admin&proyectId=03&projectName=Rubro 03&companyId=123456&clientId=123456&cityId=01&rubroId=01
  putAddMstrProject(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrProject`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  putAddMstrCausasNoCumplto(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrCausasNoCumplto`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  putEditMstrCausasNoCumplto(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrCausasNoCumplto`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }
}
