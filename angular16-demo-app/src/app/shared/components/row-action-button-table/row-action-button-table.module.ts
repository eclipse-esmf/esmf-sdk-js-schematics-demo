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
import {NgModule} from '@angular/core';
import {RowActionButtonTableComponent} from './row-action-button-table.component';

import {RowActionButtonTableColumnMenuComponent} from './row-action-button-table-column-menu.component';

import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
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
  declarations: [RowActionButtonTableComponent, RowActionButtonTableColumnMenuComponent],
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
  ],
  providers: [],
  exports: [RowActionButtonTableComponent],
})
export class RowActionButtonTableModule {}
