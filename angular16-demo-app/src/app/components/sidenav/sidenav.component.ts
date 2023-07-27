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
import {Movement, WarningLevel} from '../../shared/types/movement/movement.types';
import {Movement as Movement210} from '../../shared/types/movement/v210/movement.types';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  currentComponent = 'base-config';
  title = 'angular12-demo-app';

  basicMovementTableData: Movement[] = [];
  versionSupportData: Movement210[] = [];

  constructor(private _snackBar: MatSnackBar) {}

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
        endDate: new Date(),
      },
      {
        moving: false,
        speedLimitWarning: WarningLevel.Yellow,
        position: {x: 4, y: 5, z: 6},
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        moving: true,
        speedLimitWarning: WarningLevel.Yellow,
        position: {x: 7, y: 8, z: 9},
        startDate: new Date(),
        endDate: new Date(),
      },
    ];
    this.versionSupportData = [...this.basicMovementTableData];
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
