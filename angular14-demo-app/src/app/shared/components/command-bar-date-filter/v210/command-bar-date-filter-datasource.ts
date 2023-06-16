/** Generated from RBS JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, BehaviorSubject} from 'rxjs';
import {Movement} from '../../../types/movement/v210/movement.types';
/**
 * Data source for the CommandBarDateFilter view. This class should
 * encapsulate all logic for fetching and manipulating the displayed
 * data (including sorting, pagination, and filtering).
 */
export class CommandBarDateFilterDataSource extends DataSource<Movement> {
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;

    remoteAPI: string | undefined;

    private _data: Array<Movement> = new Array<Movement>();
    private _dataSubject = new BehaviorSubject<Array<Movement>>([]);

    constructor() {
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
        this.setDataSubject(this._data);
    }

    get length(): number {
        return this._data.length;
    }
}
