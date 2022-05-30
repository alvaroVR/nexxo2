import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class ProgramMasterService {

  constructor(public api: BaseService) {
  }

  getdomcompanies(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomcompanies`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomclientes(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomclientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomproyectos(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomproyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //marketplace/getDetMstrPrograms?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=01
  getDetMstrPrograms(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrPrograms`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

}
