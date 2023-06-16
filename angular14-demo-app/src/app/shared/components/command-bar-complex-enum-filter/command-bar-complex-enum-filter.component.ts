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
    OnChanges,
    ChangeDetectionStrategy,
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {CommandBarComplexEnumFilterFilterService} from './command-bar-complex-enum-filter.filter.service';
import {Clipboard} from '@angular/cdk/clipboard';
import {unparse} from 'papaparse';
import {ExportConfirmationDialog} from '../export-confirmation-dialog/export-confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Movement, WarningLevel, ResultState} from '../../types/movement/movement.types';
import {CommandBarComplexEnumFilterDataSource} from './command-bar-complex-enum-filter-datasource';

import {DomSanitizer} from '@angular/platform-browser';
import {SelectionModel} from '@angular/cdk/collections';
import {TranslateService} from '@ngx-translate/core';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {CommandBarComplexEnumFilterColumnMenuComponent} from './command-bar-complex-enum-filter-column-menu.component';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {CommandBarComplexEnumFilterService, MovementResponse} from './command-bar-complex-enum-filter.service';

export interface Column {
    /** Column name **/
    name: string;
    /** State if the column is selected **/
    selected: boolean;
}

/**
 * Enumeration of all available columns which can be shown/hide in the table.
 */
export enum CommandBarComplexEnumFilterColumn {
    MOVING = 'moving',
    SPEED_LIMIT_WARNING = 'speedLimitWarning',
    START_DATE = 'startDate',
    END_DATE = 'endDate',
    RESULT_STATE = 'resultState',

    COLUMNS_MENU = 'columnsMenu',
}

