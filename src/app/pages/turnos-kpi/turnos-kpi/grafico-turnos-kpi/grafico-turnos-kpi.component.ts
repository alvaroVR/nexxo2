import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, Color, Label} from "ng2-charts";
import {ChartDataSets, ChartType} from "chart.js";
import * as _ from 'lodash';


@Component({
  selector: 'app-grafico-turnos-kpi',
  templateUrl: './grafico-turnos-kpi.component.html',
  styleUrls: ['./grafico-turnos-kpi.component.scss']
})
export class GraficoTurnosKpiComponent implements OnChanges {

  @Input() dataGrafico: any;
  @Input() graph: any;
  @Input() show: any = false;
  @ViewChild("baseChart", {static: false})
  chart: BaseChartDirective | any;

  public legendItemBar: any;
  public barChart: any;
  public barChartData: ChartDataSets[] | any;
  public barChartLabels: Label[] | any;
  public barChartColors: Color[] = [{}];
  public barChartLegend = true;
  public barChartType = 'bar';
  public barChartPlugins = [];
  public distTallas: any


  public barChartOptions = {};


  constructor() {
  }

  ngOnChanges() {
    if (this.dataGrafico) {
      this.barChartOptions = {
        type: 'bar',
        title: {
          display: true,
          text: this.dataGrafico.title
        },
        legend: {
          display: true,
          labels: {
            hidden: false
          }
        },
        responsive: true,
        maintainAspectRatio: false,
      };
      this.distTallas = this.dataGrafico
      this.barChartData = this.dataGrafico.datasets;
      this.barChartLabels = this.dataGrafico.labels[0];
      if (this.chart !== undefined) {
        this.chart.ngOnDestroy();
        this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
      }
    }
  }


}
