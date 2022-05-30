export interface TypeFileResponse {

  detalles: [{
    id: number,
    descripcion: string
  }];
  numregsend: number;
}

export interface TypeFile {
  id: number;
  descripcion: string;
}
