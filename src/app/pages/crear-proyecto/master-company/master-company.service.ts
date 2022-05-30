import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class MasterCompanyService {

  constructor(public api: BaseService) {
  }

  //	https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getDetMstrCompany?userId=admin
  getDetMstrCompany(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrCompany`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //marketplace/putAddMstrCompany?userId=admin&companyId=03&name=Rubro 03
  putAddMstrCompany(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrCompany`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //EITSKMngrBeta/marketplace/putEditMstrCompany?userId=admin&companyId=02&name=Rubro

  putEditMstrCompany(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrCompany`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putDelMstrCompany?userId=admin&companyId=02
  putDelMstrCompany(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrCompany`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }
}
