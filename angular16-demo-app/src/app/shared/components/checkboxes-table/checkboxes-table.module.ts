/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {NgModule} from '@angular/core';
import {CheckboxesTableComponent} from './checkboxes-table.component';

import {CheckboxesTableColumnMenuComponent} from './checkboxes-table-column-menu.component';

import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppSharedModule} from 'src/app/shared/app-shared.module';

@NgModule({
  declarations: [CheckboxesTableComponent, CheckboxesTableColumnMenuComponent],
  imports: [
    AppSharedModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    NgIf,
    NgFor,
    NgClass,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    ClipboardModule,
    MatListModule,
    DragDropModule,
    NgTemplateOutlet,
    DatePipe,
    MatCheckboxModule,
  ],
  providers: [],
  exports: [CheckboxesTableComponent],
})
export class CheckboxesTableModule {}
