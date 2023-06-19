/*
 * Copyright (c) 2023 Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

/** Generated from RBS SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, BehaviorSubject} from 'rxjs';
import {Movement} from '../../types/movement/movement.types';
import {TranslateService} from '@ngx-translate/core';

/**
 * Data source for the CommandBarComplexEnumFilter view. This class should
 * encapsulate all logic for fetching and manipulating the displayed
 * data (including sorting, pagination, and filtering).
 */
export class CommandBarComplexEnumFilterDataSource extends DataSource<Movement> {
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;

    private _data: Array<Movement> = new Array<Movement>();
    private _dataSubject = new BehaviorSubject<Array<Movement>>([]);

    constructor(private translateService: TranslateService) {
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
        this._data.push(...data);
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
                case 'moving':
                    return this.compare(a.moving, b.moving, isSortingAsc);
                case 'speedLimitWarning':
                    return this.compare(a.speedLimitWarning.toString(), b.speedLimitWarning.toString(), isSortingAsc);
                case 'startDate':
                    return this.compare(a.startDate, b.startDate, isSortingAsc);
                case 'endDate':
                    return this.compare(a.endDate, b.endDate, isSortingAsc);
                case 'resultState':
                    return this.compare(
                        a.resultState.resultStateAttributeValue.toString(),
                        b.resultState.resultStateAttributeValue.toString(),
                        isSortingAsc
                    );
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
        if (a === undefined) {
            return -1 * (isSortingAsc ? 1 : -1);
        }
        if (b === undefined) {
            return 1 * (isSortingAsc ? 1 : -1);
        }
        if (typeof a == 'boolean') {
            return (a === b ? 0 : a ? -1 : 1) * (isSortingAsc ? 1 : -1);
        }
        return (a < b ? -1 : 1) * (isSortingAsc ? 1 : -1);
    }
}
