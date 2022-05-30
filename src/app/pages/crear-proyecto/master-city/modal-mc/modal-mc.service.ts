import {Injectable} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {Observable} from "rxjs";
import {ModalMcComponent} from "./modal-mc.component";

@Injectable({
  providedIn: 'root'
})
export class ModalMcService {

  bsModalRef: BsModalRef | any

  constructor(public bsModalService: BsModalService) {
  }

  public alerta(title: string, message: string, data: any): Observable<string> {
    const initialState = {
      title, message, data
    }
    this.bsModalRef = this.bsModalService.show(ModalMcComponent, {
      initialState,
      class: 'modal-lg',
      ignoreBackdropClick: true
    });

    return new Observable<any>(this.getAlertaSuscriber());
  }

  public response() {
    return this.bsModalRef;
  }

  private getAlertaSuscriber() {
    return (observer: any) => {
      const subscription = this.bsModalService.onHidden.subscribe((reason) => {
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
