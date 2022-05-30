import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";
import {TypeFileResponse} from "../../../_models/TypeFile";
import {InitiateFileLoadResponse} from "../../../_models/InitiateFileLoad";
import {FinishFileLoadResponse} from "../../../_models/FinishFileLoad";



@Injectable({
  providedIn: 'root'
})
export class UploadMixService {

  constructor(private api: BaseService) {

  }

  getTypeFile(request: any) {
    const subject = new Subject<TypeFileResponse>();
    this.api.get(`/marketplace/detloaddomains`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  initiateFileLoad(data:any) {
    const subject = new Subject<InitiateFileLoadResponse>();
    this.api.post(`/marketplace/initiatefileload`, data).subscribe((initiateFileLoad: any) => {
      subject.next(initiateFileLoad);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  putregfileload(data:any) {
    const subject = new Subject<InitiateFileLoadResponse>();
    this.api.post(`/marketplace/putregsfileload`, data).subscribe((response:any) => {
      subject.next(response);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  finishfileload(data:any) {
    const subject = new Subject<FinishFileLoadResponse>();
    this.api.post(`/marketplace/finishfileload`, data).subscribe((response:any) => {
      subject.next(response);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

}
