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
import {VersionSupportFormComponent} from './version-support-form.component';

import {AppSharedModule} from 'src/app/shared/app-shared.module';
import {MovingComponent} from './moving/moving.component';
import {SpeedLimitWarningComponent} from './speed-limit-warning/speed-limit-warning.component';
import {PositionComponent} from './position/position.component';
import {XComponent} from './x/x.component';
import {YComponent} from './y/y.component';
import {ZComponent} from './z/z.component';
import {StartDateComponent} from './start-date/start-date.component';
import {EndDateComponent} from './end-date/end-date.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NgIf, NgFor, NgClass} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from '@angular-material-components/datetime-picker';

@NgModule({
  declarations: [VersionSupportFormComponent],
  imports: [
    AppSharedModule,
    MovingComponent,
    SpeedLimitWarningComponent,
    PositionComponent,
    XComponent,
    YComponent,
    ZComponent,
    StartDateComponent,
    EndDateComponent,
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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule,
  ],
  providers: [],
  exports: [VersionSupportFormComponent],
})
export class VersionSupportFormModule {}
