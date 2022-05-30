import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {WorkersService} from "./workers.service";
import {CommonService} from "../../../_services/utils/common.service";

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.scss']
})
export class WorkersComponent implements OnInit {

  workerList: any;

  constructor(private workerService: WorkersService, private common: CommonService) {
  }

  ngOnInit() {
    this.getdettrabajadores()
  }


  getdettrabajadores() {
    const request = {
      userId: this.common.userId
    }
    this.common.loading();
    this.workerService.getdettrabajadores(request).subscribe((r:any) => {
      Swal.close()
      if (r.code !== 0) {
        return this.common.alertError('', r.error)
      }
      this.workerList = r.detalles
      console.log(this.workerList)
    }, (error: any) => {
      this.common.alertError('', error.message)
    })
  }

}
