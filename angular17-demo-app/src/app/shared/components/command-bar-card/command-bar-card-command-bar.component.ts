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
import {SelectionModel} from '@angular/cdk/collections';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {CommandBarCardFilterService, SortCard} from './command-bar-card-filter.service';

import {CommandBarCardCardValues} from './command-bar-card.component';

@Component({
  selector: 'command-bar',
  templateUrl: './command-bar-card-command-bar.component.html',
  styleUrls: ['./command-bar-card-command-bar.component.scss'],
})
export class CommandBarCardCommandBarComponent {
  @Input() isMultipleSelectionEnabled = true;
  @Input() selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  @Input() totalItems = 0;
  @Input() searchFocused = false;
  @Input() allowedCharacters: string = '';
  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;
  @Input() searchHint?: string;
  @Input() KEY_LOCAL_STORAGE_COMMAND_BAR_CARD_CONFIG: string = '';

  @Output() applyFilters = new EventEmitter<void>();
  @Output() reloadFilter = new EventEmitter<void>();
  @Output() exportToCsv = new EventEmitter<void>();

  @Output() sorting = new EventEmitter<void>();

  commandBarCardCardValues = Object.values(CommandBarCardCardValues);
  protected readonly SortCard = SortCard;

  constructor(public filterService: CommandBarCardFilterService) {
    this.filterService.sortedProperty = this.commandBarCardCardValues[0];
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
