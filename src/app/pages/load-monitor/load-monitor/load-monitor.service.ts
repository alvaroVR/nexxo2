import {Injectable} from '@angular/core';

import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";
import {TypeFileResponse} from "../../../_models/TypeFile";


@Injectable({
  providedIn: 'root'
})
export class LoadMonitorService {

  constructor(public api: BaseService) {
  }

  getTypeFile(request: any) {
    const subject = new Subject<TypeFileResponse>();
    this.api.get(`/marketplace/detloaddomains`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getloadinterfacehdr(req: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getloadinterfacehdr`, req).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getloadinterfacedet(req: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getloadinterfacedet`, req).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getloadinterfaceerror(req: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getloadinterfaceerror`, req).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //putReprocessLoadFile
  putReprocessLoadFile(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putReprocessLoadFile`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

}
