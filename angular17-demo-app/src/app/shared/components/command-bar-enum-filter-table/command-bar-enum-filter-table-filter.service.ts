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

import {Injectable} from '@angular/core';

import {Movement, TrafficLight} from '../../types/movement/movement.types';

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
export class CommandBarEnumFilterTableFilterService {
  /** Array of active filters */
  activeFilters: FilterType[] = [];

  speedLimitWarningSelected: Array<TrafficLight> = [];
  speedLimitWarningOptions: Array<any> = Object.values(TrafficLight);

  constructor() {}

  /** Removes a specific filter. */
  removeFilter(filter: FilterType) {
    switch (filter.type) {
      case FilterEnums.Enum:
        if (filter.prop === 'speedLimitWarning') {
          this.speedLimitWarningSelected = this.speedLimitWarningSelected.filter(sel => sel !== filter.filterValue);
        }
        this.activeFilters = this.activeFilters.filter(af => af.filterValue !== filter.filterValue && af.label !== filter.label);
        break;
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
