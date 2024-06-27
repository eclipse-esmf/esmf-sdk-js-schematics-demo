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
import {NgModule} from '@angular/core';
import {CommandBarEnumFilterTableComponent} from './command-bar-enum-filter-table.component';

import {CommandBarEnumFilterTableCommandBarComponent} from './command-bar-enum-filter-table-command-bar.component';

import {CommandBarEnumFilterTableChipListComponent} from './command-bar-enum-filter-table-chip-list.component';

import {CommandBarEnumFilterTableColumnMenuComponent} from './command-bar-enum-filter-table-column-menu.component';

import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet} from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
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
import {AppSharedModule} from '../../app-shared.module';

@NgModule({ declarations: [
        CommandBarEnumFilterTableComponent,
        CommandBarEnumFilterTableColumnMenuComponent,
        CommandBarEnumFilterTableCommandBarComponent,
        CommandBarEnumFilterTableChipListComponent,
    ],
    exports: [CommandBarEnumFilterTableComponent, CommandBarEnumFilterTableCommandBarComponent, CommandBarEnumFilterTableChipListComponent], imports: [AppSharedModule,
        MatPaginatorModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        NgIf,
        NgFor,
        NgClass,
        MatDialogModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatChipsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatOptionModule,
        MatTableModule,
        MatSortModule,
        ClipboardModule,
        MatListModule,
        DragDropModule,
        NgTemplateOutlet,
        DatePipe], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CommandBarEnumFilterTableModule {}
