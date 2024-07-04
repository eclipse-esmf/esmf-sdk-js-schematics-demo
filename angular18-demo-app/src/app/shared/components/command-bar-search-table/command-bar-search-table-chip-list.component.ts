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
import {Component, EventEmitter, Output} from '@angular/core';
import {CommandBarSearchTableFilterService, FilterEnums, FilterType} from './command-bar-search-table-filter.service';

@Component({
  selector: 'command-bar-search-table-chip-list',
  templateUrl: './command-bar-search-table-chip-list.component.html',
  styleUrls: ['./command-bar-search-table-chip-list.component.scss'],
})
export class CommandBarSearchTableChipListComponent {
  @Output() removeFilter = new EventEmitter<any>();

  constructor(public filterService: CommandBarSearchTableFilterService) {}

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
