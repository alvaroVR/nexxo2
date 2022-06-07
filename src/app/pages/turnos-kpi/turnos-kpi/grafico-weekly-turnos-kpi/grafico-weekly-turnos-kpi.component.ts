import {Component, Input, OnChanges} from '@angular/core';
import {ChartDataSets, ChartType} from "chart.js";
import {Color, Label} from "ng2-charts";

@Component({
  selector: 'app-grafico-weekly-turnos-kpi',
  templateUrl: './grafico-weekly-turnos-kpi.component.html',
  styleUrls: ['./grafico-weekly-turnos-kpi.component.scss']
})
export class GraficoWeeklyTurnosKpiComponent implements OnChanges {

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
    if (this.graph && this.show) {
      debugger
      this.lineChartData = this.graph.lineChartData;
      this.lineChartLabels = this.graph.labels[0]
    }
  }

  reload() {


  }


}
