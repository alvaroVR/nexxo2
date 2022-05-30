import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class MasterCityService {

  constructor(public api: BaseService) {
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getDetMstrCity?userId=admin
  getDetMstrCity(request:any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrCity`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putAddMstrCity?userId=admin&cityId=03&name=Rubro
  putAddMstrCity(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrCity`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putEditMstrCity?userId=admin&cityId=02&name=Rubro
  putEditMstrCity(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrCity`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //	https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putDelMstrCity?userId=admin&cityId=03
  putDelMstrCity(request:any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrCity`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }
}
