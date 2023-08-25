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

/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/

import {TranslateService} from '@ngx-translate/core';

import {Inject, Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';

import {FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MatDateFormats} from '@angular/material/core';
import * as moment from 'moment';

export enum FilterEnums {
  Date,
  Search,
  Enum,
}

export type FilterType = {
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
export class CommandBarDateFilterTableFilterService {
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
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats,
    private dateAdapter: DateAdapter<any>,

    private translateService: TranslateService
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
      this.updateActiveFilters('startDate', `startDate: from ${this.getFormattedDate(startDate)} to ${this.getFormattedDate(endDate)}`);
    } else if (this.startDateGroup.value.end !== null) {
      const beginningOfDay = new Date(this.startDateGroup.value.end).setHours(23, 59, 59, 999);
      const endDate = this.createDateAsUTC(new Date(beginningOfDay));
      filteredData = filteredData.filter(item => new Date(item.startDate) <= new Date(endDate));
      this.updateActiveFilters('startDate', `startDate: until ${this.getFormattedDate(endDate)}`);
    } else if (this.startDateGroup.value.start !== null) {
      const startDate = this.createDateAsUTC(new Date(this.startDateGroup.value.start));
      filteredData = filteredData.filter(item => new Date(item.startDate) >= new Date(startDate));
      this.updateActiveFilters('startDate', `startDate: from ${this.getFormattedDate(startDate)}`);
    }
    if (this.endDateGroup.value.start !== null && this.endDateGroup.value.end !== null) {
      const startDate = this.createDateAsUTC(new Date(this.endDateGroup.value.start));
      const beginningOfDay = new Date(this.endDateGroup.value.end).setHours(23, 59, 59, 999);
      const endDate = this.createDateAsUTC(new Date(beginningOfDay));
      filteredData = filteredData.filter(
        item => new Date(endDate) >= new Date(item.endDate) && new Date(item.endDate) >= new Date(startDate)
      );
      this.updateActiveFilters('endDate', `endDate: from ${this.getFormattedDate(startDate)} to ${this.getFormattedDate(endDate)}`);
    } else if (this.endDateGroup.value.end !== null) {
      const beginningOfDay = new Date(this.endDateGroup.value.end).setHours(23, 59, 59, 999);
      const endDate = this.createDateAsUTC(new Date(beginningOfDay));
      filteredData = filteredData.filter(item => new Date(item.endDate) <= new Date(endDate));
      this.updateActiveFilters('endDate', `endDate: until ${this.getFormattedDate(endDate)}`);
    } else if (this.endDateGroup.value.start !== null) {
      const startDate = this.createDateAsUTC(new Date(this.endDateGroup.value.start));
      filteredData = filteredData.filter(item => new Date(item.endDate) >= new Date(startDate));
      this.updateActiveFilters('endDate', `endDate: from ${this.getFormattedDate(startDate)}`);
    }
    return filteredData;
  }
  updateActiveFilters(prop: string, label: string) {
    const filter = this.activeFilters.find(af => af.prop === prop);
    if (!filter) {
      this.activeFilters.push(<FilterType>{
        removable: true,
        type: FilterEnums.Date,
        label: label,
        prop: prop,
      });
    } else {
      filter.label = label;
    }
  }

  private createDateAsUTC(date: Date) {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
    ).toISOString();
  }

  private getFormattedDate(theDate: string) {
    return this.dateFormats.display.dateInput !== 'L'
      ? this.dateAdapter.format(moment(theDate).toDate(), this.dateFormats.display.dateInput)
      : new Date(theDate).toLocaleDateString(this.translateService.currentLang, {timeZone: 'UTC'});
  }
}
