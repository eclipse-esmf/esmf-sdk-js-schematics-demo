/*
 * Copyright (c) 2023 Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Movement, TrafficLight} from '../../shared/types/movement/movement.types';
import {Movement as Movement210} from '../../shared/types/movement/v210/movement.types';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  currentComponent = 'base-config';
  title = 'angular12-demo-app';

  basicMovementData: Movement[] = [];
  versionSupportData: Movement210[] = [];

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(): void {
    this.basicMovementData = [
      {
        isMoving: false,
        speedLimitWarning: TrafficLight.Green,
        position: {longitude: 1, latitude: 2, altitude: 3},
        speed: 100,
      },
      {
        isMoving: false,
        speedLimitWarning: TrafficLight.Yellow,
        position: {longitude: 4, latitude: 5, altitude: 6},
        speed: 80,
      },
      {
        isMoving: true,
        speedLimitWarning: TrafficLight.Red,
        position: {longitude: 7, latitude: 8, altitude: 9},
        speed: 30,
      },
    ];
    this.versionSupportData = [...this.basicMovementData];
  }

  copyToClipboard(event: string) {
    console.log(event);
    this._snackBar.open('Copied to clipboard!', '', {
      duration: 2000,
    });
  }

  rowClick(event: any): void {
    console.log('row was clicked', event);
    this._snackBar.open('Row was clicked!', '', {
      duration: 2000,
    });
  }

  changeComponent(compToView: string) {
    this.currentComponent = compToView;
    console.log('comp to view : ', this.currentComponent);
    this._snackBar.open('Change component!', '', {
      duration: 2000,
    });
  }
}
