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
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';

import {Clipboard} from '@angular/cdk/clipboard';

import {MatDialog} from '@angular/material/dialog';
import {Movement} from '../../types/movement/movement.types';
import {RowActionButtonTableDataSource} from './row-action-button-table-datasource';

import {SelectionModel} from '@angular/cdk/collections';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {RowActionButtonTableColumnMenuComponent} from './row-action-button-table-column-menu.component';

import {RowActionButtonTableService} from './row-action-button-table.service';

export interface Column {
  /** Column name **/
  name: string;
  /** State if the column is selected **/
  selected: boolean;
}

/**
 * Enumeration of all available columns which can be shown/hide in the table.
 */
export enum RowActionButtonTableColumn {
  MOVING = 'moving',
  SPEED_LIMIT_WARNING = 'speedLimitWarning',
  START_DATE = 'startDate',
  END_DATE = 'endDate',

  CUSTOM_ROW_ACTIONS = 'customRowActions',
  COLUMNS_MENU = 'columnsMenu',
}

@Component({
  selector: 'esmf-ui-row-action-button-table',
  templateUrl: './row-action-button-table.component.html',
  styleUrls: ['./row-action-button-table.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class RowActionButtonTableComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
  @Input() isScheduleVisible = true;
  @Input() tableDateFormat = 'short';
  @Input() tableDateTimeFormat = 'short';
  @Input() tableTimeFormat = 'shortTime';

  @Input() data: Array<Movement> = [];
  @Input() customTemplate?: TemplateRef<any>;
  @Input() searchHint?: string;
  @Input() showFirstLastButtons: boolean = true;

  @Input() pageSize: number = 20;
  @Input() pageSizeOptions: Array<number> = [5, 20, 50, 100];

  @Input() highlightSelectedRow: boolean = true;
  @Input() highlightColor = 'rgba(127, 198, 231, 0.3)';
  @Input() isMultipleSelectionEnabled = true;
  @Input() noDataMessage: string = '';
  @Input() dataLoadErrorMessage: string = '';
  @Input() visibleRowActionsIcons: number = 3;
  @Input() headerTooltipsOff: boolean = false;
  @Input() setStickRowActions: boolean = true;
  @Input() customTableClass: string = '';
  @Input() debounceTime: number = 500;
  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;
  @Input() allowedCharacters: string = '';
  @Input() regexValidator: string = '';

  @Input() maxExportRows: number = 0;

  @Output() rowClickEvent = new EventEmitter<any>();
  @Output() rowDblClickEvent = new EventEmitter<any>();
  @Output() rowRightClickEvent = new EventEmitter<any>();
  @Output() tableUpdateStartEvent = new EventEmitter<any>();
  @Output() tableUpdateFinishedEvent = new EventEmitter<any>();
  @Output() copyToClipboardEvent = new EventEmitter<any>();
  @Output() downloadEvent = new EventEmitter<{error: boolean; success: boolean; inProgress: boolean}>();
  @Output() rowSelectionEvent = new EventEmitter<any>();

  @Output() customActionEvent = new EventEmitter<any>();

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatTable) private table!: MatTable<Movement>;
  @ViewChild(RowActionButtonTableColumnMenuComponent) private columMenuComponent!: RowActionButtonTableColumnMenuComponent;

  @ViewChild('searchInput') searchInput!: ElementRef;

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    if (!this.highlightColor) {
      return;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`--selected-row-highlight-color: ${this.highlightColor}`);
  }

  readonly KEY_LOCAL_STORAGE_ROW_ACTION_BUTTON_TABLE_COLUMNS = 'row_action_button_table_columns';

  totalItems: number = 0;
  selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  dataSource: RowActionButtonTableDataSource;

  columnToSort: {sortColumnName: string; sortDirection: SortDirection} = {sortColumnName: 'endDate', sortDirection: 'asc'};
  displayedColumns: Array<string> = Object.values(RowActionButtonTableColumn);
  columns: Array<Column> = [];

  currentLanguage: string;
  filteredData: Array<Movement> = [];
  dragging: boolean = false;
  customRowActionsLength: number = 1;
  closeColumnMenu: boolean = false;
  rqlString: string = '';
  searchFocused: boolean = false;
  dataLoadError = false;

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private storageService: JSSdkLocalStorageService,

    private rowActionButtonTableService: RowActionButtonTableService
  ) {
    this.dataSource = new RowActionButtonTableDataSource(this.translateService);
    this.currentLanguage = this.translateService.currentLang;
  }

  ngOnInit(): void {
    this.initializeColumns();

    this.maxExportRows = this.data.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.table) {
      this.applyFilters();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.pageChange();
  }

  ngAfterViewChecked(): void {
    if (this.table) {
      this.table.updateStickyColumnStyles();
    }
  }

  initializeColumns(): void {
    const columnStorage = this.storageService.getItem(this.KEY_LOCAL_STORAGE_ROW_ACTION_BUTTON_TABLE_COLUMNS);

    if (columnStorage?.length > 0) {
      columnStorage
        .filter((column: Column) => this.displayedColumns.find(columnName => columnName === column.name))
        .forEach((column: Column) => this.columns.push({name: column.name, selected: column.selected}));
    }

    this.displayedColumns.forEach((displayedColumn: string): void => {
      if (
        displayedColumn === RowActionButtonTableColumn['CUSTOM_ROW_ACTIONS'] ||
        displayedColumn === RowActionButtonTableColumn['COLUMNS_MENU'] ||
        this.columns.find(column => column.name === displayedColumn)
      ) {
        return;
      }

      this.columns.push({name: displayedColumn, selected: true});
    });

    // if no column besides checkboxes and column actions is active, reset and show all columns
    if (!this.columns.find((column: Column) => column.selected)) {
      this.columns.forEach((column: Column) => (column.selected = true));
    }

    this.setDisplayedColumns(this.columns);
  }

  hideColumn(column: RowActionButtonTableColumn): void {
    this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== column);
  }

  showColumn(column: RowActionButtonTableColumn, index: number): void {
    if (!this.displayedColumns.includes(column)) {
      this.displayedColumns.splice(index, 0, column);
    }
  }

  resetDisplayedColumns(): void {
    this.displayedColumns = Object.values(RowActionButtonTableColumn);
  }

  pageChange(): void {
    this.applyFilters();
  }

  sortData(): void {
    this.applyFilters();
  }

  rowClicked(row: any, $event: MouseEvent): boolean {
    if (this.highlightSelectedRow) {
      this.checkboxClicked(row);
    }

    if ($event.type === 'contextmenu') {
      $event.preventDefault();
      const mousePositionOnClick = {x: $event.clientX + 'px', y: $event.clientY + 'px'};
      this.rowRightClickEvent.emit({data: row, mousePosition: mousePositionOnClick});
    }

    if ($event.type === 'click') {
      this.rowClickEvent.emit({data: row});
    }

    return false;
  }

  rowDblClicked(row: any, $event: MouseEvent): void {
    this.rowDblClickEvent.emit({data: row});
  }

  copyToClipboard(value: any, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.clipboard.copy(value);
    this.copyToClipboardEvent.emit(value);
  }

  checkboxClicked(row: any): void {
    if (!this.isMultipleSelectionEnabled) {
      this.selection.clear();
    }

    this.selection.toggle(row);
    this.rowSelectionEvent.emit(this.selection.selected);
  }

  executeCustomAction($event: MouseEvent, action: string, row: any): void {
    if (this.customRowActionsLength <= this.visibleRowActionsIcons) {
      $event.stopPropagation();
    }

    this.customActionEvent.emit({action: action, data: row});
  }

  reloadFilter(): void {
    this.paginator.firstPage();
    this.applyFilters();
  }

  applyFilters() {
    this.tableUpdateStartEvent.emit();

    const dataToShow = this.applyAllFilters(this.data);
    this.dataSource.setData(dataToShow);
    this.filteredData = dataToShow;
    this.totalItems = this.data.length;
    this.maxExportRows = this.totalItems;
    this.checkIfOnValidPage();

    this.tableUpdateFinishedEvent.emit();
  }

  private applyAllFilters(data: any[]): any[] {
    let dataTemp = [...data];

    return dataTemp;
  }

  initOpenedColumnMenuDialog(): void {
    this.columMenuComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_ROW_ACTION_BUTTON_TABLE_COLUMNS;
    this.columMenuComponent.columnsDefault = [
      ...Object.values(RowActionButtonTableColumn)

        .filter(columnName => columnName !== RowActionButtonTableColumn['CUSTOM_ROW_ACTIONS'])
        .filter(columnName => columnName !== RowActionButtonTableColumn['COLUMNS_MENU'])
        .map(columnName => ({name: columnName, selected: true})),
    ];
    this.columMenuComponent.columns.splice(0, this.columMenuComponent.columns.length);
    this.columMenuComponent.columns.push(...this.columns);
  }

  setDisplayedColumns(columns: Array<Column>): void {
    let displayedColumnsTmp: Array<Column> = [];

    displayedColumnsTmp.push(...columns);

    if (
      RowActionButtonTableColumn['CUSTOM_ROW_ACTIONS'] &&
      columns[columns.length - 1].name !== RowActionButtonTableColumn['CUSTOM_ROW_ACTIONS']
    ) {
      displayedColumnsTmp.push({name: RowActionButtonTableColumn['CUSTOM_ROW_ACTIONS'], selected: true});
    }

    if (RowActionButtonTableColumn['COLUMNS_MENU'] && columns[columns.length - 1].name !== RowActionButtonTableColumn['COLUMNS_MENU']) {
      displayedColumnsTmp.push({name: RowActionButtonTableColumn['COLUMNS_MENU'], selected: true});
    }

    this.columns = [...columns];
    this.displayedColumns = displayedColumnsTmp.filter(column => column.selected).map(column => column.name);
  }

  loadCustomTemplate(): TemplateRef<any> | null {
    return this.customTemplate ? (this.customTemplate as TemplateRef<any>) : null;
  }

  checkIfOnValidPage(): void {
    if (this.paginator.length > this.filteredData.length) {
      this.paginator.firstPage();
    }
  }
}
