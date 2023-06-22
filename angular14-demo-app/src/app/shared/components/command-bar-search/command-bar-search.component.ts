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
import {Clipboard} from '@angular/cdk/clipboard';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {unparse} from 'papaparse';
import {Movement} from '../../types/movement/movement.types';
import {ExportConfirmationDialog} from '../export-confirmation-dialog/export-confirmation-dialog.component';
import {CommandBarSearchDataSource} from './command-bar-search-datasource';
import {CommandBarSearchFilterService, FilterEnums} from './command-bar-search.filter.service';

import {SelectionModel} from '@angular/cdk/collections';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {Subject} from 'rxjs';
import {debounceTime, filter, takeUntil} from 'rxjs/operators';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {CommandBarSearchColumnMenuComponent} from './command-bar-search-column-menu.component';
import {CommandBarSearchConfigMenuComponent} from './command-bar-search-config-menu.component';
import {CommandBarSearchService} from './command-bar-search.service';

export interface Column {
  /** Column name **/
  name: string;
  /** State if the column is selected **/
  selected: boolean;
}

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

/**
 * Enumeration of all available columns which can be shown/hide in the table.
 */
export enum CommandBarSearchColumn {
  MOVING = 'moving',
  SPEED_LIMIT_WARNING = 'speedLimitWarning',
  START_DATE = 'startDate',
  END_DATE = 'endDate',

  COLUMNS_MENU = 'columnsMenu',
}

@Component({
  selector: 'esmf-ui-command-bar-search',
  templateUrl: './command-bar-search.component.html',
  styleUrls: ['./command-bar-search.component.scss'],
})
export class CommandBarSearchComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {
  @Input() initialSearchString = '';

