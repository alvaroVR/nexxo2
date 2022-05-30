import {Component, OnInit} from '@angular/core';
import {TypeFile, TypeFileResponse} from "../../../_models/TypeFile";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommonService} from "../../../_services/utils/common.service";
import {RxwebValidators} from "@rxweb/reactive-form-validators";
import {UploadMixService} from "./upload-mix.service";

@Component({
  selector: 'app-upload-mix',
  templateUrl: './upload-mix.component.html',
  styleUrls: ['./upload-mix.component.scss']
})
export class UploadMixComponent implements OnInit {

  public typeList: Array<TypeFile> | undefined;
  public fileContent: any
  public linesData: Array<any> = [];
  public fileName: any
  public submitted: Boolean = false;
  public btnEnviar: Boolean = false;
  public arr: any = [];
  public lineasMaximas = 0;

  public regsData: any;
  public srcResult: any;

  data: any;
  headData: any;
  fileUploadForm: FormGroup;

  constructor(private uploadMixService: UploadMixService, private fb: FormBuilder, private common: CommonService) {
    this.fileUploadForm = this.fb.group({
      fileControl: new FormControl(null, [Validators.required, RxwebValidators.file({minFiles: 1, maxFiles: 1})]),
      typeFileControl: new FormControl(null, [Validators.required, Validators.min(1),]),
    });
  }

  ngOnInit() {
    this.getTypeList();
  }

  public onChange(fileInfo: any): void {
    try {
      const fileList = fileInfo.target.files
      if (!fileList) {
        let file = ''
        let fileName = ''
        this.fileName = null;
        return
      }
      this.linesData = []

      // @ts-ignore
      let file = fileList[0];
      let fileReader: FileReader = new FileReader();
      // @ts-ignore
      if (fileList[0]) {
        // @ts-ignore
        let fileName = fileList[0].name
        this.fileName = fileName
        fileReader.onloadend = (x) => {
          const lineas = []
          this.fileContent = fileReader.result;
          for (const line of this.fileContent.split(/[\r\n]+/)) {
            lineas.push(line)
          }

          if (lineas.length > this.lineasMaximas) {
            this.common.alertInfo('Exceso de líneas', `El archivo excede las ${this.lineasMaximas} líneas`)
            this.linesData = []
            this.btnEnviar = true
          } else {
            this.linesData = lineas
            this.btnEnviar = false
          }
        };
        fileReader.readAsText(file);
      }
    } catch {

    }

  }

  get formUploadMix() {
    return this.fileUploadForm.controls;
  }

  getTypeList() {
    const request = {
      userId: this.common.userId
    }
    this.uploadMixService.getTypeFile(request).subscribe((typeList: TypeFileResponse) => {
      this.typeList = typeList.detalles;
      this.lineasMaximas = typeList.numregsend
    });
  }

  sendFile() {

    this.submitted = true
    if (this.fileUploadForm.invalid) {
      return;
    }

    this.common.loading()

    const initiateFile = {
      typeLoad: this.fileUploadForm.controls['typeFileControl'].value,
      fileName: this.fileUploadForm.controls['fileControl'].value,
      userId: this.common.userId
    };

    this.uploadMixService.initiateFileLoad(initiateFile).subscribe((response: any) => {
      if (response.code !== 0) {
        this.common.alertError('Error en el envío del archivo')
        return
      }
      const id = response.id;
      this.sendExcel(id);
    }, (error: any) => {
      this.common.alertError('Error en el envío del archivo')
    });
  }

  sendExcel(id: any) {
    for (let i = 0; i < this.linesData.length; i++) {
      this.regsData = {
        seq: i + 1,
        reg: this.linesData[i]
      };
      this.arr.push(this.regsData);
    }
    const request = {
      fileLoadId: id,
      regsData: this.arr
    };

    this.uploadMixService.putregfileload(request).subscribe((response: any) => {
      if (response.code !== 0) {
        this.common.alertError('Error en el envío del archivo')
        return
      }
      this.sendFinishFile(id);
      this.linesData = [];
    }, (error: any) => {
      this.common.alertError('Error en el envío del archivo')
    });
  }

  sendFinishFile(id: any) {
    const params = {
      fileLoadId: id
    };
    this.uploadMixService.finishfileload(params).subscribe((response: any) => {
      if (response.code !== 0) {
        this.common.alertError('Error en el envío del archivo')
        return
      }
      this.common.alertWithOption('Elementos envíados', 'Envío exitoso', 'success', 'Aceptar')
        .then(() => {
          this.linesData = [];
          this.fileName = ''
          this.submitted = false
          this.arr = []
          //this.onChange()
        });

    }, (error: any) => {
      if (error) {
        this.common.alertError('Error en el envío del archivo')
      }
    });
  }

  onFileSelected(file: any) {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

}
