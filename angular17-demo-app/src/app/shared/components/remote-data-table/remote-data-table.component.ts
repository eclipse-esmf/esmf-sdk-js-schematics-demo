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
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';

import {Clipboard} from '@angular/cdk/clipboard';

import {MatDialog} from '@angular/material/dialog';
import {Movement} from '../../types/movement/movement.types';
import {RemoteDataTableDataSource} from './remote-data-table-datasource';

import {SelectionModel} from '@angular/cdk/collections';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslocoService} from '@ngneat/transloco';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {RemoteDataTableColumnMenuComponent} from './remote-data-table-column-menu.component';

import {takeUntil} from 'rxjs/operators';

import {Subject, Subscription, catchError, finalize, tap} from 'rxjs';

import {AbstractArrayNode, AbstractNode, And, Eq, Limit, Query, QueryStringifier, Sort} from 'rollun-ts-rql';
import {SortOptions} from 'rollun-ts-rql/dist/nodes/Sort';
import {CustomRemoteDataTableService} from './custom-remote-data-table.service';
import {MovementResponse} from './remote-data-table.service';

/**
 * Interface of a CustomRQLFilterExtension which will be used to
 * modify the RQL query before the API service will be called to query
 * the backend.
 */
export interface CustomRQLFilterExtension {
  /**
   * Apply modification to the given RQL query
   */
  apply(query: And): void;
}

/**
 * Interface of a CustomRQLOptionExtension which will be used to
 * modify the RQL query before the API service will be called to query
 * the backend.
 */
export interface CustomRQLOptionExtension {
  /**
   * Apply modification to the given RQL query
   */
  apply(query: Query): void;
}

/**
 * Interface of ExtendedCsvExporter which will used to export data
 * from a remote backend.
 */
export interface ExtendedCsvExporter {
  /**
   * Exports the all data
   */
  export(displayedColumns: string[], rqlQuery: string): void;
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
export enum RemoteDataTableColumn {
  IS_MOVING = 'isMoving',
  SPEED = 'speed',
  SPEED_LIMIT_WARNING = 'speedLimitWarning',

  COLUMNS_MENU = 'columnsMenu',
}

@Component({
  selector: 'esmf-ui-remote-data-table',
  templateUrl: './remote-data-table.component.html',
  styleUrls: ['./remote-data-table.component.scss'],

  encapsulation: ViewEncapsulation.None,
})
export class RemoteDataTableComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges, OnDestroy {
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

  @Input() maxExportRows: number = 5000;
  @Input() customFilterExtension: CustomRQLFilterExtension | undefined;
  @Input() customOptionsExtension: CustomRQLOptionExtension | undefined;
  @Input() extendedCsvExporter: ExtendedCsvExporter | undefined;
  @Input() remoteAPI: string = '';

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
  @ViewChild(RemoteDataTableColumnMenuComponent) private columMenuComponent!: RemoteDataTableColumnMenuComponent;

  @ViewChild('searchInput') searchInput!: ElementRef;

  @HostBinding('attr.style')
  public get valueAsStyle(): any {
    if (!this.highlightColor) {
      return;
    }
    return this.sanitizer.bypassSecurityTrustStyle(`--selected-row-highlight-color: ${this.highlightColor}`);
  }

  readonly KEY_LOCAL_STORAGE_REMOTE_DATA_TABLE_COLUMNS = 'remote_data_table_columns';

  totalItems: number = 0;
  selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
  dataSource: RemoteDataTableDataSource;

  columnToSort: {sortColumnName: string; sortDirection: SortDirection} = {sortColumnName: 'speedLimitWarning', sortDirection: 'asc'};
  displayedColumns: Array<string> = Object.values(RemoteDataTableColumn);
  columns: Array<Column> = [];

  currentLanguage: string;
  filteredData: Array<Movement> = [];
  dragging: boolean = false;
  customRowActionsLength: number = 0;
  closeColumnMenu: boolean = false;
  rqlString: string = '';
  searchFocused: boolean = false;
  dataLoadError = false;

  private readonly ngUnsubscribe = new Subject<void>();

  private requestSubscription: Subscription = new Subscription();

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslocoService,
    public dialog: MatDialog,
    private clipboard: Clipboard,
    private storageService: JSSdkLocalStorageService,

    private customRemoteDataTableService: CustomRemoteDataTableService
  ) {
    this.dataSource = new RemoteDataTableDataSource();
    this.currentLanguage = this.translateService.getActiveLang();
  }

