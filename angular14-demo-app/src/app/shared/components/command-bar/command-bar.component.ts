/*
 * Copyright (c) 2023 Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

/** Generated from RBS SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {
    AfterViewInit,
    Component,
    Input,
    ViewChild,
    Output,
    EventEmitter,
    SimpleChanges,
    HostBinding,
    Inject,
    OnInit,
    AfterViewChecked,
    TemplateRef,
    ElementRef,
    OnChanges,
    ChangeDetectionStrategy,
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';

import {Clipboard} from '@angular/cdk/clipboard';
import {unparse} from 'papaparse';
import {ExportConfirmationDialog} from '../export-confirmation-dialog/export-confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Movement} from '../../types/movement/movement.types';
import {CommandBarDataSource} from './command-bar-datasource';

import {DomSanitizer} from '@angular/platform-browser';
import {SelectionModel} from '@angular/cdk/collections';
import {TranslateService} from '@ngx-translate/core';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {CommandBarColumnMenuComponent} from './command-bar-column-menu.component';

import {filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CommandBarService, MovementResponse} from './command-bar.service';

export interface Column {
    /** Column name **/
    name: string;
    /** State if the column is selected **/
    selected: boolean;
}

/**
 * Enumeration of all available columns which can be shown/hide in the table.
 */
export enum CommandBarColumn {
    MOVING = 'moving',
    SPEED_LIMIT_WARNING = 'speedLimitWarning',
    START_DATE = 'startDate',
    END_DATE = 'endDate',

    COLUMNS_MENU = 'columnsMenu',
}

@Component({
    selector: 'rbs-ui-command-bar',
    templateUrl: './command-bar.component.html',
    styleUrls: ['./command-bar.component.scss'],
})
export class CommandBarComponent implements OnInit, AfterViewInit, AfterViewChecked, OnChanges {
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
    @ViewChild(CommandBarColumnMenuComponent) private columMenuComponent!: CommandBarColumnMenuComponent;

    @ViewChild('searchInput') searchInput!: ElementRef;

    @HostBinding('attr.style')
    public get valueAsStyle(): any {
        if (!this.highlightColor) {
            return;
        }
        return this.sanitizer.bypassSecurityTrustStyle(`--selected-row-highlight-color: ${this.highlightColor}`);
    }

    readonly KEY_LOCAL_STORAGE_COMMAND_BAR_COLUMNS = 'command_bar_columns';

    totalItems: number = 0;
    selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
    dataSource: CommandBarDataSource;
    columnToSort: {sortColumnName: string; sortDirection: SortDirection} = {sortColumnName: 'speedLimitWarning', sortDirection: 'asc'};
    displayedColumns: Array<string> = Object.values(CommandBarColumn);
    columns: Array<Column> = [];

    currentLanguage: string;
    filteredData: Array<Movement> = [];
    dragging: boolean = false;
    customRowActionsLength: number = 0;
    closeColumnMenu: boolean = false;
    rqlString: string = '';
    searchFocused: boolean = false;

    constructor(
        private sanitizer: DomSanitizer,
        private translateService: TranslateService,
        public dialog: MatDialog,
        private clipboard: Clipboard,
        private storageService: JSSdkLocalStorageService,

        private commandBarService: CommandBarService
    ) {
        this.dataSource = new CommandBarDataSource(this.translateService);

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
        const columnStorage = this.storageService.getItem(this.KEY_LOCAL_STORAGE_COMMAND_BAR_COLUMNS);

        if (columnStorage?.length > 0) {
            columnStorage
                .filter((column: Column) => this.displayedColumns.find(columnName => columnName === column.name))
                .forEach((column: Column) => this.columns.push({name: column.name, selected: column.selected}));
        }

        this.displayedColumns.forEach((displayedColumn: string): void => {
            if (displayedColumn === CommandBarColumn['COLUMNS_MENU'] || this.columns.find(column => column.name === displayedColumn)) {
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

    hideColumn(column: CommandBarColumn): void {
        this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== column);
    }

    showColumn(column: CommandBarColumn, index: number): void {
        if (!this.displayedColumns.includes(column)) {
            this.displayedColumns.splice(index, 0, column);
        }
    }

    resetDisplayedColumns(): void {
        this.displayedColumns = Object.values(CommandBarColumn);
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
        this.tableUpdateStartEvent.emit();
        let dataTemp = [...this.data];

        this.dataSource.setData(dataTemp);
        this.filteredData = dataTemp;
        this.totalItems = this.data.length;
        this.maxExportRows = this.totalItems;
        this.checkIfOnValidPage();

        this.tableUpdateFinishedEvent.emit();
    }

    removeFilter(filterData: any): void {
        this.paginator.firstPage();

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
                this.prepareCsv(this.commandBarService.flatten(this.data), exportAllColumns, exportAllPages, this.paginator.pageSize);
            });
    }

    prepareCsv(data: any, exportAllColumns: boolean, exportAllPages: boolean, currentPageSize: number): void {
        if (!exportAllPages && data.length > currentPageSize) {
            data.length = currentPageSize;
        }

        const columns = exportAllColumns ? this.columns.map(c => c.name) : this.displayedColumns;
        const headersToExport = columns.filter(columnName => columnName !== CommandBarColumn.COLUMNS_MENU);

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
            this.commandBarService.downloadCsv(csvArray);
            this.downloadEvent.emit({error: false, success: true, inProgress: false});
        } catch (error: any) {
            this.downloadEvent.emit({error: true, success: false, inProgress: false});
        }
    }

    initOpenedColumnMenuDialog(): void {
        this.columMenuComponent.keyLocalStorage = this.KEY_LOCAL_STORAGE_COMMAND_BAR_COLUMNS;
        this.columMenuComponent.columnsDefault = [
            ...Object.values(CommandBarColumn)

                .filter(columnName => columnName !== CommandBarColumn['COLUMNS_MENU'])
                .map(columnName => {
                    return {name: columnName, selected: true};
                }),
        ];
        this.columMenuComponent.columns.splice(0, this.columMenuComponent.columns.length);
        this.columMenuComponent.columns.push(...this.columns);
    }

    setDisplayedColumns(columns: Array<Column>): void {
        let displayedColumnsTmp: Array<Column> = [];

        displayedColumnsTmp.push(...columns);

        if (CommandBarColumn['COLUMNS_MENU'] && columns[columns.length - 1].name !== CommandBarColumn['COLUMNS_MENU']) {
            displayedColumnsTmp.push({name: CommandBarColumn['COLUMNS_MENU'], selected: true});
        }

        this.columns = [...columns];
        this.displayedColumns = displayedColumnsTmp.filter(column => column.selected).map(column => column.name);
    }

    checkIfOnValidPage(): void {
        if (this.paginator.length > this.filteredData.length) {
            this.paginator.firstPage();
        }
    }
}
