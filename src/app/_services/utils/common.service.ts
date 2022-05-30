import {Injectable} from '@angular/core';
import Swal from "sweetalert2";
import * as _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  currentUser = JSON.parse(<string>sessionStorage.getItem('currentUser'));
  companyId: string = this.currentUser.companyId;
  userId: string = this.currentUser.username;

  constructor() {
  }

  public getCurrentUser(): void {
    return this.currentUser;
  }

  public getCompanyId(): string {
    return this.companyId;
  }

  public getUserId(): string {
    return this.userId;
  }

  alertError(titulo?: string, mensaje?: string) {
    Swal.fire(titulo, mensaje, 'error');
  }

  alertSuccess(titulo?: string, mensaje?: string) {
    Swal.fire(titulo, mensaje, 'success');
  }

  alertInfo(titulo?: string, mensaje?: string) {
    Swal.fire(titulo, mensaje, 'info');
  }

  alertWarning(titulo?: string, mensaje?: string) {
    Swal.fire(titulo, mensaje, 'warning');
  }

  cleanObj(obj: { [x: string]: any; }) {
    for (const propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    return obj
  }

  alertWithOption(title?: any, text?: any, icon?: any, confirmButtonText?: any, showCancelButton: boolean = true) {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton,
      cancelButtonText: 'Cancelar',
      confirmButtonText
    }).then((result: any) => {
      if (result.value) {
        return result
      }
    })
  }

  loading(title: any = 'Loading', html: any = 'Please Wait...') {
    Swal.fire({
      title,
      html,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  }

  toObject(arr: any) {
    let obj = {}
    for (let i = 0; i < arr.length; i++) {
      arr[i] = Object.assign(obj, arr[i])
    }
    return obj
  }

  getValue(object: any, path: any) {
    return path.replace(/\[/g, '.').replace(/\]/g, '').split('.').reduce((o: any, k: any) => (o || {})[k], object);
  }

  showUpdatedItem(itemArray: any, newItem: any) {
    let updateItem = itemArray.items.find(this.findIndexToUpdate, newItem.id);

    let index = itemArray.items.indexOf(updateItem);


    itemArray.items[index] = newItem;

  }

  findIndexToUpdate(newItem: any) {
    return newItem.id === this;
  }

  currencyFormatter(num: any) {
    if (num.value === null || num.value === undefined || num.value === "") {
      return
    }
    const data = num.value;
    return Math.floor(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  decimal(num: any) {
    if (num.value === null || num.value === undefined || num.value === "") {
      return
    }
    return ((_.toNumber(num.value)).toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  pesoFormatter(num: any) {
    if (num.value === null || num.value === undefined) {
      return
    }
    const data = num.value;
    return `$${Math.floor(data).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`;
  }

}
