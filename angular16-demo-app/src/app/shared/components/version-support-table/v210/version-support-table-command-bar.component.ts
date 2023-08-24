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
import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';

import {VersionSupportTableFilterService} from './version-support-table-filter.service';

import {VersionSupportTableConfigMenuComponent} from './version-support-table-config-menu.component';
import {Config} from './version-support-table.component';

@Component({
  selector: 'command-bar',
  templateUrl: './version-support-table-command-bar.component.html',
  styleUrls: ['./version-support-table-command-bar.component.scss'],
})
export class VersionSupportTableCommandBarComponent {
  @Input() isMultipleSelectionEnabled = true;
  @Input() selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  @Input() totalItems = 0;
  @Input() searchFocused = false;
  @Input() allowedCharacters: string = '';
  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;
  @Input() searchHint?: string;
  @Input() KEY_LOCAL_STORAGE_VERSION_SUPPORT_TABLE_V210_CONFIG: string = '';

  @Input() configs: Array<Config> = [];
  @Input() hasAdvancedSearch: boolean = this.filterService.stringColumns.length > 1;

  @Output() applyFilters = new EventEmitter<void>();
  @Output() reloadFilter = new EventEmitter<void>();
  @Output() exportToCsv = new EventEmitter<void>();

  @Output() setConfiguration = new EventEmitter<Array<Config>>();
  @ViewChild(VersionSupportTableConfigMenuComponent) private configurationComponent!: VersionSupportTableConfigMenuComponent;

  constructor(public filterService: VersionSupportTableFilterService) {}

  triggerApplyFilters(): void {
    this.applyFilters.emit();
  }

  triggerExportToCsv(): void {
    this.exportToCsv.emit();
  }

  triggerReloadFilter(): void {
    this.reloadFilter.emit();
  }

  triggerInitOpenedConfigurationDialog(): void {
    this.configurationComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_VERSION_SUPPORT_TABLE_V210_CONFIG;
    this.configurationComponent.configs.splice(0, this.configurationComponent.configs.length);
    this.configurationComponent.configs.push(...this.configs.map(config => ({...config})));
  }

  triggerSetConfiguration(config: Array<Config>): void {
    this.setConfiguration.emit(config);
  }
}
