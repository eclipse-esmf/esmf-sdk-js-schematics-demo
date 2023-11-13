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

import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

import {Movement, TrafficLight} from '../../../types/movement/v210/movement.types';

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

export enum SortCard {
  ASCENDING,
  DESCENDING,
}

export const validateInputsValidator = (pattern: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const allowedCharacters = new RegExp(pattern);

    //allow input to be empty
    if (value?.length === 0) {
      return null;
    }

    //trigger error if input has blank space
    if (value?.indexOf(' ') === 0 || value?.endsWith(' ')) {
      return {blankSpace: true};
    }

    // no validation pattern
    if (!pattern || !pattern.length) {
      return null;
    }

    //trigger error if input does not meet the pattern criteria
    if (value?.length > 0 && !value?.match(allowedCharacters)) {
      return {invalidInput: true};
    }

    return null;
  };
};

export const validateInputLength = (minNoCharacters: number, maxNoCharacters: number): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // no validation required
    if (!minNoCharacters && !maxNoCharacters) {
      return null;
    }

    //allow input to be empty
    if (value?.length === 0) {
      return null;
    }

    //trigger error if input has less characters than minNoCharacters
    if (minNoCharacters && value?.length < minNoCharacters) {
      return {minCharNo: true};
    }

    //trigger error if input has more characters than maxNoCharacters
    if (maxNoCharacters && value?.length > maxNoCharacters) {
      return {maxCharNo: true};
    }

    return null;
  };
};

/**
 * Custom service used for table filtering logic
 */
@Injectable({
  providedIn: 'root',
})
export class VersionSupportCardFilterService {
  /** Array of active filters */
  activeFilters: FilterType[] = [];

  searchString = new FormControl<string | null>('');
  stringColumns: string[] = ['speedLimitWarning'];
  readonly advancedSearchAllValue = 'allTextFields';
  selectedStringColumn: FormControl<string | null> = new FormControl(this.advancedSearchAllValue);

  speedLimitWarningSelected: Array<TrafficLight> = [];
  speedLimitWarningOptions: Array<any> = Object.values(TrafficLight);

  sortCard = SortCard.ASCENDING;
  sortedProperty = '';

  constructor(private translateService: TranslateService) {}

  searchStringInit(initialValue: string, regexValidator: string, minCharNo: number, maxCharNo: number) {
    this.searchString = new FormControl<string | null>(initialValue, [
      validateInputsValidator(regexValidator),
      validateInputLength(minCharNo, maxCharNo),
    ]);
  }

  /** Removes a specific filter. */
  removeFilter(filter: FilterType) {
    switch (filter.type) {
      case FilterEnums.Search:
        const removedFilter = this.activeFilters.findIndex(elem => elem.filterValue === filter.filterValue && elem.prop === filter.prop);
        this.activeFilters.splice(removedFilter, 1);
        this.searchString.setValue('');
        break;

      case FilterEnums.Enum:
        if (filter.prop === 'speedLimitWarning') {
          this.speedLimitWarningSelected = this.speedLimitWarningSelected.filter(sel => sel !== filter.filterValue);
        }
        this.activeFilters = this.activeFilters.filter(af => af.filterValue !== filter.filterValue && af.label !== filter.label);
        break;
    }
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

  applyStringSearchFilter(data: Array<Movement>): Array<Movement> {
    this.isSearchStringValidAndUnique() && this.activeFilters.push(this.createNewFilter());
    const searchFilters = this.activeFilters.filter(elem => elem.type === FilterEnums.Search);

    return searchFilters.length ? this.filterData(data, searchFilters) : data;
  }

  private isSearchStringValidAndUnique(): boolean {
    if (!this.searchString.value || this.searchString?.value === '') {
      return false;
    }

    return !this.activeFilters.some(elem => elem.prop === this.selectedStringColumn.value && elem.filterValue === this.searchString.value);
  }

  private createNewFilter(): FilterType {
    return {
      removable: true,
      type: FilterEnums.Search,
      label: `in ${this.getFilterContext()}`,
      prop: this.selectedStringColumn.value,
      filterValue: this.searchString.value ? this.searchString.value : '',
    };
  }

  private getFilterContext(): string {
    return this.selectedStringColumn.value === this.advancedSearchAllValue
      ? this.translateService.instant('allTextFields')
      : this.translateService.instant(`movement.v210.` + this.selectedStringColumn.value + '.preferredName');
  }

  private filterData(data: Array<Movement>, searchFilters: FilterType[]): Array<Movement> {
    return data.filter(item => searchFilters.some(filter => this.itemMatchesFilter(item, filter)));
  }

  private itemMatchesFilter(item: Movement, filter: FilterType): boolean {
    return (filter.prop === this.advancedSearchAllValue ? this.stringColumns : [filter.prop]).some(prop => {
      if (!prop || !filter.filterValue) {
        return false;
      }

      return this.getValueByAccessPath(prop, item).toLowerCase().includes(filter.filterValue.toLowerCase());
    });
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

      if (
        !this.activeFilters
          .filter(af => af.type === FilterEnums.Enum && af.prop === filterProp)
          .map(af => af.filterValue)
          .includes(filterVal)
      ) {
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
      .filter(af => af.type === FilterEnums.Enum && af.prop === 'speedLimitWarning')
      .forEach(filter => {
        if (!this.speedLimitWarningSelected.includes(filter.filterValue as any)) {
          this.removeFilter(filter);
        }
      });

    return filteredData;
  }
}
