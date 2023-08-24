/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, EventEmitter, Output} from '@angular/core';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {Column} from './checkboxes-table.component';

@Component({
  selector: 'checkboxes-table-column-menu',
  styleUrls: ['./checkboxes-table-column-menu.component.scss'],
  templateUrl: './checkboxes-table-column-menu.component.html',
})
export class CheckboxesTableColumnMenuComponent {
  @Output() columnsChangedEvent = new EventEmitter<any>();

  columnsDefault: Array<Column> = [];
  columns: Array<Column> = [];
  closeColumnMenu: boolean = false;
  keyLocalStorage: string = '';

  constructor(private storageService: JSSdkLocalStorageService) {}

  closeMenu(): void {
    this.resetStoredColumns();
    this.closeColumnMenu = true;
  }

  stopMenuClosing(event: MouseEvent): void {
    if (this.closeColumnMenu) {
      return;
    }
    event.stopPropagation();
  }

  columnClick(event: MouseEvent, column: Column): void {
    this.closeColumnMenu = false;
    column.selected = !column.selected;
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Reset columns to defaults which are all available columns
   */
  resetStoredColumns(event?: MouseEvent): void {
    event?.preventDefault();
    event?.stopPropagation();
    this.columns = JSON.parse(JSON.stringify(this.columnsDefault));
  }

  /**
   * Store columns locally and update displayed columns afterwards
   */
  storeColumns(): void {
    this.closeColumnMenu = true;
    this.storageService.setItem(this.keyLocalStorage, this.columns);
    this.columnsChangedEvent.emit(this.columns);
  }

  /**
   * Order of a column is changed
   */
  columnDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }
}
