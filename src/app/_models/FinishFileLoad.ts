export interface FinishFileLoadRequest {
  fileLoadId: number;
}

export interface FinishFileLoadResponse {
  id: number;
  code: number;
  error: any;
}
