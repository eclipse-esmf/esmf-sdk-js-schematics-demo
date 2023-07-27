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
import {CommandBarEnumFilterComponent} from './command-bar-enum-filter.component';

import {CommandBarEnumFilterCommandBarComponent} from './command-bar-enum-filter-command-bar.component';

import {CommandBarEnumFilterChipListComponent} from './command-bar-enum-filter-chip-list.component';

import {CommandBarEnumFilterColumnMenuComponent} from './command-bar-enum-filter-column-menu.component';

import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppSharedModule} from 'src/app/shared/app-shared.module';

@NgModule({
  declarations: [
    CommandBarEnumFilterComponent,
    CommandBarEnumFilterColumnMenuComponent,

    CommandBarEnumFilterCommandBarComponent,

    CommandBarEnumFilterChipListComponent,
  ],
  imports: [
    AppSharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    ClipboardModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    DragDropModule,
    NgTemplateOutlet,
    DatePipe,
    NgIf,
    NgFor,
    NgClass,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMomentDateModule,
    MatOptionModule,
  ],
  providers: [],
  exports: [CommandBarEnumFilterComponent, CommandBarEnumFilterCommandBarComponent, CommandBarEnumFilterChipListComponent],
})
export class CommandBarEnumFilterModule {}
