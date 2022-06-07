import {Component, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-turnos-kpi',
  templateUrl: './turnos-kpi.component.html',
  styleUrls: ['./turnos-kpi.component.scss']
})
export class TurnosKpiComponent implements OnInit {

  turnosForm: FormGroup | any;


  constructor() {
  }

  ngOnInit(): void {
  }


  getdeturnoskpi() {
  }

}
