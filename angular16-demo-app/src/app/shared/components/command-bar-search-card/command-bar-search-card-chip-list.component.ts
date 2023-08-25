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
import {Component, EventEmitter, Output} from '@angular/core';
import {CommandBarSearchCardFilterService, FilterEnums, FilterType} from './command-bar-search-card-filter.service';

@Component({
  selector: 'chip-list',
  templateUrl: './command-bar-search-card-chip-list.component.html',
  styleUrls: ['./command-bar-search-card-chip-list.component.scss'],
})
export class CommandBarSearchCardChipListComponent {
  @Output() removeFilter = new EventEmitter<any>();

  constructor(public filterService: CommandBarSearchCardFilterService) {}

  triggerRemoveFilter(filter: any): void {
    this.removeFilter.emit(filter);
  }

  chipListValue(filter: FilterType): string {
    if (filter.type === FilterEnums.Search) {
      return `${filter.filterValue}: ${filter.label}`;
    }

    if (filter.type === FilterEnums.Date) {
      return filter.label;
    }

    return `${filter.prop}: ${filter.label}`;
  }
}
