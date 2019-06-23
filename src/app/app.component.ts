import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { GlobalService } from "./services/global.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Jingles';

  constructor(private service: GlobalService, private titleService:Title){

  }

  ngOnInit(){
    this.updatePageTitle();
  }

  updatePageTitle(){
    this.service.
      updatePageTitle.subscribe((title:string) => {
        this.titleService.setTitle(title);
        this.title = title;
      });
  }

}
