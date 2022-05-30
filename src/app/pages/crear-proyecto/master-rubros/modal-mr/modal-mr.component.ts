import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {FormGroup} from "@angular/forms";
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-modal-mr',
  templateUrl: './modal-mr.component.html',
  styleUrls: ['./modal-mr.component.scss']
})
export class ModalMrComponent implements OnInit {
  title: string | any;
  message: string| any;
  data: any;

  public onClose: Subject<any> | any;
  asigForm: FormGroup | any;


  constructor(public bsModalRef: BsModalRef) {
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
