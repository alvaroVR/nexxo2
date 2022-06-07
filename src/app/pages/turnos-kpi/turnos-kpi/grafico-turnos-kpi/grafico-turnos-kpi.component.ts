import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartType} from "chart.js";

@Component({
  selector: 'app-grafico-turnos-kpi',
  templateUrl: './grafico-turnos-kpi.component.html',
  styleUrls: ['./grafico-turnos-kpi.component.scss']
})
export class GraficoTurnosKpiComponent implements OnChanges {

  @Input() graph: any;
  @Input() show: any;
  public lineChart: any;
  public lineChartData: ChartDataSets[] | any;
  public lineChartLabels: Label[] | any;
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  public lineChartColors: Color[] = [{}];
  public lineChartOptions = { maintainAspectRatio: false};

  options: any = null;

  constructor() {

  }

  ngOnChanges() {
    if (this.graph) {
      this.lineChartData = this.graph.lineChartData;
      this.lineChartLabels = this.graph.labels[0]
    }
  }

  reload() {


  }


}
