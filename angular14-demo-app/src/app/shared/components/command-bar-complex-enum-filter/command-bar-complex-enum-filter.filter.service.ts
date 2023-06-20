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

/** Generated from SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/

import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {Movement, ResultState, WarningLevel} from '../../types/movement/movement.types';

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
export class CommandBarComplexEnumFilterFilterService {
  speedLimitWarningSelected: Array<WarningLevel> = [];
  speedLimitWarningOptions: Array<any> = Object.values(WarningLevel);
  resultStateSelected: Array<string> = [];
  resultStateOptions: Array<any> = ResultState.getValueDescriptionList('resultState');

  constructor(private translateService: TranslateService) {}

  /** Array of active filters */
  activeFilters: FilterType[] = [];

  /** Removes a specific filter. */
  removeFilter(filter: FilterType) {
    switch (filter.type) {
      case FilterEnums.Enum:
        if (filter.prop === 'speedLimitWarning') {
          this.speedLimitWarningSelected = this.speedLimitWarningSelected.filter(sel => sel !== filter.filterValue);
        }
        if (filter.prop === 'resultState.resultStateAttributeValue') {
          this.resultStateSelected = this.resultStateSelected.filter(sel => sel !== filter.filterValue);
        }
        break;
    }

    this.activeFilters = this.activeFilters.filter(af => af.filterValue !== filter.filterValue && af.label !== filter.label);
  }

  /**
   * Get a value using a dot access path
   * @param accessPath access path e.g. object.attrL1.attrL2
   * @param object value behind the path or '' if not found/doesn't exist
   */
  getValueByAccessPath(accessPath: string, object: any) {
    try {
      return accessPath.split('.').reduce((a, b) => a[b], object);
    } catch (error) {
      return '';
    }
  }

  applyEnumFilter(data: Array<Movement>) {
    let filteredData = data;
    filteredData =
      this.speedLimitWarningSelected.length === 0
        ? filteredData
        : filteredData.filter((item: Movement): boolean => this.speedLimitWarningSelected.includes(item.speedLimitWarning));
    this.speedLimitWarningSelected.forEach(selected => {
      const filterProp = 'speedLimitWarning';
      const filterVal = selected;
      if (!this.activeFilters.map(af => af.filterValue).includes(filterVal)) {
        this.activeFilters.push(<FilterType>{
          removable: true,
          type: FilterEnums.Enum,
          label: `${selected}`,
          prop: filterProp,
          filterValue: filterVal,
        });
      }
    });

    this.activeFilters
      .filter(af => af.prop === 'speedLimitWarning')
      .forEach(filter => {
        if (!this.speedLimitWarningSelected.includes(filter.filterValue as any)) {
          this.removeFilter(filter);
        }
      });
    filteredData =
      this.resultStateSelected.length === 0
        ? filteredData
        : filteredData.filter((item: Movement): boolean => this.resultStateSelected.includes(item.resultState.resultStateAttributeValue));
    this.resultStateSelected.forEach(selected => {
      const filterProp = 'resultState.resultStateAttributeValue';
      const filterVal = selected;
      if (!this.activeFilters.map(af => af.filterValue).includes(filterVal)) {
        this.activeFilters.push(<FilterType>{
          removable: true,
          type: FilterEnums.Enum,
          label: `${selected} - ${this.translateService.instant(
            this.resultStateOptions
              .filter(option => option.value === selected)
              .map(option => option.translationKey)
              .join('')
          )}`,
          prop: filterProp,
          filterValue: filterVal,
        });
      }
    });

    this.activeFilters
      .filter(af => af.prop === 'resultState.resultStateAttributeValue')
      .forEach(filter => {
        if (!this.resultStateSelected.includes(filter.filterValue as any)) {
          this.removeFilter(filter);
        }
      });

    return filteredData;
  }
}
