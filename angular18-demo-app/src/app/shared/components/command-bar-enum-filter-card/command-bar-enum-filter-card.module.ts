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
import {CommandBarEnumFilterCardComponent} from './command-bar-enum-filter-card.component';

import {TranslocoModule} from '@jsverse/transloco';

import {CommandBarEnumFilterCardCommandBarComponent} from './command-bar-enum-filter-card-command-bar.component';

import {CommandBarEnumFilterCardChipListComponent} from './command-bar-enum-filter-card-chip-list.component';

import {NgClass, NgFor, NgForOf, NgIf, NgTemplateOutlet, SlicePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatOptionModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppSharedModule} from '../../app-shared.module';

@NgModule({
  declarations: [CommandBarEnumFilterCardComponent, CommandBarEnumFilterCardCommandBarComponent, CommandBarEnumFilterCardChipListComponent],
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
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    NgForOf,
    NgTemplateOutlet,
    SlicePipe,
  ],
  providers: [],
  exports: [
    CommandBarEnumFilterCardComponent,

    CommandBarEnumFilterCardCommandBarComponent,

    CommandBarEnumFilterCardChipListComponent,

    TranslocoModule,
  ],
})
export class CommandBarEnumFilterCardModule {}
