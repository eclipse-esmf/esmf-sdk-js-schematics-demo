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

import {NgIf} from '@angular/common';
import {isDevMode, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {provideTransloco, TranslocoModule} from '@ngneat/transloco';
import {environment} from '../../environments/environment';
import {ExportCardDialogComponent} from './components/export-confirmation-dialog/export-card-dialog.component';
import {ExportTableDialogComponent} from './components/export-confirmation-dialog/export-table-dialog.component';
import {HighlightDirective} from './directives/highlight.directive';
import {HorizontalOverflowDirective} from './directives/horizontal-overflow.directive';
import {ResizeColumnDirective} from './directives/resize-column.directive';
import {ValidateInputDirective} from './directives/validate-input.directive';
import {ShowDescriptionPipe} from './pipes/show-description.pipe';
import {TransLocoHttpLoader} from './trans-loco-http-loader';

export const baseUrl = (environment as any).baseUrl || '';

@NgModule({
  imports: [TranslocoModule, MatButtonModule, MatDialogModule, MatCheckboxModule, MatIconModule, FormsModule, NgIf],
  exports: [
    TranslocoModule,
    ExportTableDialogComponent,
    HorizontalOverflowDirective,
    ResizeColumnDirective,
    ValidateInputDirective,
    ShowDescriptionPipe,
    HighlightDirective,
    ExportCardDialogComponent,
  ],
  providers: [
    provideTransloco({
      config: {
        availableLangs: ['en'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TransLocoHttpLoader,
    }),
  ],
  declarations: [
    ExportTableDialogComponent,
    HorizontalOverflowDirective,
    ResizeColumnDirective,
    ValidateInputDirective,
    ShowDescriptionPipe,
    HighlightDirective,
    ExportCardDialogComponent,
  ],
})
export class AppSharedModule {}
