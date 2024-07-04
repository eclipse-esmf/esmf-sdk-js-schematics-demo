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
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'command-bar-date-filter-table-command-bar',
  templateUrl: './command-bar-date-filter-table-command-bar.component.html',
  styleUrls: ['./command-bar-date-filter-table-command-bar.component.scss'],
})
export class CommandBarDateFilterTableCommandBarComponent implements AfterViewInit {
  @Input() isMultipleSelectionEnabled = true;
  @Input() selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  @Input() totalItems = 0;
  @Input() searchFocused = false;
  @Input() allowedCharacters: string = '';
  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;
  @Input() searchHint?: string;
  @Input() KEY_LOCAL_STORAGE_COMMAND_BAR_DATE_FILTER_TABLE_CONFIG: string = '';

  @Output() applyFilters = new EventEmitter<void>();
  @Output() reloadFilter = new EventEmitter<void>();
  @Output() exportToCsv = new EventEmitter<void>();

  @ViewChild('componentsContainer', {read: ElementRef, static: false})
  componentsContainer!: ElementRef;
  @ViewChildren('toolbarComp', {read: ElementRef})
  components!: QueryList<ElementRef>;
  hiddenComponents: any[] = [];
  initialCompWidths: any[] = [];

  constructor(public dialog: MatDialog) {}

  triggerApplyFilters(): void {
    this.applyFilters.emit();
  }

  triggerExportToCsv(): void {
    this.exportToCsv.emit();
  }

  triggerReloadFilter(): void {
    this.reloadFilter.emit();
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
}