  ngOnInit(): void {
    this.initializeColumns();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes?.remoteAPI?.currentValue && !changes.remoteAPI.isFirstChange()) ||
      (changes?.customFilterExtension?.currentValue && !changes.customFilterExtension.isFirstChange())
    ) {
      if (this.paginator.pageIndex !== 0) {
        this.paginator.firstPage();
      } else {
        this.applyFilters();
      }
    }
  }

  ngOnDestroy(): void {
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
    const columnStorage = this.storageService.getItem(this.KEY_LOCAL_STORAGE_REMOTE_DATA_TABLE_COLUMNS);

    if (columnStorage?.length > 0) {
      columnStorage
        .filter((column: Column) => this.displayedColumns.find(columnName => columnName === column.name))
        .forEach((column: Column) => this.columns.push({name: column.name, selected: column.selected}));
    }

    this.displayedColumns.forEach((displayedColumn: string): void => {
      if (displayedColumn === RemoteDataTableColumn['COLUMNS_MENU'] || this.columns.find(column => column.name === displayedColumn)) {
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

  hideColumn(column: RemoteDataTableColumn): void {
    this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== column);
  }

  showColumn(column: RemoteDataTableColumn, index: number): void {
    if (!this.displayedColumns.includes(column)) {
      this.displayedColumns.splice(index, 0, column);
    }
  }

  resetDisplayedColumns(): void {
    this.displayedColumns = Object.values(RemoteDataTableColumn);
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

  reloadFilter(): void {
    this.paginator.firstPage();
    this.applyFilters();
  }

  private requestData() {
    const query = new And();

    if (this.customFilterExtension) this.customFilterExtension.apply(query);

    const queryFilter = new Query({query: query});

    const queryOption = new Query();

    const sortProperty = this.sort.active;
    const sortDirection = this.sort.direction === 'asc' ? 1 : -1;

    queryOption.setSort(new Sort(<SortOptions>{sortProperty: sortDirection}));
    queryOption.setLimit(new Limit(this.paginator.pageIndex * this.paginator.pageSize, this.paginator.pageSize));

    if (this.customOptionsExtension) this.customOptionsExtension.apply(queryOption);

    const additionalCondition = new Eq('local', 'EN');
    queryFilter?.queryNode.subNodes.push(additionalCondition);

    const filterRQLQuery = queryFilter ? QueryStringifier.stringify(queryFilter) : '';
    const optionsRQLQuery = QueryStringifier.stringify(queryOption).replace(/&/g, ',');

    let rqlStringTemp = '';
    if (filterRQLQuery.length > 0) {
      rqlStringTemp = `filter=${filterRQLQuery}`;
    }

    if (optionsRQLQuery.length > 0) {
      rqlStringTemp = `${rqlStringTemp}${rqlStringTemp !== '' ? '&' : ''}option=${optionsRQLQuery}`;
    }

    if (!(QueryStringifier as any)['superParseQueryNode']) {
      (QueryStringifier as any)['superParseQueryNode'] = QueryStringifier['parseQueryNode'];
    }

    QueryStringifier['parseQueryNode'] = (node?: AbstractNode): string => {
      let result = (QueryStringifier as any)['superParseQueryNode'](node);
      if (node instanceof AbstractArrayNode) {
        const arrayNode = <AbstractArrayNode>node;
        const encodedValues = arrayNode.values.map(value => QueryStringifier['withType'](QueryStringifier['withEncoding'](value)));

        // ensure outer brackets are not used. valid query ..in(<name>, "value1", "value2", ...)..
        result = `${QueryStringifier['withEncoding'](arrayNode.name, {isField: true})}(${QueryStringifier['withEncoding'](arrayNode.field, {
          isField: true,
        })}, ${encodedValues.join(',')})`;
      }
      return result;
    };

    this.rqlString = rqlStringTemp;

    if (this.requestSubscription && !this.requestSubscription.closed) {
      this.requestSubscription.unsubscribe();
    }

    this.requestSubscription = this.customRemoteDataTableService
      .requestData(this.remoteAPI, {query: rqlStringTemp})
      .pipe(
        tap((movementResponse: MovementResponse) => {
          this.dataLoadError = false;
          this.totalItems =
            movementResponse.totalItems !== null && movementResponse.totalItems !== undefined
              ? movementResponse.totalItems
              : movementResponse.items.length;
          this.maxExportRows = this.totalItems;

          const dataToShow = movementResponse.items;
          this.dataSource.setData(dataToShow);
          this.paginator.length = dataToShow.length;

          this.dataSource.paginator = this.paginator;
        }),
        catchError((error: any) => {
          this.dataLoadError = false;

          const dataToShow = [];
          this.dataSource.setData([]);

          throw new Error(error.message);
        }),
        finalize(() => this.tableUpdateFinishedEvent.emit()),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe();
  }

  applyFilters() {
    this.tableUpdateStartEvent.emit();

    this.requestData();

    this.tableUpdateFinishedEvent.emit();
  }

  initOpenedColumnMenuDialog(): void {
    this.columMenuComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_REMOTE_DATA_TABLE_COLUMNS;
    this.columMenuComponent.columnsDefault = [
      ...Object.values(RemoteDataTableColumn)

        .filter(columnName => columnName !== RemoteDataTableColumn['COLUMNS_MENU'])
        .map(columnName => ({name: columnName, selected: true})),
    ];
    this.columMenuComponent.columns.splice(0, this.columMenuComponent.columns.length);
    this.columMenuComponent.columns.push(...this.columns);
  }

  setDisplayedColumns(columns: Array<Column>): void {
    let displayedColumnsTmp: Array<Column> = [];

    displayedColumnsTmp.push(...columns);

    if (RemoteDataTableColumn['COLUMNS_MENU'] && columns[columns.length - 1].name !== RemoteDataTableColumn['COLUMNS_MENU']) {
      displayedColumnsTmp.push({name: RemoteDataTableColumn['COLUMNS_MENU'], selected: true});
    }

    this.columns = [...columns];
    this.displayedColumns = displayedColumnsTmp.filter(column => column.selected).map(column => column.name);
  }

  loadCustomTemplate(): TemplateRef<any> | null {
    return this.customTemplate ? (this.customTemplate as TemplateRef<any>) : null;
  }
}
