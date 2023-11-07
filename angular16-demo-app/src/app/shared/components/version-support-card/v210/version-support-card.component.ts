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
import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {Movement} from '../../../types/movement/v210/movement.types';

import {SortCard, VersionSupportCardFilterService} from './version-support-card-filter.service';

import {MatDialog} from '@angular/material/dialog';
import {unparse} from 'papaparse';
import {filter} from 'rxjs/operators';
import {Action, ExportCardDialogComponent} from '../../export-confirmation-dialog/export-card-dialog.component';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {VersionSupportCardService} from './version-support-card.service';

export enum VersionSupportCardCardValues {
  MOVING = 'moving',
  SPEED_LIMIT_WARNING = 'speedLimitWarning',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}

@Component({
  selector: 'esmf-ui-version-support-card-v210',
  templateUrl: './version-support-card.component.html',
  styleUrls: ['./version-support-card.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class VersionSupportCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ContentChild('cardTemplate') cardTemplate!: TemplateRef<any>;

  @Input() data: Array<Movement> = [];

  @Input() initialSearchString = '';
  @Input() regexValidator: string = '';

  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;

  @Input() maxExportRows: number = 0;

  @Output() cardUpdateStartEvent = new EventEmitter<any>();
  @Output() cardUpdateFinishedEvent = new EventEmitter<any>();

  @Output() downloadEvent = new EventEmitter<{error: boolean; success: boolean; inProgress: boolean}>();

  @Output() detail = new EventEmitter<any>();

  @ViewChild('searchInput') searchInput!: ElementRef;

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  currentLanguage: string;

  dataSource: MatTableDataSource<Movement> = new MatTableDataSource<Movement>();

  dataToShow: Array<Movement> = [];
  totalItems: number = 0;
  dataLoadError = false;

  versionSupportCardCardValues = Object.values(VersionSupportCardCardValues);

  private readonly destroy$ = new Subject<void>();

  constructor(
    private translateService: TranslateService,
    private versionSupportCardService: VersionSupportCardService,
    private filterService: VersionSupportCardFilterService,

    public dialog: MatDialog
  ) {
    this.currentLanguage = this.translateService.currentLang;
  }

  getContext(data: Movement) {
    return {
      versionSupportCardCardValues: this.versionSupportCardCardValues,
      $implicit: data,
      getElementValue: this.getElementValue.bind(this),
      translateService: this.translateService,
    };
  }

  ngOnInit() {
    this.filterService.searchStringInit(this.initialSearchString, this.regexValidator, this.minNumberCharacters, this.maxNumberCharacters);
    this.subscribeToSelectedStringColumn();
  }

  ngAfterViewInit() {
    this.defaultSorting();

    this.dataToShow = [...this.data];
    this.totalItems = this.dataToShow.length;
    this.dataSource.data = this.dataToShow;
    this.dataSource.paginator = this.paginator;
    this.paginator.length = this.dataToShow.length;
  }

  private defaultSorting() {
    this.filterService.sortedProperty = 'endDate';

    this.sorting();
  }

  removeFilter(filterData: any) {
    this.filterService.removeFilter(filterData);

    this.paginator.firstPage();

    this.filterService.searchString.reset();

    this.applyFilters();
  }

  reloadFilter(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    if (this.filterService.searchString.errors) {
      return;
    }

    this.cardUpdateStartEvent.emit();

    this.dataToShow = this.applyAllFilters(this.data);
    this.totalItems = this.dataToShow.length;
    this.maxExportRows = this.totalItems;

    this.cardUpdateFinishedEvent.emit();
  }

  private applyAllFilters(data: any[]): any[] {
    let dataTemp = [...data];

    dataTemp = this.filterService.applyEnumFilter(dataTemp);

    dataTemp = this.filterService.applyStringSearchFilter(dataTemp);

    dataTemp = this.filterService.applyDateFilter(dataTemp);

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

  private subscribeToSelectedStringColumn() {
    this.filterService.selectedStringColumn.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    });
  }

  openExportConfirmationDialog() {
    const dialogRef = this.dialog
      .open(ExportCardDialogComponent, {
        data: {maxExportRows: this.maxExportRows},
        maxWidth: 478,
      })
      .afterClosed()
      .pipe(filter(e => !!e))
      .subscribe((event: {action: Action; exportFirstPage: boolean}) => {
        if (event.action === Action.cancel) {
          return;
        }

        const exportData = JSON.parse(JSON.stringify(this.data));

        if (event.exportFirstPage && exportData.length > this.paginator.pageSize) {
          exportData.length = this.paginator.pageSize;
        }

        if (!event.exportFirstPage && this.data.length > this.maxExportRows) {
          exportData.length = this.maxExportRows;
        }

        this.exportToCsv(exportData);
      });
  }

  private exportToCsv(exportData: Array<Movement>) {
    const headersCSV = unparse({
      fields: this.versionSupportCardCardValues.map(columnName => {
        const translatedHeader = this.translateService.instant(`movement.${columnName}.preferredName`);
        return translatedHeader !== `movement.${columnName}.preferredName` ? translatedHeader : columnName;
      }),
      data: [],
    });

    this.downloadCsv(`${headersCSV}${unparse(exportData, {header: false, columns: this.versionSupportCardCardValues})}`);
  }

  private downloadCsv(csvArray: string) {
    this.downloadEvent.emit({error: false, success: false, inProgress: true});
    try {
      this.versionSupportCardService.downloadCsv(csvArray);

      this.downloadEvent.emit({error: false, success: true, inProgress: false});
    } catch (error: any) {
      this.downloadEvent.emit({error: true, success: false, inProgress: false});
    }
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

  ngOnDestroy() {
    this.filterService.searchString.setValue('');

    this.destroy$.next();
    this.destroy$.complete();
  }
}
