import {Injectable} from '@angular/core';
import {BaseService} from "../../_services/base/base.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CrearProyectoService {

  constructor(public api: BaseService) {
  }


  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getDetMstrCity?userId=admin
  getDetMstrCity(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrCity`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putAddMstrCity?userId=admin&cityId=03&name=Rubro
  putAddMstrCity(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrCity`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putEditMstrCity?userId=admin&cityId=02&name=Rubro
  putEditMstrCity(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrCity`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //	https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putDelMstrCity?userId=admin&cityId=03
  putDelMstrCity(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrCity`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }


//https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getDetMstrRubros?userId=admin
  public getDetMstrRubros(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrRubros`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putAddMstrRubros?userId=admin&rubroId=03&name=Rubro 03
  public putAddMstrRubros(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrRubros`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putEditMstrRubros?userId=admin&rubroId=02&name=Rubro xxxx
  public putEditMstrRubros(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrRubros`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putDelMstrRubros?userId=admin&rubroId=02
  public putDelMstrRubros(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrRubros`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }


  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getDetMstrClientes?userId=admin
  getDetMstrClientes(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrClientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putAddMstrClientes?userId=admin&clientId=1-7&clientName=Cliente1&mandanteId=1-7&mandanteName=MAndante 1
  putAddMstrClientes(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrClientes`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putEditMstrClientes?userId=admin&clientId=1-7&clientName=Rubro xxxx&mandanteId=1-8&mandanteName=Mandante 2
  putEditMstrClientes(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrClientes`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //	putDelMstrClientes?userId=admin&clientId=1-7
  putDelMstrClientes(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrClientes`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetMstrCompany(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrCompany`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //marketplace/putAddMstrCompany?userId=admin&companyId=03&name=Rubro 03
  putAddMstrCompany(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrCompany`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //EITSKMngrBeta/marketplace/putEditMstrCompany?userId=admin&companyId=02&name=Rubro

  putEditMstrCompany(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrCompany`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putDelMstrCompany?userId=admin&companyId=02
  putDelMstrCompany(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrCompany`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }


  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getDetMstrProject?userId=admin
  getDetMstrProject(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetMstrProject`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  ///marketplace/putEditMstrProject?userId=admin&proyectId=03&projectName=Rubro 03&companyId=123456&clientId=123456&cityId=01&rubroId=01
  putEditMstrProject(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEditMstrProject`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  ///putDelMstrProject?userId=admin&proyectId=03
  putDelMstrProject(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelMstrProject`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }

  //marketplace/putAddMstrProject?userId=admin&proyectId=03&projectName=Rubro 03&companyId=123456&clientId=123456&cityId=01&rubroId=01
  putAddMstrProject(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddMstrProject`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error:any) => {
      subject.error(error);
    });
    return subject;
  }
}


