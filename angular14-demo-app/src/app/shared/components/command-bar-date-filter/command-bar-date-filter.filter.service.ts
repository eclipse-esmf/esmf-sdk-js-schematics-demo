/** Generated from RBS SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/

import {TranslateService} from '@ngx-translate/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Injectable, Inject} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {DateAdapter, MatDateFormats, MAT_DATE_FORMATS} from '@angular/material/core';
import moment from 'moment';

import {Movement} from '../../types/movement/movement.types';

export enum FilterEnums {
    Date,
    Search,
    Enum,
}

type FilterType = {
    type: FilterEnums;
    label: string;
    prop: string | null;
    filterValue?: string;
    removable?: boolean;
};

/**
 * Custom service used for table filtering logic
 */
@Injectable({
    providedIn: 'root',
})
export class CommandBarDateFilterFilterService {
    /** Array of active filters */
    activeFilters: FilterType[] = [];

    startDateGroup = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });
    endDateGroup = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
    });

    constructor(
        private translateService: TranslateService,
        @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
        private dateAdapter: DateAdapter<any>
    ) {}

    /** Removes a specific filter. */
    removeFilter(filter: FilterType) {
        switch (filter.type) {
            case FilterEnums.Date:
                if (filter.prop === 'startDate') {
                    this.startDateGroup.reset();
                    this.startDateGroup.reset();
                }
                if (filter.prop === 'endDate') {
                    this.endDateGroup.reset();
                    this.endDateGroup.reset();
                }
                this.activeFilters = this.activeFilters.filter(af => af.filterValue !== filter.filterValue && af.label !== filter.label);
                break;
        }
    }

    applyDateFilter(data: Array<any>): Array<any> {
        let filteredData = data;
        if (this.startDateGroup.value.start !== null && this.startDateGroup.value.end !== null) {
            const startDate = this.createDateAsUTC(new Date(this.startDateGroup.value.start));
            const beginningOfDay = new Date(this.startDateGroup.value.end).setHours(23, 59, 59, 999);
            const endDate = this.createDateAsUTC(new Date(beginningOfDay));
            filteredData = filteredData.filter(
                item => new Date(endDate) >= new Date(item.startDate) && new Date(item.startDate) >= new Date(startDate)
            );
            const filter = this.activeFilters.find(af => af.prop === 'startDate');
            const newLabel = `startDate: from ${this.getFormattedDate(startDate)} to ${this.getFormattedDate(endDate)}`;
            if (!filter) {
                this.activeFilters.push(<FilterType>{
                    removable: true,
                    type: FilterEnums.Date,
                    label: newLabel,
                    prop: 'startDate',
                });
            } else {
                filter.label = newLabel;
            }
        } else if (this.startDateGroup.value.end !== null) {
            const beginningOfDay = new Date(this.startDateGroup.value.end).setHours(23, 59, 59, 999);
            const endDate = this.createDateAsUTC(new Date(beginningOfDay));
            filteredData = filteredData.filter(item => new Date(item.startDate) <= new Date(endDate));
            const filter = this.activeFilters.find(af => af.prop === 'startDate');
            const newLabel = `startDate: until ${this.getFormattedDate(endDate)}`;
            if (!filter) {
                this.activeFilters.push(<FilterType>{
                    removable: true,
                    type: FilterEnums.Date,
                    label: newLabel,
                    prop: 'startDate',
                });
            } else {
                filter.label = newLabel;
            }
        } else if (this.startDateGroup.value.start !== null) {
            const startDate = this.createDateAsUTC(new Date(this.startDateGroup.value.start));
            filteredData = filteredData.filter(item => new Date(item.startDate) >= new Date(startDate));
            const filter = this.activeFilters.find(af => af.prop === 'startDate');
            const newLabel = `startDate: from ${this.getFormattedDate(startDate)}`;
            if (!filter) {
                this.activeFilters.push(<FilterType>{
                    removable: true,
                    type: FilterEnums.Date,
                    label: newLabel,
                    prop: 'startDate',
                });
            } else {
                filter.label = newLabel;
            }
        }
        if (this.endDateGroup.value.start !== null && this.endDateGroup.value.end !== null) {
            const startDate = this.createDateAsUTC(new Date(this.endDateGroup.value.start));
            const beginningOfDay = new Date(this.endDateGroup.value.end).setHours(23, 59, 59, 999);
            const endDate = this.createDateAsUTC(new Date(beginningOfDay));
            filteredData = filteredData.filter(
                item => new Date(endDate) >= new Date(item.endDate) && new Date(item.endDate) >= new Date(startDate)
            );
            const filter = this.activeFilters.find(af => af.prop === 'endDate');
            const newLabel = `endDate: from ${this.getFormattedDate(startDate)} to ${this.getFormattedDate(endDate)}`;
            if (!filter) {
                this.activeFilters.push(<FilterType>{
                    removable: true,
                    type: FilterEnums.Date,
                    label: newLabel,
                    prop: 'endDate',
                });
            } else {
                filter.label = newLabel;
            }
        } else if (this.endDateGroup.value.end !== null) {
            const beginningOfDay = new Date(this.endDateGroup.value.end).setHours(23, 59, 59, 999);
            const endDate = this.createDateAsUTC(new Date(beginningOfDay));
            filteredData = filteredData.filter(item => new Date(item.endDate) <= new Date(endDate));
            const filter = this.activeFilters.find(af => af.prop === 'endDate');
            const newLabel = `endDate: until ${this.getFormattedDate(endDate)}`;
            if (!filter) {
                this.activeFilters.push(<FilterType>{
                    removable: true,
                    type: FilterEnums.Date,
                    label: newLabel,
                    prop: 'endDate',
                });
            } else {
                filter.label = newLabel;
            }
        } else if (this.endDateGroup.value.start !== null) {
            const startDate = this.createDateAsUTC(new Date(this.endDateGroup.value.start));
            filteredData = filteredData.filter(item => new Date(item.endDate) >= new Date(startDate));
            const filter = this.activeFilters.find(af => af.prop === 'endDate');
            const newLabel = `endDate: from ${this.getFormattedDate(startDate)}`;
            if (!filter) {
                this.activeFilters.push(<FilterType>{
                    removable: true,
                    type: FilterEnums.Date,
                    label: newLabel,
                    prop: 'endDate',
                });
            } else {
                filter.label = newLabel;
            }
        }
        return filteredData;
    }
    private createDateAsUTC(date: Date) {
        return new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
        ).toISOString();
    }
    private getFormattedDate(theDate: string) {
        return this.dateFormats.display.dateInput !== 'L'
            ? this.dateAdapter.format(moment(theDate), this.dateFormats.display.dateInput)
            : new Date(theDate).toLocaleDateString(this.translateService.currentLang, {
                  timeZone: 'UTC',
              });
    }
}