@Component({
    selector: 'rbs-ui-command-bar-complex-enum-filter',
    templateUrl: './command-bar-complex-enum-filter.component.html',
    styleUrls: ['./command-bar-complex-enum-filter.component.scss'],
})
export class CommandBarComplexEnumFilterComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() tableDateTimeFormat = 'short';

    @Input() data: Array<Movement> = [];
    @Input() showFirstLastButtons: boolean = true;

    @Input() highlightSelectedRow: boolean = true;
    @Input() highlightColor = '';
    @Input() isMultipleSelectionEnabled = true;
    @Input() noDataMessage: string = '';
    @Input() visibleRowActionsIcons: number = 3;
    @Input() headerTooltipsOff: boolean = false;
    @Input() setStickRowActions: boolean = true;
    @Input() customTableClass: string = '';

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
    @ViewChild(CommandBarComplexEnumFilterColumnMenuComponent) private columMenuComponent!: CommandBarComplexEnumFilterColumnMenuComponent;

    @HostBinding('attr.style')
    public get valueAsStyle(): any {
        if (!this.highlightColor) {
            return;
        }
        return this.sanitizer.bypassSecurityTrustStyle(`--selected-row-highlight-color: ${this.highlightColor}`);
    }

    readonly KEY_LOCAL_STORAGE_COMMAND_BAR_COMPLEX_ENUM_FILTER_COLUMNS = 'command_bar_complex_enum_filter_columns';

    totalItems: number = 0;
    selection = new SelectionModel<any>(this.isMultipleSelectionEnabled, []);
    dataSource: CommandBarComplexEnumFilterDataSource;
    columnToSort: {sortColumnName: string; sortDirection: SortDirection} = {sortColumnName: 'endDate', sortDirection: 'asc'};
    displayedColumns: Array<string> = Object.values(CommandBarComplexEnumFilterColumn);
    columns: Array<Column> = [];
    currentLanguage: string;
    filteredData: Array<Movement> = [];
    dragging: boolean = false;
    customRowActionsLength: number = 0;
    closeColumnMenu: boolean = false;
    rqlString: string = '';

    constructor(
        private sanitizer: DomSanitizer,
        private translateService: TranslateService,
        public dialog: MatDialog,
        private clipboard: Clipboard,
        private storageService: JSSdkLocalStorageService,
        public filterService: CommandBarComplexEnumFilterFilterService,
        private commandBarComplexEnumFilterService: CommandBarComplexEnumFilterService
    ) {
        this.dataSource = new CommandBarComplexEnumFilterDataSource(this.translateService);

        this.currentLanguage = this.translateService.currentLang;
    }

    ngOnInit(): void {
        this.initializeColumns();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.table) {
            this.dataSource.setData(this.data);
            this.totalItems = this.data.length;
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
        if (this.storageService.getItem(this.KEY_LOCAL_STORAGE_COMMAND_BAR_COMPLEX_ENUM_FILTER_COLUMNS)) {
            this.storageService
                .getItem(this.KEY_LOCAL_STORAGE_COMMAND_BAR_COMPLEX_ENUM_FILTER_COLUMNS)
                .filter((column: Column) => this.displayedColumns.find(columnName => columnName === column.name))
                .map((column: Column) => this.columns.push({name: column.name, selected: column.selected}));
        }

        this.displayedColumns.forEach((displayedColumn: string): void => {
            if (
                displayedColumn === CommandBarComplexEnumFilterColumn['COLUMNS_MENU'] ||
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

    hideColumn(column: CommandBarComplexEnumFilterColumn): void {
        this.displayedColumns = this.displayedColumns.filter(columnName => columnName !== column);
    }

    showColumn(column: CommandBarComplexEnumFilterColumn, index: number): void {
        if (!this.displayedColumns.includes(column)) {
            this.displayedColumns.splice(index, 0, column);
        }
    }

    resetDisplayedColumns(): void {
        this.displayedColumns = Object.values(CommandBarComplexEnumFilterColumn);
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

    applyFilters(): void {
        this.tableUpdateStartEvent.emit();
        let dataTemp = [...this.data];
        dataTemp = this.filterService.applyEnumFilter(dataTemp);

        this.dataSource.setData(dataTemp);
        this.filteredData = dataTemp;
        this.checkIfOnValidPage();

        this.tableUpdateFinishedEvent.emit();
    }

    removeFilter(filterData: any): void {
        this.filterService.removeFilter(filterData);
        this.applyFilters();
    }

    exportToCsv(): void {
        this.openExportConfirmationDialog();
    }

    openExportConfirmationDialog(): void {
        const dialogRef = this.dialog.open(ExportConfirmationDialog, {
            data: {
                showSelectedOption: this.selection.selected.length,
            },
        });

        dialogRef.afterClosed().subscribe((exportEvent: string): void => {
            if (exportEvent === 'selected') this.prepareCsv(this.commandBarComplexEnumFilterService.flatten(this.selection.selected));

            if (exportEvent === 'allPages') this.prepareCsv(this.commandBarComplexEnumFilterService.flatten(this.dataSource.data));
        });
    }

    prepareCsv(data: any): void {
        const headersToExport = this.displayedColumns.filter(columnName => columnName !== CommandBarComplexEnumFilterColumn.COLUMNS_MENU);

        const headersCSV = unparse({
            fields: headersToExport
                .map(columnName => columnName.split('.').pop())
                .map(columnName => {
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
            this.commandBarComplexEnumFilterService.downloadCsv(csvArray);
            this.downloadEvent.emit({error: false, success: true, inProgress: false});
        } catch (error: any) {
            this.downloadEvent.emit({error: true, success: false, inProgress: false});
        }
    }

    initOpenedColumnMenuDialog(): void {
        this.columMenuComponent.keyLocalStorage = 'KEY_LOCAL_STORAGE_COMMAND_BAR_COMPLEX_ENUM_FILTER_COLUMNS';
        this.columMenuComponent.columnsDefault = [
            ...Object.values(CommandBarComplexEnumFilterColumn)

                .filter(columnName => columnName !== CommandBarComplexEnumFilterColumn['COLUMNS_MENU'])
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

        if (
            CommandBarComplexEnumFilterColumn['COLUMNS_MENU'] &&
            columns[columns.length - 1].name !== CommandBarComplexEnumFilterColumn['COLUMNS_MENU']
        ) {
            displayedColumnsTmp.push({name: CommandBarComplexEnumFilterColumn['COLUMNS_MENU'], selected: true});
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
