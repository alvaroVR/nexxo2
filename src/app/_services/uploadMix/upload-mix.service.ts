import {Injectable} from '@angular/core';
import {BaseService} from "../base/base.service";
import {Subject} from "rxjs";
import {TypeFileResponse} from "../../_models/TypeFile";
import {InitiateFileLoadRequest, InitiateFileLoadResponse} from "../../_models/InitiateFileLoad";
import {FinishFileLoadRequest, FinishFileLoadResponse} from "../../_models/FinishFileLoad";

@Injectable({
  providedIn: 'root'
})
export class UploadMixService {

  constructor(private api: BaseService) {

  }

  getTypeFile(request: any) {
    const subject = new Subject<TypeFileResponse>();
    this.api.get(`/loadmanager/detloaddomains`, request).subscribe((data:any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  initiateFileLoad(data: any) {
    const subject = new Subject<InitiateFileLoadResponse>();
    this.api.post(`/loadmanager/initiatefileload`, data).subscribe((initiateFileLoad: InitiateFileLoadResponse) => {
      subject.next(initiateFileLoad);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  putregfileload(data: any) {
    const subject = new Subject<InitiateFileLoadResponse>();
    this.api.post(`/loadmanager/putregsfileload`, data).subscribe((response) => {
      subject.next(response);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  finishfileload(data: any) {
    const subject = new Subject<FinishFileLoadResponse>();
    this.api.post(`/loadmanager/finishfileload`, data).subscribe((response) => {
      subject.next(response);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

}
