/*
 * Copyright (c) 2024 Robert Bosch Manufacturing Solutions GmbH
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

/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable} from 'rxjs';
import {Movement} from '../../types/movement/movement.types';

/**
 * Data source for the CommandBarTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed
 * data (including sorting, pagination, and filtering).
 */
export class CommandBarTableDataSource extends DataSource<Movement> {
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private _data: Array<Movement> = new Array<Movement>();
  private _dataSubject = new BehaviorSubject<Array<Movement>>([]);

  constructor(private translateService: TranslocoService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will
   * only update when the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Array<Movement>> {
    return this._dataSubject.asObservable();
  }

  get displayedData(): Array<Movement> {
    return this._dataSubject.value;
  }

  get data(): Array<Movement> {
    return this._data;
  }

  /**
   * Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this._dataSubject.complete();
  }

  setDataSubject(data: Array<Movement>): void {
    this._dataSubject.next(data);
  }

  setData(data: Array<Movement>) {
    this._data = [];
    this.addData(data);
  }

  addData(data: Array<Movement>) {
    data.forEach(item => {
      this._data.push(JSON.parse(JSON.stringify(item)));
    });

    this.setDataSubject(this.getPagedData(this.sortData(this._data)));
  }

  get length(): number {
    return this._data.length;
  }

  private getPagedData(data: Array<Movement>): Array<Movement> {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.slice(startIndex, startIndex + this.paginator.pageSize);
    } else {
      return data;
    }
  }

  sortData(data = this._data): Movement[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a: Movement, b: Movement): number => {
      const isSortingAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active.trim()) {
        case 'isMoving':
          return this.compare(a.isMoving, b.isMoving, isSortingAsc);
        case 'speed':
          return this.compare(a.speed, b.speed, isSortingAsc);
        case 'speedLimitWarning':
          return this.compare(a.speedLimitWarning.toString(), b.speedLimitWarning.toString(), isSortingAsc);
        default:
          return 0;
      }
    });
  }

  private compare(
    a: string | number | boolean | Date | undefined,
    b: string | number | boolean | Date | undefined,
    isSortingAsc: boolean
  ): number {
    if (a === undefined || b === undefined) {
      return (a === undefined ? -1 : 1) * (isSortingAsc ? 1 : -1);
    }

    if (typeof a === 'boolean') {
      return (a === b ? 0 : a ? -1 : 1) * (isSortingAsc ? 1 : -1);
    }

    return (a < b ? -1 : 1) * (isSortingAsc ? 1 : -1);
  }
}
