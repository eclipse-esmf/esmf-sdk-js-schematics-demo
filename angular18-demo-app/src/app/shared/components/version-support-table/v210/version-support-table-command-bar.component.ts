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
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {VersionSupportTableFilterService} from './version-support-table-filter.service';

import {VersionSupportTableConfigMenuComponent} from './version-support-table-config-menu.component';
import {Config} from './version-support-table.component';

@Component({
  selector: 'version-support-table-command-bar',
  templateUrl: './version-support-table-command-bar.component.html',
  styleUrls: ['./version-support-table-command-bar.component.scss'],
})
export class VersionSupportTableCommandBarComponent implements AfterViewInit {
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

  @ViewChild('componentsContainer', {read: ElementRef, static: false})
  componentsContainer!: ElementRef;
  @ViewChildren('toolbarComp', {read: ElementRef})
  components!: QueryList<ElementRef>;
  hiddenComponents: any[] = [];
  initialCompWidths: any[] = [];

  constructor(public filterService: VersionSupportTableFilterService, public dialog: MatDialog) {}

  @ViewChild('speedLimitWarning', {static: true}) private speedLimitWarning!: TemplateRef<any>;
  openInDialogspeedLimitWarning() {
    this.dialog.open(this.speedLimitWarning);
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

  triggerInitOpenedConfigurationDialog(): void {
    this.configurationComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_VERSION_SUPPORT_TABLE_V210_CONFIG;
    this.configurationComponent.configs.splice(0, this.configurationComponent.configs.length);
    this.configurationComponent.configs.push(...this.configs.map(config => ({...config})));
  }

  triggerSetConfiguration(config: Array<Config>): void {
    this.setConfiguration.emit(config);
  }

  ngAfterViewInit(): void {
    const compWidths: any[] = this.components
      .toArray()
      .map(comp => ({width: comp.nativeElement.clientWidth, id: comp.nativeElement.getAttribute('data-resp')}));

    if (this.initialCompWidths.length === 0) {
      this.initialCompWidths = compWidths;
    }

    this.updateToolbarComponentsVisibility();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateToolbarComponentsVisibility();
  }

  updateToolbarComponentsVisibility() {
    this.hiddenComponents = [];
    const containerWidth = this.componentsContainer.nativeElement.clientWidth;
    let usedWidth = 0;

    for (let i = 0; i < this.initialCompWidths.length; i++) {
      const buttonWidth = this.initialCompWidths[i];
      // 70 is for the width of the collapsed menu width
      if (usedWidth + buttonWidth.width + 70 >= containerWidth) {
        this.hiddenComponents.push(buttonWidth.id);
      } else {
        usedWidth += buttonWidth.width;
      }
    }
  }

  isInCollapsedMenu(id: string) {
    return this.hiddenComponents.includes(id);
  }

  openSettingsFromCollapsed() {
    const configMenuDialogRef = this.dialog.open(VersionSupportTableConfigMenuComponent, {
      data: {configs: this.configs, keyLocalStorage: this.KEY_LOCAL_STORAGE_VERSION_SUPPORT_TABLE_V210_CONFIG},
    });
    configMenuDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.triggerSetConfiguration(result);
      }
    });
  }
}
