export interface InitiateFileLoadRequest {
  fileName: string;
  typeLoad: string;
}

export interface InitiateFileLoadResponse {
  id: number;
  code: number;
  error: any;
}
