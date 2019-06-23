import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../../services/global.service";

import { TfData } from "./TfData";
const tfdata = new TfData();

@Component({
  selector: 'app-mnist',
  templateUrl: './mnist.component.html',
  styleUrls: ['./mnist.component.css']
})
export class MnistComponent implements OnInit {

  constructor(private service: GlobalService) {

  }

  ngOnInit() {
    this.service.changePageTitle('YY');
    tfdata.printit();
  }

}
