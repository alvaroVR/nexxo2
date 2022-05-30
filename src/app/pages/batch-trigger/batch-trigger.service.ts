import {Injectable} from '@angular/core';
import {BaseService} from "../../_services/base/base.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BatchTriggerService {

  constructor(public api: BaseService) {
  }

  getDetProcessBatchMngr(req: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetProcessBatchMngr`, req).subscribe((data: any) => {
      subject.next(data);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

  putProcessBatchMngr(data: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putProcessBatchMngr`, null, data).subscribe((response) => {
      subject.next(response);
    }, error => {
      subject.error(error);
    });
    return subject;
  }

}
