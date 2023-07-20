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
import {VersionSupportComponent} from './version-support.component';

import {VersionSupportCommandBarComponent} from './version-support-command-bar.component';

import {VersionSupportChipListComponent} from './version-support-chip-list.component';

import {VersionSupportConfigMenuComponent} from './version-support-config-menu.component';

import {VersionSupportColumnMenuComponent} from './version-support-column-menu.component';

import {AppSharedModule} from 'src/app/shared/app-shared.module';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgTemplateOutlet, DatePipe, NgIf, NgFor, NgClass} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatOptionModule} from '@angular/material/core';

@NgModule({
  declarations: [
    VersionSupportComponent,
    VersionSupportColumnMenuComponent,

    VersionSupportCommandBarComponent,

    VersionSupportChipListComponent,

    VersionSupportConfigMenuComponent,
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
    MatCheckboxModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatSelectModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatOptionModule,
  ],
  providers: [],
  exports: [VersionSupportComponent, VersionSupportCommandBarComponent, VersionSupportChipListComponent],
})
export class VersionSupportModule {}
