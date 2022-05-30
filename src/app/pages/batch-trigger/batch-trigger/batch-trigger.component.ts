import {Component, OnInit} from '@angular/core';
import {BatchTriggerService} from "../batch-trigger.service";
import Swal from "sweetalert2";
import {CommonService} from "../../../_services/utils/common.service";

@Component({
  selector: 'app-batch-trigger',
  templateUrl: './batch-trigger.component.html',
  styleUrls: ['./batch-trigger.component.scss']
})
export class BatchTriggerComponent implements OnInit {

  batchData: any;

  constructor(public batchTriggerService: BatchTriggerService, public common: CommonService) {
  }

  ngOnInit(): void {
    this.getDetProcessBatchMngr()
  }

  getDetProcessBatchMngr() {
    const request = {
      userId: this.common.userId,
      companyId: this.common.companyId
    }
    this.common.loading()
    this.batchTriggerService.getDetProcessBatchMngr(request).subscribe(r => {
      if (r.code !== 0) {
        return this.common.alertError('Error', r.error)
      }
      this.batchData = r.detalles
      Swal.close()
    }, error => {
      this.common.alertError('Error', error.error)
    })
  }
}
