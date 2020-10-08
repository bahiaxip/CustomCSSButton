import { Component, OnInit } from '@angular/core';
import { CustomService } from "../services/custom.service";
@Component({
  selector: 'pre-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  text:any="hola";
  constructor(public _customService:CustomService) { }

  ngOnInit() {
    console.log("info component");

  }



}
