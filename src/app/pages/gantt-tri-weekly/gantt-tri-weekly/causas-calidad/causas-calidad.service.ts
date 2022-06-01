import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Observable} from "rxjs";
import {ModalCausasExcesoComponent} from "../modal-causas-exceso/modal-causas-exceso.component";
import {CausasCalidadComponent} from "./causas-calidad.component";

@Injectable({
  providedIn: 'root'
})
export class CausasCalidadService {
  bsModalRef: BsModalRef | any

  constructor(public bsModalService: BsModalService) {
  }

  public alerta(title: string, message: string, data: any): Observable<string> {
    const initialState = {
      title, message, data
    }
    this.bsModalRef = this.bsModalService.show(CausasCalidadComponent, {
      initialState,
      class: 'modal-md',
      ignoreBackdropClick: true
    });

    return new Observable<any>(this.getAlertaSuscriber());
  }

  public response() {
    return this.bsModalRef;
  }

  private getAlertaSuscriber() {
    return (observer: any) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason: any) => {
        observer.complete();
      });
      return {
        unsubscribe() {
          subscription.unsubscribe();
        }
      }
    }
  }

}
