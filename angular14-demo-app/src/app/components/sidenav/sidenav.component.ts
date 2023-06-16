import { Component, OnInit } from '@angular/core';
import {Movement, WarningLevel} from "../../shared/types/movement/movement.types";
import {Movement as Movement210} from "../../shared/types/movement/v210/movement.types";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  currentComponent = 'base-config';
  title = 'angular12-demo-app';

  basicMovementTableData: Movement[] = [];
  versionSupportData: Movement210[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    this.basicMovementTableData = [
      {
        moving: false,
        speedLimitWarning: WarningLevel.Green,
        position: {x: 1, y: 2, z: 3},
        startDate: new Date(),
        endDate: new Date()
      },
      {
        moving: false,
        speedLimitWarning: WarningLevel.Yellow,
        position: {x: 4, y: 5, z: 6},
        startDate: new Date(),
        endDate: new Date()
      },
      {
        moving: true,
        speedLimitWarning: WarningLevel.Yellow,
        position: {x: 7, y: 8, z: 9},
        startDate: new Date(),
        endDate: new Date()
      }
    ]
    this.versionSupportData = [...this.basicMovementTableData];
  }

  copyToClipboard(event: string) {
    console.log(event);
  }

  rowClick(event: any): void {
    console.log('row was clicked', event);
  }

  changeComponent(compToView: string) {
    this.currentComponent = compToView;

    console.log('comp to view : ', this.currentComponent);
  }

}
