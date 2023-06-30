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

/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {AbstractLogicalNode, Like, Or} from 'rollun-ts-rql';

import {Injectable} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

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
export class CustomColumnFilterService {
  /** Array of active filters */
  activeFilters: FilterType[] = [];

  searchString = new FormControl<string | null>('');
  stringColumns: string[] = ['speedLimitWarning'];
  readonly advancedSearchAllValue = 'allTextFields';
  selectedStringColumn: FormControl<string | null> = new FormControl(this.advancedSearchAllValue);

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

  applyStringSearchFilter(query: AbstractLogicalNode): void {
    if (
      this.searchString.value &&
      this.searchString.value !== '' &&
      !this.activeFilters.find(elem => elem.prop === this.selectedStringColumn.value && elem.filterValue === this.searchString.value)
    ) {
      const label = ` in ${
        this.selectedStringColumn.value === this.advancedSearchAllValue
          ? this.translateService.instant('allTextFields')
          : this.translateService.instant(`movement.v210.` + this.selectedStringColumn.value + '.preferredName')
      }`;
      this.activeFilters.push(<FilterType>{
        removable: true,
        type: FilterEnums.Search,
        label,
        prop: this.selectedStringColumn.value,
        filterValue: this.searchString.value,
      });
    }
    this.activeFilters
      .filter(af => af.type === FilterEnums.Search)
      .forEach(af => {
        if (af.prop !== null && af.filterValue !== undefined) {
          query.addNode(new Or(this.addSelectedColumnsQuery(af.prop, af.filterValue)));
        }
      });
  }
  addSelectedColumnsQuery(selectedStringColumn: string, searchString: string): Like[] {
    if (selectedStringColumn !== this.advancedSearchAllValue) {
      return [new Like(selectedStringColumn, `*${searchString}*`)];
    } else {
      return this.stringColumns.map((column: string) => {
        return new Like(column, `*${searchString}*`);
      });
    }
  }
}