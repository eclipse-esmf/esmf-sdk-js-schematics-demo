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
  OnDestroy,
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

import {CommandBarSearchTableFilterService, FilterEnums} from './command-bar-search-table-filter.service';

import {Clipboard} from '@angular/cdk/clipboard';

import {unparse} from 'papaparse';
import {Action, ExportTableDialogComponent} from '../export-confirmation-dialog/export-table-dialog.component';

import {MatDialog} from '@angular/material/dialog';
import {Movement} from '../../types/movement/movement.types';
import {CommandBarSearchTableDataSource} from './command-bar-search-table-datasource';

import {SelectionModel} from '@angular/cdk/collections';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslocoService} from '@jsverse/transloco';
import {PaginatorSelectConfigInjector} from '../../services/paginator-select-config.provider';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {CommandBarSearchTableColumnMenuComponent} from './command-bar-search-table-column-menu.component';

import {CommandBarSearchTableConfigMenuComponent} from './command-bar-search-table-config-menu.component';

import {debounceTime, filter, takeUntil} from 'rxjs/operators';

import {Subject} from 'rxjs';

import {CommandBarSearchTableService} from './command-bar-search-table.service';

export interface Config {
  /** Column name **/
  name: string;
  /** Desc of the config **/
  desc: string;
  /** State if the column is selected **/
  selected: boolean;
  /** Color for the highlighted configuration **/
  color?: string;
}

export interface Column {
  /** Column name **/
  name: string;
  /** State if the column is selected **/
  selected: boolean;
}

/**
 * Enumeration of all available columns which can be shown/hide in the table.
 */
export enum CommandBarSearchTableColumn {
  IS_MOVING = 'isMoving',
  SPEED = 'speed',
  SPEED_LIMIT_WARNING = 'speedLimitWarning',

  COLUMNS_MENU = 'columnsMenu',
}

export const NON_DATA_COLUMNS: CommandBarSearchTableColumn[] = [CommandBarSearchTableColumn.COLUMNS_MENU];