  @Input() tableDateTimeFormat = 'short';

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
  @Input() visibleRowActionsIcons: number = 3;
  @Input() headerTooltipsOff: boolean = false;
  @Input() setStickRowActions: boolean = true;
  @Input() customTableClass: string = '';
  @Input() debounceTime: number = 500;
  @Input() minNumberCharacters: number = 2;
  @Input() maxNumberCharacters: number = 50;
  @Input() allowedCharacters: string = '';
  @Input() regexValidator: string = '';
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
  @ViewChild(CommandBarSearchColumnMenuComponent) private columMenuComponent!: CommandBarSearchColumnMenuComponent;
  @ViewChild(CommandBarSearchConfigMenuComponent) private configurationComponent!: CommandBarSearchConfigMenuComponent;
  @ViewChild('searchInput') searchInput!: ElementRef;

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    if (!this.highlightColor) {
      return;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`--selected-row-highlight-color: ${this.highlightColor}`);
  }

  readonly KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_COLUMNS = 'command_bar_search_columns';

  readonly KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_CONFIG = 'command_bar_search_config';

  totalItems: number = 0;
  selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  dataSource: CommandBarSearchDataSource;
  columnToSort: {sortColumnName: string; sortDirection: SortDirection} = {sortColumnName: 'endDate', sortDirection: 'asc'};
  displayedColumns: Array<string> = Object.values(CommandBarSearchColumn);
  columns: Array<Column> = [];
  configs: Array<Config> = [];
  currentLanguage: string;
  filteredData: Array<Movement> = [];
  dragging: boolean = false;
  customRowActionsLength: number = 0;
  closeColumnMenu: boolean = false;
  rqlString: string = '';
  searchFocused: boolean = false;

  highlightString: string[] = [];

  get highlightConfig(): Config | undefined {
    return this.configs.find((config: Config) => config.name.includes('highlight'));
  }

  private readonly ngUnsubscribe = new Subject<void>();

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private storageService: JSSdkLocalStorageService,
    public filterService: CommandBarSearchFilterService,
    private commandBarSearchService: CommandBarSearchService
  ) {
    this.dataSource = new CommandBarSearchDataSource(this.translateService);

    this.currentLanguage = this.translateService.currentLang;
  }

  ngOnInit(): void {
    this.filterService.searchStringInit(this.initialSearchString, this.regexValidator, this.minNumberCharacters, this.maxNumberCharacters);
    this.filterService.selectedStringColumn.valueChanges.pipe(takeUntil(this.ngUnsubscribe), debounceTime(100)).subscribe(() => {
      if (this.searchInput) {
        this.searchInput.nativeElement.focus();
      }
    });

    this.initializeColumns();
    this.maxExportRows = this.data.length;
  }
  ngOnChanges(changes: SimpleChanges): void {
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
    const configStorage = this.storageService.getItem(this.KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_CONFIG);
    const columnStorage = this.storageService.getItem(this.KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_COLUMNS);

    if (configStorage?.length > 0) {
      configStorage.forEach((config: Config) => this.configs.push(config));
    } else {
      this.configs.push({name: 'settings.highlight.name', desc: 'settings.highlight.desc', selected: false, color: '#FFFF00'});
    }

    if (columnStorage?.length > 0) {
      columnStorage
        .filter((column: Column) => this.displayedColumns.find(columnName => columnName === column.name))
        .forEach((column: Column) => this.columns.push({name: column.name, selected: column.selected}));
    }

    this.displayedColumns.forEach((displayedColumn: string): void => {
      if (displayedColumn === CommandBarSearchColumn['COLUMNS_MENU'] || this.columns.find(column => column.name === displayedColumn)) {
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

  hideColumn(column: CommandBarSearchColumn): void {
    this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== column);
  }

  showColumn(column: CommandBarSearchColumn, index: number): void {
    if (!this.displayedColumns.includes(column)) {
      this.displayedColumns.splice(index, 0, column);
    }
  }

  resetDisplayedColumns(): void {
    this.displayedColumns = Object.values(CommandBarSearchColumn);
  }

  pageChange(): void {
    this.applyFilters();
  }

  sortData(): void {
    this.applyFilters();
  }

  trackBy(index: number): number {
    return index;
  }

  rowClicked(row: any, $event: MouseEvent): boolean {
    if (this.highlightSelectedRow) {
      this.checkboxClicked(row);
    }
    if ($event.type === 'contextmenu') {
      $event.preventDefault();
      let mousePositionOnClick = {x: $event.clientX + 'px', y: $event.clientY + 'px'};
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

  reloadFilter(): void {
    this.paginator.firstPage();
    this.applyFilters();
  }

  applyFilters(): void {
    if (this.filterService.searchString.errors) {
      return;
    }
    this.tableUpdateStartEvent.emit();
    let dataTemp = [...this.data];

    dataTemp = this.filterService.applyStringSearchFilter(dataTemp);
    this.highlightString = this.filterService.activeFilters
      .filter(elem => elem.type === FilterEnums.Search && elem.filterValue !== undefined)
      .map(elem => elem.filterValue as string);

    this.dataSource.setData(dataTemp);
    this.filteredData = dataTemp;
    this.totalItems = this.data.length;
    this.maxExportRows = this.totalItems;
    this.checkIfOnValidPage();

    this.tableUpdateFinishedEvent.emit();
  }

  removeFilter(filterData: any): void {
    this.filterService.removeFilter(filterData);
    this.paginator.firstPage();
    this.filterService.searchString.reset();
    this.applyFilters();
  }

  exportToCsv() {
    this.openExportConfirmationDialog();
  }

  openExportConfirmationDialog() {
    const reduce = this.displayedColumns.filter(col => col === 'checkboxes' || col === 'columnsMenu').length;

    const dialogRef = this.dialog.open(ExportConfirmationDialog, {
      data: {
        allColumns: this.columns.length,
        displayedColumns: this.displayedColumns.length - reduce,
        maxExportRows: this.maxExportRows,
      },
      maxWidth: 478,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(e => !!e))
      .subscribe((exportEvent: {exportAllPages: boolean; exportAllColumns: boolean}): void => {
        const {exportAllPages, exportAllColumns} = exportEvent;

        if (exportAllPages && this.data.length > this.maxExportRows) {
          this.data.length = this.maxExportRows;
        }
        this.prepareCsv(this.commandBarSearchService.flatten(this.data), exportAllColumns, exportAllPages, this.paginator.pageSize);
      });
  }

  prepareCsv(data: any, exportAllColumns: boolean, exportAllPages: boolean, currentPageSize: number): void {
    if (!exportAllPages && data.length > currentPageSize) {
      data.length = currentPageSize;
    }

    const columns = exportAllColumns ? this.columns.map(c => c.name) : this.displayedColumns;
    const headersToExport = columns.filter(columnName => columnName !== CommandBarSearchColumn.COLUMNS_MENU);

    const headersCSV = unparse({
      fields: headersToExport.map(columnName => {
        const translatedHeader = this.translateService.instant(`${columnName}.preferredName`);
        return translatedHeader !== `${columnName}.preferredName` ? translatedHeader : columnName;
      }),
      data: [],
    });

    this.downloadCsv(`${headersCSV}${unparse(data, {header: false, columns: headersToExport})}`);
  }

  downloadCsv(csvArray: any): void {
    this.downloadEvent.emit({error: false, success: false, inProgress: true});
    try {
      this.commandBarSearchService.downloadCsv(csvArray);
      this.downloadEvent.emit({error: false, success: true, inProgress: false});
    } catch (error: any) {
      this.downloadEvent.emit({error: true, success: false, inProgress: false});
    }
  }

  initOpenedColumnMenuDialog(): void {
    this.columMenuComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_COLUMNS;
    this.columMenuComponent.columnsDefault = [
      ...Object.values(CommandBarSearchColumn)

        .filter(columnName => columnName !== CommandBarSearchColumn['COLUMNS_MENU'])
        .map(columnName => {
          return {name: columnName, selected: true};
        }),
    ];
    this.columMenuComponent.columns.splice(0, this.columMenuComponent.columns.length);
    this.columMenuComponent.columns.push(...this.columns);
  }

  initOpenedConfigurationDialog(): void {
    this.configurationComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_COMMAND_BAR_SEARCH_CONFIG;
    this.configurationComponent.configs.splice(0, this.configurationComponent.configs.length);
    this.configurationComponent.configs.push(...this.configs.map(config => ({...config})));
  }

  setConfiguration(configs: Array<Config>): void {
    this.configs = [...configs];
  }

  shouldHighlight(name: string, letter: string): boolean {
    const highlightLetters = [...new Set(this.highlightString.join().split(''))].join();
    const index = name.toString().indexOf(letter);
    return index !== -1 && highlightLetters.includes(name.toString()[index]);
  }

  setDisplayedColumns(columns: Array<Column>): void {
    let displayedColumnsTmp: Array<Column> = [];

    displayedColumnsTmp.push(...columns);

    if (CommandBarSearchColumn['COLUMNS_MENU'] && columns[columns.length - 1].name !== CommandBarSearchColumn['COLUMNS_MENU']) {
      displayedColumnsTmp.push({name: CommandBarSearchColumn['COLUMNS_MENU'], selected: true});
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
