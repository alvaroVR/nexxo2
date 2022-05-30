import { Injectable } from '@angular/core';
import {BaseService} from "../../../_services/base/base.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  constructor(public api: BaseService) {
  }

  //https://6k2nqb8tah.execute-api.us-east-1.amazonaws.com/eimrktplace/marketplace/getdettrabajadores?userId=admin
  public getdettrabajadores(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdettrabajadores`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

}
