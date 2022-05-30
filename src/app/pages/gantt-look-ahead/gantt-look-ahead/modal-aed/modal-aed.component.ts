import {Component} from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommonService} from "../../../../_services/utils/common.service";
import {BsModalRef} from "ngx-bootstrap";



@Component({
  selector: 'app-modal-aed',
  templateUrl: './modal-aed.component.html',
  styleUrls: ['./modal-aed.component.scss']
})
export class ModalAedComponent {
  title: string | any;
  message: string | any;
  data: any;

  public onClose: Subject<any> |any;
  asigForm: FormGroup | any;


  constructor(public bsModalRef: BsModalRef, public common: CommonService,
              private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }


  public onConfirm(request:any): void {
    this.onClose.next(request);
    this.bsModalRef.hide();
  }

  public onConfirmNuevo(request:any): void {
    this.onClose.next(request);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }


}
