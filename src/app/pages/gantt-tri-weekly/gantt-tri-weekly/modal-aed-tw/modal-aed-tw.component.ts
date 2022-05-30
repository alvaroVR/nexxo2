import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap";
import {CommonService} from "../../../../_services/utils/common.service";

@Component({
  selector: 'app-modal-aed-tw',
  templateUrl: './modal-aed-tw.component.html',
  styleUrls: ['./modal-aed-tw.component.scss']
})
export class ModalAedTwComponent implements OnInit {
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
