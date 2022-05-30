import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {BaseService} from "../../../_services/base/base.service";

@Injectable({
  providedIn: 'root'
})
export class GanttLookAheadService {


  constructor(public api: BaseService) {
  }

  getDetGantChart(request?: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetGantChart?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=01`, request).subscribe((data: any) => {
      const response = {
        error: data.error,
        code: data.code,
        detalles: data.detalles.map((r: any) => {
          return {
            idclient: r.idclient,
            idproject: r.idproject,
            idtask_1: r.idtask_1,
            idtask_2: r.idtask_2,
            idtask_3: r.idtask_3,
            date_start: r.date_start,
            date_finish: r.date_finish,
            project_name: r.project_name,
            task_name_2: r.task_NAME_2,
            task_name_3: r.task_NAME_3,
            task_name_1: r.task_name_1,
          }
        })
      }
      subject.next(response);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getColdefGantChart(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getColdefTreeGantChart`, request).subscribe((data) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  getDet2GantChart(params: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDet2GantChart`, params).subscribe((data) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  getDetTreeGantChart(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetTreeGantChart`, request).subscribe((data) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  getDetFiltredTreeGantChart(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetFiltredTreeGantChart`, request).subscribe((data) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  getDomTaskOwnerGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomTaskOwnerGantt`, request).subscribe((data) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }


  putAddTaskGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddTask4Gantt`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putTaskOwnerGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putTaskOwnerGantt`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putDelTaskGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelTaskGantt`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //putUpdTaskGantt?userId=admin&companyId=EI&clientId=11&projectId=BB31089003&taskId=3&taskName=First tarea create test&dateStart=25-02-22&dateFinsh=31-03-22
  putUpdTaskGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putUpdTaskGantt`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //putApplyProgramFiltersGantt
  putApplyProgramFiltersGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putApplyProgramFiltersGantt`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putRequesitosCategoryGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putRequesitosCategoryGantt`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putRequesitosCategory2Gantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putRequisitosCategory2Gantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
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

  getdomclientes(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomclientes`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDomRequisitosOwnerGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomRequisitosOwnerGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getdomproyectos(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomproyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetProgramEspecialidadesGantt(request: any, requestParam: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/getDetProgramEspecialidadesGantt`, request, requestParam).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetRequesitosCategoryGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetRequesitosCategoryGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetRequesitoSubCategoriesGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetRequesitoSubCategoriesGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putPublishTriWeeklyGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putPublishTriWeeklyGantt`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putInfoRequisitosCategoryGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putInfoRequisitosCategoryGantt`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }


}