@Component({
  selector: 'esmf-ui-command-bar-search-table',
  templateUrl: './command-bar-search-table.component.html',
  styleUrls: ['./command-bar-search-table.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class CommandBarSearchTableComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {
  @Input() initialSearchString = '';

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

  @Input() hideColumns: CommandBarSearchTableColumn[] = [];

  @Input() hasAdvancedSearch: boolean = this.filterService.stringColumns.length > 1;

  @Input() maxExportRows: number = 0;

  @Output() rowClickEvent = new EventEmitter<any>();
  @Output() rowDblClickEvent = new EventEmitter<any>();
  @Output() rowRightClickEvent = new EventEmitter<any>();
  @Output() tableUpdateStartEvent = new EventEmitter<any>();
  @Output() tableUpdateFinishedEvent = new EventEmitter<any>();
  @Output() copyToClipboardEvent = new EventEmitter<any>();
  @Output() downloadEvent = new EventEmitter<{error: boolean; success: boolean; inProgress: boolean}>();
  @Output() rowSelectionEvent = new EventEmitter<any>();

  @ViewChild(MatSort) private sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatTable) private table!: MatTable<Movement>;
  @ViewChild(CommandBarSearchTableColumnMenuComponent) private columMenuComponent!: CommandBarSearchTableColumnMenuComponent;

  @ViewChild(CommandBarSearchTableConfigMenuComponent) private configurationComponent!: CommandBarSearchTableConfigMenuComponent;

  @ViewChild('searchInput') searchInput!: ElementRef;

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    if (!this.highlightColor) {
      return;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`--selected-row-highlight-color: ${this.highlightColor}`);
  }

  readonly KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_TABLE_COLUMNS = 'command_bar_search_table_columns';

  readonly KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_TABLE_CONFIG = 'command_bar_search_table_config';

  totalItems: number = 0;
  selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  dataSource: CommandBarSearchTableDataSource;

  columnToSort: {sortColumnName: string; sortDirection: SortDirection} = {sortColumnName: 'speedLimitWarning', sortDirection: 'asc'};
  // The list of column names that are displayed in the table, including NON_DATA_COLUMNS
  displayedColumns: CommandBarSearchTableColumn[] = [];
  // The list of available columns to select
  columns: Array<Column> = [];

  configs: Array<Config> = [];

  currentLanguage: string;
  filteredData: Array<Movement> = [];
  dragging: boolean = false;
  customRowActionsLength: number = 0;
  closeColumnMenu: boolean = false;
  rqlString: string = '';
  searchFocused: boolean = false;
  dataLoadError = false;

  highlightString: string[] = [];

  get highlightConfigColor(): string | undefined {
    return this.configs.find((config: Config) => config.name.includes('highlight'))?.color;
  }

  get highlightConfigSelector(): boolean | undefined {
    return this.configs.find((config: Config) => config.name.includes('highlight'))?.selected;
  }

  private readonly ngUnsubscribe = new Subject<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslocoService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private storageService: JSSdkLocalStorageService,
    @Inject(PaginatorSelectConfigInjector) public paginatorSelectConfig: MatPaginatorSelectConfig,
    public filterService: CommandBarSearchTableFilterService,
    private commandBarSearchTableService: CommandBarSearchTableService
  ) {
    this.dataSource = new CommandBarSearchTableDataSource(this.translateService);
    this.currentLanguage = this.translateService.getActiveLang();
  }

  ngOnInit(): void {
    this.filterService.searchStringInit(this.initialSearchString, this.regexValidator, this.minNumberCharacters, this.maxNumberCharacters);
    this.filterService.selectedStringColumn.valueChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100)).subscribe(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    });

    this.initializeColumns();

    this.initializeHighlightConfig();

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

  ngOnDestroy(): void {
    this.filterService.searchString.setValue('');
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
    this.displayedColumns = Object.values(CommandBarSearchTableColumn).filter(column => !this.hideColumns.includes(column));

    const columnStorage = this.storageService.getItem(this.KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_TABLE_COLUMNS);

    if (columnStorage?.length > 0) {
      columnStorage
        .filter(
          (column: Column) =>
            !this.hideColumns.includes(column.name as CommandBarSearchTableColumn) &&
            this.displayedColumns.find(columnName => columnName === column.name)
        )
        .forEach((column: Column) => this.columns.push({name: column.name, selected: column.selected}));
    }

    this.displayedColumns.forEach((displayedColumn: string): void => {
      if (
        !this.isAvailableDataColumn(displayedColumn as CommandBarSearchTableColumn) ||
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

  removeFilter(filterData: any) {
    this.filterService.removeFilter(filterData);

    this.paginator.firstPage();

    this.filterService.searchString.reset();

    this.applyFilters();
  }

  reloadFilter(): void {
    this.paginator.firstPage();
    this.applyFilters();
  }

  applyFilters() {
    if (this.filterService.searchString.errors) {
      return;
    }

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

    dataTemp = this.filterService.applyStringSearchFilter(dataTemp);
    this.highlightString = this.filterService.activeFilters
      .filter(elem => elem.type === FilterEnums.Search && elem.filterValue !== undefined)
      .map(elem => elem.filterValue as string);

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
          this.commandBarSearchTableService.flatten(this.data),
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
      this.commandBarSearchTableService.downloadCsv(csvArray);

      this.downloadEvent.emit({error: false, success: true, inProgress: false});
    } catch (error: any) {
      this.downloadEvent.emit({error: true, success: false, inProgress: false});
    }
  }

  initOpenedColumnMenuDialog(): void {
    this.columMenuComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_TABLE_COLUMNS;
    this.columMenuComponent.columnsDefault = [
      ...Object.values(CommandBarSearchTableColumn)
        .filter(columnName => this.isAvailableDataColumn(columnName))
        .map(columnName => ({name: columnName, selected: true})),
    ];
    this.columMenuComponent.columns.splice(0, this.columMenuComponent.columns.length);
    this.columMenuComponent.columns.push(...this.columns);
  }

  setConfiguration(configs: Array<Config>): void {
    this.configs = [...configs];
  }

  setDisplayedColumns(columns: Array<Column>): void {
    let displayedColumnsTmp: Array<Column> = [];

    displayedColumnsTmp.push(...columns);

    displayedColumnsTmp.push({name: CommandBarSearchTableColumn['COLUMNS_MENU'], selected: true});

    this.columns = [...columns];
    this.displayedColumns = displayedColumnsTmp.filter(column => column.selected).map(column => column.name as CommandBarSearchTableColumn);
  }

  loadCustomTemplate(): TemplateRef<any> | null {
    return this.customTemplate ? (this.customTemplate as TemplateRef<any>) : null;
  }

  checkIfOnValidPage(): void {
    if (this.paginator.length > this.filteredData.length) {
      this.paginator.firstPage();
    }
  }

  private initializeHighlightConfig(): void {
    const configStorage = this.storageService.getItem(this.KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_TABLE_CONFIG);

    if (configStorage?.length > 0) {
      configStorage.forEach((config: Config) => this.configs.push(config));
    } else {
      this.configs.push({name: 'settings.highlight.name', desc: 'settings.highlight.desc', selected: false, color: '#FFFF00'});
    }
  }

  private isAvailableDataColumn(column: CommandBarSearchTableColumn): boolean {
    return !(Array.isArray(this.hideColumns) && this.hideColumns.includes(column)) && !NON_DATA_COLUMNS.includes(column);
  }
}
