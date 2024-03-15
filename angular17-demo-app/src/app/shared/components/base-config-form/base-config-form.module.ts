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
import {BaseConfigFormComponent} from './base-config-form.component';

import {NgClass, NgFor, NgIf} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppSharedModule} from '../../app-shared.module';
import {AltitudeComponent} from './altitude/altitude.component';
import {IsMovingComponent} from './is-moving/is-moving.component';
import {LatitudeComponent} from './latitude/latitude.component';
import {LongitudeComponent} from './longitude/longitude.component';
import {PositionComponent} from './position/position.component';
import {SpeedLimitWarningComponent} from './speed-limit-warning/speed-limit-warning.component';
import {SpeedComponent} from './speed/speed.component';

@NgModule({
  declarations: [BaseConfigFormComponent],
  imports: [
    AppSharedModule,
    IsMovingComponent,
    PositionComponent,
    LatitudeComponent,
    LongitudeComponent,
    AltitudeComponent,
    SpeedComponent,
    SpeedLimitWarningComponent,
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
    MatNativeDateModule,
  ],
  providers: [],
  exports: [BaseConfigFormComponent],
})
export class BaseConfigFormModule {}
