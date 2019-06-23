import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  updatePageTitle = new EventEmitter();

  constructor() {

  }

  changePageTitle(title:string){
    this.updatePageTitle.emit(title);
  }

}
