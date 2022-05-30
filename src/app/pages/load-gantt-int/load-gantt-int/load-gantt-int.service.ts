import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";
import {
  GetdomclientesReq,
  GetdomclientesResponse,
  GetdomproyectosReq,
  GetdomproyectosResponse
} from "../../../_models/IItemizado";


@Injectable({
  providedIn: 'root'
})
export class LoadGanttIntService {

  constructor(public api: BaseService) {
  }

  getdomcompanies(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomcompanies`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomclientes(request: GetdomclientesReq) {
    const subject = new Subject<GetdomclientesResponse>();
    this.api.get(`/marketplace/getdomclientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomproyectos(request: GetdomproyectosReq) {
    const subject = new Subject<GetdomproyectosResponse>();
    this.api.get(`/marketplace/getdomproyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getStatusLoadFilePMGantt?userId=admin&companyIdUsr=EI&loadId=9
  getStatusLoadFilePMGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getStatusLoadFilePMGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/getStatusLoadFileMCGantt?userId=admin&companyIdUsr=EI&loadId=13
  getStatusLoadFileMCGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getStatusLoadFileMCGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }


  ////getStatusLoadFilesGantt?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=BB31089003
  getStatusLoadFilesGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getStatusLoadFilesGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putLoadFilesGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putLoadFilesGantt`, request).subscribe((response: any) => {
      subject.next(response);
    }, (error: any) => {
      return subject.error(error);
    });
    return subject.asObservable();
  }
}
