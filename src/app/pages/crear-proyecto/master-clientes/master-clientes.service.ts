import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class MasterClientesService {

  constructor(public api: BaseService) {
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getDetMstrClientes?userId=admin
  getDetMstrClientes(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrClientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putAddMstrClientes?userId=admin&clientId=1-7&clientName=Cliente1&mandanteId=1-7&mandanteName=MAndante 1
  putAddMstrClientes(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrClientes`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putEditMstrClientes?userId=admin&clientId=1-7&clientName=Rubro xxxx&mandanteId=1-8&mandanteName=Mandante 2
  putEditMstrClientes(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrClientes`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //	putDelMstrClientes?userId=admin&clientId=1-7
  putDelMstrClientes(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrClientes`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }
}
