import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {ChartDataSets, ChartType} from "chart.js";
import {BaseChartDirective, Color, Label} from "ng2-charts";
import * as _ from "lodash";

@Component({
  selector: 'app-grafico-weekly-turnos-kpi',
  templateUrl: './grafico-weekly-turnos-kpi.component.html',
  styleUrls: ['./grafico-weekly-turnos-kpi.component.scss']
})
export class GraficoWeeklyTurnosKpiComponent implements OnChanges {

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
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
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

  renderBarChart() {
    const graphTallas = _.map(this.distTallas.detalles[0].values, (graph) => {
      return {
        y: graph.value,
      }
    })
    const labels = _.map(this.distTallas.detalles[0].values, (graph) => {
      return graph.period
    })
    this.barChartData = [
      {
        data: graphTallas, lineTension: 0, fill: false, stack: 'a'
      }
    ];
    this.barChartLabels = labels
  }

}
