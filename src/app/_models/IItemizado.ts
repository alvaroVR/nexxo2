export interface GetdomcompaniesReq {
  userId: string;
  companyId: string;
}

export interface GetdomclientesReq {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
}

export interface GetdomproyectosReq {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
  clientId: string;
}

export interface GetdetitemizadosReq {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: number;
  versionId: string;
}


export interface Detalles {
  id: string;
  nombre: string;
}

export interface GetdomcompaniesResponse {
  label?: any;
  code: number;
  error?: any;
  detalles: Detalles[];
}

export interface GetdomclientesResponse {
  label?: any;
  code: number;
  error?: any;
  detalles: Detalles[];
}

export interface GetdomproyectosResponse {
  label?: any;
  code: number;
  error?: any;
  detalles: Detalles[];
}

export interface DetallesItemizados {
  idpartida: string;
  idsubpartida: string;
  nombre: string;
  und: string;
  cant: number;
  rendimiento: number;
  preciounit: number;
  total: number;
  fecha: string;
}

export interface GetdetitemizadosResponse {
  label?: any;
  code: number;
  error?: any;
  detalles: DetallesItemizados[];
}

export interface GetdetactivitypplanRequest {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: number;
}

export interface GetdetactivitypplanResponse {
  label?: any;
  code: number;
  error?: any;
  detalles: DetallesActivityPlan[];
}

export interface DetallesActivityPlan {
  idcompany: string;
  company_name: string;
  idcliente: string;
  client_name: string;
  idproyecto: number;
  project_name: string;
  descripcion?: any;
  observaciones?: any;
  fecha: string;

}

export interface GetdetlistotRequest {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: number;
}

export interface GetdetlistotResponse {
  label: string;
  code: string;
  error: string;
  detalles: Detallesdetlistot[];
}

export interface Detallesdetlistot {
  idcompany: string;
  idcliente: string;
  idproyecto: number;
  idreg: number;
  idot: number;
  jobname: string;
  sol_date: string;
  start_date?: any;
  finish_date?: any;
  create_date: string;
  lastupd: string;
}

export interface GetdetlistsubpartidasRequest {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: number;
  regIdOT: number;
}

export interface GetdetlistsubpartidasResponse {
  label: string;
  code: string;
  error: string;
  detalles: Detalleslistsubpartidas[];
}

export interface Detalleslistsubpartidas {
  lastupd: string;
  idcompany: string;
  idcliente: string;
  idproyecto: number;
  idregot: number;
  idreg: number;
  idsubpartida: string;
  idversion?: any;
  nombre?: any;
  qty_EJECTUTAR?: any;
  rendimiento?: any;
  hh_PTO?: any;
  start_DATE?: any;
  finish_DATE?: any;
  dias?: any;
  idresponsable: string;
  responsable?: any;
  create_DATE: string;

}

export interface GetdetlisttasksubpartidasRequest {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: number;
  regIdOT: number;
  regIdSubpartida: number;
}

export interface GetdetlisttasksubpartidasResponse {
  label: string;
  code: string;
  error: string;
  detalles: Detalleslisttasksubpartidas[];
}

export interface Detalleslisttasksubpartidas {
  lastupd: string;
  idcompany: string;
  idcliente: string;
  idproyecto: number;
  idregot: number;
  idreg: number;
  idregsubpartida: number;
  idtask: string;
  status: string;
  idversion?: any;
  nombre: string;
  qty_EJECTUTAR?: any;
  rendimiento?: any;
  hh_PTO: number;
  start_DATE?: any;
  finish_DATE?: any;
  dias?: any;
  idresponsable: string;
  responsable?: any;
  create_DATE: string;
}

export interface Putordentrabajo {
  userId: string;
  companyIdUSr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: string;
  regsData: OrdenTrabajo[];
}

export interface OrdenTrabajo {
  idreg: number;
  idot: any;
  jobname: string;
  sol_date: string;
}

export interface Putsubpartidaot {
  userId: string;
  companyIdUSr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: string;
  regIdOT: string;
  regsData: Subpartidaot[];
}

export interface Subpartidaot {
  idreg: number;
  idsubpartida: string;
  qty_ejecutar: number;
  idresponsable: string;
}

export interface Puttasksubpartidaot {
  userId: string;
  companyIdUSr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: string;
  regIdOT: string;
  regIdSubPartida:string;
  regsData: Tasksubpartidaot[];
}

export interface Tasksubpartidaot {
  idreg: number;
  idtask: string;
  nombre: string;
  hh_PTO: number;
  idresponsable: string;
}

export interface Getclndrweeknext4weeksRequest {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: number;
}

export interface Getclndrweeknext4weeksResponse {
  userId: string;
  companyIdUsr: string;
  companyIdSelect: string;
  clientId: string;
  projectId: number;
}


