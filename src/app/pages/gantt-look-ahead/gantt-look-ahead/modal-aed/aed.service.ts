import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ModalAedComponent} from "./modal-aed.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap";



@Injectable({
  providedIn: 'root'
})
export class AedService {
  bsModalRef: BsModalRef | any

  constructor(public bsModalService: BsModalService) {
  }

  public alerta(title: string, message: string, data: any): Observable<string> {
    const initialState = {
      title, message, data
    }
    this.bsModalRef = this.bsModalService.show(ModalAedComponent, {
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
