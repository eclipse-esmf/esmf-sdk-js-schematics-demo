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

import {CommandBarActionsCardFilterService, SortCard} from './command-bar-actions-card-filter.service';

import {CommandBarActionsCardCardValues} from './command-bar-actions-card.component';

@Component({
  selector: 'command-bar-actions-card-command-bar',
  templateUrl: './command-bar-actions-card-command-bar.component.html',
  styleUrls: ['./command-bar-actions-card-command-bar.component.scss'],
})
export class CommandBarActionsCardCommandBarComponent implements AfterViewInit {
  @Input() isMultipleSelectionEnabled = true;
  @Input() selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  @Input() totalItems = 0;
  @Input() searchFocused = false;
  @Input() allowedCharacters: string = '';
  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;
  @Input() searchHint?: string;
  @Input() KEY_LOCAL_STORAGE_COMMAND_BAR_ACTIONS_CARD_CONFIG: string = '';

  @Output() applyFilters = new EventEmitter<void>();
  @Output() reloadFilter = new EventEmitter<void>();
  @Output() exportToCsv = new EventEmitter<void>();

  @Output() customCommandBarActionEvent = new EventEmitter<any>();

  @Output() sorting = new EventEmitter<void>();

  commandBarActionsCardCardValues = Object.values(CommandBarActionsCardCardValues);
  protected readonly SortCard = SortCard;

  @ViewChild('componentsContainer', {read: ElementRef, static: false})
  componentsContainer!: ElementRef;
  @ViewChildren('toolbarComp', {read: ElementRef})
  components!: QueryList<ElementRef>;
  hiddenComponents: any[] = [];
  initialCompWidths: any[] = [];

  constructor(public filterService: CommandBarActionsCardFilterService, public dialog: MatDialog) {
    this.filterService.sortedProperty = this.commandBarActionsCardCardValues[0];
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

  executeCustomCommandBarAction(action: string) {
    this.customCommandBarActionEvent.emit({action: action});
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
