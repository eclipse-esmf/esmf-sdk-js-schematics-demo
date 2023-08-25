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
import {SelectionModel} from '@angular/cdk/collections';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {CommandBarSearchCardFilterService, SortCard} from './command-bar-search-card-filter.service';

import {CommandBarSearchCardCardValues} from './command-bar-search-card.component';

@Component({
  selector: 'command-bar',
  templateUrl: './command-bar-search-card-command-bar.component.html',
  styleUrls: ['./command-bar-search-card-command-bar.component.scss'],
})
export class CommandBarSearchCardCommandBarComponent {
  @Input() isMultipleSelectionEnabled = true;
  @Input() selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  @Input() totalItems = 0;
  @Input() searchFocused = false;
  @Input() allowedCharacters: string = '';
  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;
  @Input() searchHint?: string;
  @Input() KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_CARD_CONFIG: string = '';

  @Output() applyFilters = new EventEmitter<void>();
  @Output() reloadFilter = new EventEmitter<void>();
  @Output() exportToCsv = new EventEmitter<void>();

  @Output() sorting = new EventEmitter<void>();

  commandBarSearchCardCardValues = Object.values(CommandBarSearchCardCardValues);
  protected readonly SortCard = SortCard;

  constructor(public filterService: CommandBarSearchCardFilterService) {
    this.filterService.sortedProperty = this.commandBarSearchCardCardValues[0];
  }

  triggerApplyFilters(): void {
    this.applyFilters.emit();
  }

  triggerExportToCsv(): void {
    this.exportToCsv.emit();
  }

  triggerReloadFilter(): void {
    this.reloadFilter.emit();
  }

  setSortingProperty(value: string) {
    this.filterService.sortedProperty = value;
    this.sorting.emit();
  }

  setSortingDir() {
    this.filterService.sortCard = this.filterService.sortCard === SortCard.ASCENDING ? SortCard.DESCENDING : SortCard.ASCENDING;
    this.sorting.emit();
  }
}
