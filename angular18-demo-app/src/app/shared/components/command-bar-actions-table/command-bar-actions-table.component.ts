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
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatPaginator, MatPaginatorSelectConfig} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';

import {Clipboard} from '@angular/cdk/clipboard';

import {unparse} from 'papaparse';
import {Action, ExportTableDialogComponent} from '../export-confirmation-dialog/export-table-dialog.component';

import {MatDialog} from '@angular/material/dialog';
import {Movement} from '../../types/movement/movement.types';
import {CommandBarActionsTableDataSource} from './command-bar-actions-table-datasource';

import {SelectionModel} from '@angular/cdk/collections';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslocoService} from '@jsverse/transloco';
import {PaginatorSelectConfigInjector} from '../../services/paginator-select-config.provider';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {CommandBarActionsTableColumnMenuComponent} from './command-bar-actions-table-column-menu.component';

import {filter} from 'rxjs/operators';

import {CommandBarActionsTableService} from './command-bar-actions-table.service';

export interface Column {
  /** Column name **/
  name: string;
  /** State if the column is selected **/
  selected: boolean;
}

/**
 * Enumeration of all available columns which can be shown/hide in the table.
 */
export enum CommandBarActionsTableColumn {
  IS_MOVING = 'isMoving',
  SPEED = 'speed',
  SPEED_LIMIT_WARNING = 'speedLimitWarning',

  COLUMNS_MENU = 'columnsMenu',
}

export const NON_DATA_COLUMNS: CommandBarActionsTableColumn[] = [CommandBarActionsTableColumn.COLUMNS_MENU];

