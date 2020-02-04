import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../services/global.service";
import { ClusteringD3ForceChartMain } from "./clustering-d3-force-chart-main";

@Component({
  selector: 'app-clustering-d3-force-chart',
  templateUrl: './clustering-d3-force-chart.component.html',
  styleUrls: ['./clustering-d3-force-chart.component.css']
})
export class ClusteringD3ForceChartComponent implements OnInit {

  api_main: ClusteringD3ForceChartMain;

  constructor(private service: GlobalService) { }

  ngOnInit() {
    this.service.changePageTitle('Force Chart');
    this.api_main = new ClusteringD3ForceChartMain();

    this.api_main.init();
  }

}
