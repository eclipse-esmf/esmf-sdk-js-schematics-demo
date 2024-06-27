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
import {ExcludedPropertyCardComponent} from './excluded-property-card.component';

import {TranslocoModule} from '@ngneat/transloco';

import {NgClass, NgFor, NgForOf, NgIf, NgTemplateOutlet, SlicePipe} from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {AppSharedModule} from '../../app-shared.module';

@NgModule({ declarations: [ExcludedPropertyCardComponent],
    exports: [ExcludedPropertyCardComponent, TranslocoModule], imports: [AppSharedModule,
        MatPaginatorModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        NgIf,
        NgFor,
        NgClass,
        MatDialogModule,
        MatCardModule,
        NgForOf,
        NgTemplateOutlet,
        SlicePipe], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ExcludedPropertyCardModule {}