@Component({
  selector: 'esmf-ui-command-bar-actions-table',
  templateUrl: './command-bar-actions-table.component.html',
  styleUrls: ['./command-bar-actions-table.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class CommandBarActionsTableComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
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

  @Input() hideColumns: CommandBarActionsTableColumn[] = [];

  @Input() maxExportRows: number = 0;

  @Output() rowClickEvent = new EventEmitter<any>();
  @Output() rowDblClickEvent = new EventEmitter<any>();
  @Output() rowRightClickEvent = new EventEmitter<any>();
  @Output() tableUpdateStartEvent = new EventEmitter<any>();
  @Output() tableUpdateFinishedEvent = new EventEmitter<any>();
  @Output() copyToClipboardEvent = new EventEmitter<any>();
  @Output() downloadEvent = new EventEmitter<{error: boolean; success: boolean; inProgress: boolean}>();
  @Output() rowSelectionEvent = new EventEmitter<any>();

  @Output() customCommandBarActionEvent = new EventEmitter<any>();

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatTable) private table!: MatTable<Movement>;
  @ViewChild(CommandBarActionsTableColumnMenuComponent) private columMenuComponent!: CommandBarActionsTableColumnMenuComponent;

  @ViewChild('searchInput') searchInput!: ElementRef;

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    if (!this.highlightColor) {
      return;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`--selected-row-highlight-color: ${this.highlightColor}`);
  }

  readonly KEY_LOCAL_STORAGE_COMMAND_BAR_ACTIONS_TABLE_COLUMNS = 'command_bar_actions_table_columns';

  totalItems: number = 0;
  selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  dataSource: CommandBarActionsTableDataSource;

  columnToSort: {sortColumnName: string; sortDirection: SortDirection} = {sortColumnName: 'speedLimitWarning', sortDirection: 'asc'};
  // The list of column names that are displayed in the table, including NON_DATA_COLUMNS
  displayedColumns: CommandBarActionsTableColumn[] = [];
  // The list of available columns to select
  columns: Array<Column> = [];

  currentLanguage: string;
  filteredData: Array<Movement> = [];
  dragging: boolean = false;
  customRowActionsLength: number = 0;
  closeColumnMenu: boolean = false;
  rqlString: string = '';
  searchFocused: boolean = false;
  dataLoadError = false;

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslocoService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private storageService: JSSdkLocalStorageService,
    @Inject(PaginatorSelectConfigInjector) public paginatorSelectConfig: MatPaginatorSelectConfig,

    private commandBarActionsTableService: CommandBarActionsTableService
  ) {
    this.dataSource = new CommandBarActionsTableDataSource(this.translateService);
    this.currentLanguage = this.translateService.getActiveLang();
  }

  ngOnInit(): void {
    this.initializeColumns();

    this.maxExportRows = this.data.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hideColumns && !changes.hideColumns.isFirstChange()) {
      this.initializeColumns();
    }

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
    this.columns = [];
    this.displayedColumns = Object.values(CommandBarActionsTableColumn).filter(column => !this.hideColumns.includes(column));

    const columnStorage = this.storageService.getItem(this.KEY_LOCAL_STORAGE_COMMAND_BAR_ACTIONS_TABLE_COLUMNS);

    if (columnStorage?.length > 0) {
      columnStorage
        .filter(
          (column: Column) =>
            !this.hideColumns.includes(column.name as CommandBarActionsTableColumn) &&
            this.displayedColumns.find(columnName => columnName === column.name)
        )
        .forEach((column: Column) => this.columns.push({name: column.name, selected: column.selected}));
    }

    this.displayedColumns.forEach((displayedColumn: string): void => {
      if (
        !this.isAvailableDataColumn(displayedColumn as CommandBarActionsTableColumn) ||
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

  handleCustomCommandBarActionEvent(action: string) {
    this.customCommandBarActionEvent.emit({action: action});
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

  exportToCsv() {
    this.openExportConfirmationDialog();
  }

  openExportConfirmationDialog() {
    const dataColumns = this.displayedColumns.filter(col => this.isAvailableDataColumn(col));

    const dialogRef = this.dialog.open(ExportTableDialogComponent, {
      data: {
        allColumns: this.columns.length,
        displayedColumns: dataColumns.length,
        maxExportRows: this.maxExportRows,
      },
      maxWidth: 478,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(e => !!e))
      .subscribe((event: {action: Action; exportAllPages: boolean; exportAllColumns: boolean}): void => {
        if (event.action === Action.cancel) {
          return;
        }

        if (event.exportAllPages && this.data.length > this.maxExportRows) {
          this.data.length = this.maxExportRows;
        }

        this.prepareCsv(
          this.commandBarActionsTableService.flatten(this.data),
          event.exportAllColumns,
          event.exportAllPages,
          this.paginator.pageSize
        );
      });
  }

  prepareCsv(data: any, exportAllColumns: boolean, exportAllPages: boolean, currentPageSize: number): void {
    if (!exportAllPages && data.length > currentPageSize) {
      data.length = currentPageSize;
    }

    const headersToExport = exportAllColumns
      ? this.columns.map(c => c.name)
      : this.displayedColumns.filter(col => this.isAvailableDataColumn(col));

    const headersCSV = unparse({
      fields: headersToExport.map(columnName => {
        const translatedHeader = this.translateService.translate(`${columnName}.preferredName`);
        return translatedHeader !== `${columnName}.preferredName` ? translatedHeader : columnName;
      }) as string[],
      data: [],
    });

    this.downloadCsv(`${headersCSV}${unparse(data, {header: false, columns: headersToExport})}`);
  }

  downloadCsv(csvArray: any): void {
    this.downloadEvent.emit({error: false, success: false, inProgress: true});
    try {
      this.commandBarActionsTableService.downloadCsv(csvArray);

      this.downloadEvent.emit({error: false, success: true, inProgress: false});
    } catch (error: any) {
      this.downloadEvent.emit({error: true, success: false, inProgress: false});
    }
  }

  initOpenedColumnMenuDialog(): void {
    this.columMenuComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_COMMAND_BAR_ACTIONS_TABLE_COLUMNS;
    this.columMenuComponent.columnsDefault = [
      ...Object.values(CommandBarActionsTableColumn)
        .filter(columnName => this.isAvailableDataColumn(columnName))
        .map(columnName => ({name: columnName, selected: true})),
    ];
    this.columMenuComponent.columns.splice(0, this.columMenuComponent.columns.length);
    this.columMenuComponent.columns.push(...this.columns);
  }

  setDisplayedColumns(columns: Array<Column>): void {
    let displayedColumnsTmp: Array<Column> = [];

    displayedColumnsTmp.push(...columns);

    displayedColumnsTmp.push({name: CommandBarActionsTableColumn['COLUMNS_MENU'], selected: true});

    this.columns = [...columns];
    this.displayedColumns = displayedColumnsTmp
      .filter(column => column.selected)
      .map(column => column.name as CommandBarActionsTableColumn);
  }

  loadCustomTemplate(): TemplateRef<any> | null {
    return this.customTemplate ? (this.customTemplate as TemplateRef<any>) : null;
  }

  checkIfOnValidPage(): void {
    if (this.paginator.length > this.filteredData.length) {
      this.paginator.firstPage();
    }
  }

  private isAvailableDataColumn(column: CommandBarActionsTableColumn): boolean {
    return !(Array.isArray(this.hideColumns) && this.hideColumns.includes(column)) && !NON_DATA_COLUMNS.includes(column);
  }
}
