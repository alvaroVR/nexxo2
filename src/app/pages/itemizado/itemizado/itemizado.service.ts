import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

import {BaseService} from "../../../_services/base/base.service";
import {
  GetdetitemizadosReq,
  GetdomclientesReq,
  GetdomclientesResponse,
  GetdomcompaniesReq,
  GetdomcompaniesResponse, GetdomproyectosReq, GetdomproyectosResponse
} from "../../../_models/IItemizado";

@Injectable({
  providedIn: 'root'
})
export class ItemizadoService {

  constructor(public api: BaseService) {
  }

  getdomcompanies(request: GetdomcompaniesReq) {
    const subject = new Subject<GetdomcompaniesResponse>();
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

  getdetitemizados(request: GetdetitemizadosReq) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdetitemizados`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //getdomversion?userId=admin&companyIdUsr=96934730-K&companyIdSelect=01&clientId=01
  getdomversion(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomversion`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //putdelversionitemizado?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=4600018331&versionId=2
  public putdelversionitemizado(query: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putdelversionitemizado`, null, query).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

}
