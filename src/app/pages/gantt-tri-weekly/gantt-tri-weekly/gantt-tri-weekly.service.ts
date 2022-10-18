import {Injectable} from '@angular/core';
import {BaseService} from "../../../_services/base/base.service";
import {map, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GanttTriWeeklyService {

  constructor(public api: BaseService) {
  }

  ///marketplace/getDetGantChart?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=01
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


  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/getColdefGantChart?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=01
  getColdefGantChart(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getColdefTreeGanttTriWeekly`, request).subscribe((data) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  ///marketplace/getDomSubPartidasGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=4600018331
  getDomSubPartidasGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomSubPartidasGanttTriWeekly`, request).subscribe((data) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  ///EITSKMngrBeta/marketplace/getDet2GantChart?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=11&projectId=BB31089003
  getDet2GantChart(params: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDet2GantChart`, params).subscribe((data) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  //getDetTreeGantChart?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=BB31089003
  getDetTreeGantChart(request: any, ids: any) {
    const subject = new Subject<any>();
    this.api.getSomethingFromAnAPI(`/marketplace/getDetTreeGantTriWeekly?userId=${request.userId}&companyIdUsr=${request.companyIdUsr}&companyIdSelect=${request.companyIdSelect}&clientId=${request.clientId}&projectId=${request.projectId}&dayColSet=${request.dayColSet}&dateFrom=${request.dateFrom}&dateTo=${request.dateTo}&sessionId=${request.sessionId}&pageId=`, ids).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  getDetTreeGantChartStart(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetTreeGantTriWeekly?userId=${request.userId}&companyIdUsr=${request.companyIdUsr}&companyIdSelect=${request.companyIdSelect}&clientId=${request.clientId}&projectId=${request.projectId}&dayColSet=${request.dayColSet}&sessionId=${request.sessionId}&dateFrom=${request.dateFrom}&dateTo=${request.dateTo}&pageId=1`).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => subject.error(error));
    return subject;
  }

  //getInfoPredecesorTaskGanttTriWeekly?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=Prueba 0
  getInfoPredecesorTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getInfoPredecesorTaskGanttTriWeekly`, request).subscribe((data) => {
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

  getDomReportTurnos(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomReportTurnos`, request).subscribe((data: any) => {
      const response = {
        code: data.code,
        error: data.error,
        detalles: data.detalles.map(((r: any) => {
          return {
            id: r.id,
            value: r.nombre
          }
        }))
      }
      subject.next(response);
    }, (error: any) => subject.error(error));
    return subject;
  }

  //getDomTaskOwnerGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003
  getDomTaskOwnerGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomTaskOwnerGanttTriWeekly`, request).subscribe((res: any) => {
      const respuesta = {
        code: res.code,
        error: res.error,
        detalles: res.detalles.map((data: any) => {
          return {
            id: data.id,
            value: data.nombre
          }
        })
      }
      subject.next(respuesta);
    }, (error: any) => subject.error(error));
    return subject;
  }


  //https://ewsgoin43g.execute-api.us-east-1.amazonaws.com/EITSKMngrBeta/marketplace/putAddTaskGantt?userId=admin&companyId=EI&clientId=01&projectId=xxx&taskName=First tarea create test&parentId=1111&dateStart=25-02-22&dateFinsh=31-03-22
  putAddTaskGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddTask4GanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putAddTask4GanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddTask4GanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putAddOTGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putAddOTGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///putHHRealTaskGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003&taskId=2420&hhPlan=2&hhReal=3
  putHHRealTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putHHRealTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putEquipoSeccionTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEquipoSeccionTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putUpdHHPomHHTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putUpdHHPomHHTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putRealizadaFechaTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putRealizadaFechaTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putQtyPartidaTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putQtyPartidaTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putHHRealHorasTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putHHRealHorasTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putHHRealMinTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putHHRealMinTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putEspecialidadTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putEspecialidadTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putDotacionTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDotacionTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putMantenimientoTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putMantenimientoTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putUpdHHPomDisTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putUpdHHPomDisTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putUpdDotHHPlanTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putUpdDotHHPlanTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putUpdTurnoHHPlanTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putUpdTurnoHHPlanTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putCommentsTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putCommentsTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
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

  //putTaskOwnerGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003&taskId=2143&ownerId=26617784-4
  putTaskOwnerGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putTaskOwnerGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putCausasCalidadTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putCausasCalidadTaskGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putRealizadaTurnoTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putRealizadaTurnoTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putDelTaskGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putDelTask2GanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putFinishOTGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putFinishOTGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //putUpdTaskGantt?userId=admin&companyId=EI&clientId=11&projectId=BB31089003&taskId=3&taskName=First tarea create test&dateStart=25-02-22&dateFinsh=31-03-22
  putUpdTaskGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putUpdTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putUpdTask2GanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putUpdTask2GanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //putApplyProgramFiltersGantt
  putApplyProgramFiltersGantt(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putApplyProgramFiltersGanttTriWeekly`, null, request).subscribe((data: any) => {
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

  ///marketplace/putCausasNoCumpltoTaskGanttTriWeekly
  putCausasNoCumpltoTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putCausasNoCumpltoTaskGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  putCausasExcesosTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putCausasExcesosTaskGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///getDomCausasNoCumplGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003
  getDomCausasNoCumplGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomCausasNoCumplGanttTriWeekly`, request).subscribe((res: any) => {

      const respuesta = {
        code: res.code,
        error: res.error,
        detalles: res.detalles.map((data: any) => {
          return {
            id: data.id,
            nombre: data.nombre,
            value: 0
          }
        })
      }

      subject.next(respuesta);
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

  //getDetCausasNoCumpltoTaskGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003&taskId=2143
  getDetCausasNoCumpltoTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetCausasNoCumpltoTaskGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //getDetCausasExcesosTaskGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003&taskId=2420
  getDetCausasExcesosTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetCausasExcesosTaskGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetCausasCalidadTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetCausasCalidadTaskGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //marketplace/getDomCalidadGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003
  //CALIDAD TERMINAR

  getDomCalidadGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomCalidadGanttTriWeekly`, request).subscribe((data: any) => {
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

  getdomproyectos(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getdomproyectos`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetProgramEspecialidadesGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetProgramEspecialidadesGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //getDetRequesitosCategoryGantt?userId=admin&companyIdUsr=EI&companyIdSelect=01&clientId=01&projectId=01&taskId=19201
  getDetRequesitosCategoryGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetRequisitosCategoryGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDetRequesitoSubCategoriesGantt(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDetRequisitoSubCategoriesGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///getDomCausasExcesosGanttTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=BB31089003
  getDomCausasExcesosGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDomCausasExcesosGanttTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///getNroPagesTreeGantTriWeekly?userId=admin&companyIdUsr=90844000-5&companyIdSelect=01&clientId=01&projectId=102030
  getNroPagesTreeGantTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getNroPagesTreeGantTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  getDwnldTreeGantTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.get(`/marketplace/getDwnldTreeGantTriWeekly`, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }


//putPartidaTaskGanttTriWeekly
  putPartidaTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putPartidaTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  //putObsCausasNoCumpltoTaskGanttTriWeekly?userId=admin2&companyIdUsr=90844000-5&companyIdSelect=01&clientId=02&projectId=BB31089003&taskId=3820&causaId=02&obs=Obs%20Test%20CDNC
  putObsCausasNoCumpltoTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putObsCausasNoCumpltoTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///putObsCausasExcesosTaskGanttTriWeekly?userId=admin2&companyIdUsr=90844000-5&companyIdSelect=01&clientId=02&projectId=BB31089003&taskId=3821&causaId=02&obs=Obs%20Test%20Causa%20Excesos
  putObsCausasExcesosTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putObsCausasExcesosTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

  ///putObsCausasCalidadTaskGanttTriWeekly?userId=admin2&companyIdUsr=90844000-5&companyIdSelect=01&clientId=02&projectId=BB31089003&taskId=3821&causaId=01&obs=Obs%20Test%20Causa%20Calidad
  putObsCausasCalidadTaskGanttTriWeekly(request: any) {
    const subject = new Subject<any>();
    this.api.post(`/marketplace/putObsCausasCalidadTaskGanttTriWeekly`, null, request).subscribe((data: any) => {
      subject.next(data);
    }, (error: any) => {
      subject.error(error);
    });
    return subject;
  }

}



