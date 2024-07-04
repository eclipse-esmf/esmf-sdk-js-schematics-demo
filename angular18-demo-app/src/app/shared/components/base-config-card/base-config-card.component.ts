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
import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {TranslocoService} from '@jsverse/transloco';

import {Movement} from '../../types/movement/movement.types';

import {BaseConfigCardFilterService, SortCard} from './base-config-card-filter.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {BaseConfigCardService} from './base-config-card.service';

export enum BaseConfigCardCardValues {
  IS_MOVING = 'isMoving',
  SPEED = 'speed',
  SPEED_LIMIT_WARNING = 'speedLimitWarning',
}

@Component({
  selector: 'esmf-ui-base-config-card',
  templateUrl: './base-config-card.component.html',
  styleUrls: ['./base-config-card.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class BaseConfigCardComponent implements OnInit, AfterViewInit {
  @ContentChild('cardTemplate') cardTemplate!: TemplateRef<any>;

  @Input() data: Array<Movement> = [];

  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;

  @Input() maxExportRows: number = 0;

  @Output() cardUpdateStartEvent = new EventEmitter<any>();
  @Output() cardUpdateFinishedEvent = new EventEmitter<any>();

  @Output() detail = new EventEmitter<any>();

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  currentLanguage: string;

  dataSource: MatTableDataSource<Movement> = new MatTableDataSource<Movement>();

  dataToShow: Array<Movement> = [];
  totalItems: number = 0;
  dataLoadError = false;

  baseConfigCardCardValues = Object.values(BaseConfigCardCardValues);

  constructor(
    private translateService: TranslocoService,
    private baseConfigCardService: BaseConfigCardService,
    private filterService: BaseConfigCardFilterService
  ) {
    this.currentLanguage = this.translateService.getActiveLang();
  }

  getContext(data: Movement) {
    return {
      baseConfigCardCardValues: this.baseConfigCardCardValues,
      $implicit: data,
      getElementValue: this.getElementValue.bind(this),
      translateService: this.translateService,
    };
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.defaultSorting();

    this.dataToShow = [...this.data];
    this.totalItems = this.dataToShow.length;
    this.dataSource.data = this.dataToShow;
    this.dataSource.paginator = this.paginator;
    this.paginator.length = this.dataToShow.length;
  }

  private defaultSorting() {
    this.filterService.sortedProperty = 'speedLimitWarning';

    this.sorting();
  }

  reloadFilter(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.cardUpdateStartEvent.emit();

    this.dataToShow = this.applyAllFilters(this.data);
    this.totalItems = this.dataToShow.length;
    this.maxExportRows = this.totalItems;

    this.cardUpdateFinishedEvent.emit();
  }

  private applyAllFilters(data: any[]): any[] {
    let dataTemp = [...data];

    return dataTemp;
  }

  sorting() {
    this.data.sort((a, b) => {
      let aValue = (a as any)[this.filterService.sortedProperty];
      let bValue = (b as any)[this.filterService.sortedProperty];

      if (typeof aValue === 'boolean') {
        aValue = aValue ? 1 : 0;
        bValue = bValue ? 1 : 0;
      }

      if (Date.parse(aValue)) {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (this.filterService.sortCard === SortCard.ASCENDING) {
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;

        return 0;
      } else {
        if (aValue < bValue) return 1;
        if (aValue > bValue) return -1;

        return 0;
      }
    });

    this.applyFilters();
  }

  detailInformation(data: Movement) {
    this.detail.emit(data);
  }

  getElementValue(data: any, element: string) {
    const properties = element.split('.');

    return properties.reduce((currentValue, property) => {
      if (currentValue && currentValue.hasOwnProperty(property)) {
        return currentValue[property];
      } else {
        return undefined;
      }
    }, data);
  }
}
