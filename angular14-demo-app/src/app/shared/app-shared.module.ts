/*
 * Copyright (c) 2023 Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

/** Generated from SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ExportConfirmationDialog} from 'src/app/shared/components/export-confirmation-dialog/export-confirmation-dialog.component';
import {HorizontalOverflowDirective} from 'src/app/shared/directives/horizontal-overflow.directive';
import {ResizeColumnDirective} from 'src/app/shared/directives/resize-column.directive';
import {ValidateInputDirective} from 'src/app/shared/directives/validate-input.directive';
import {SearchStringPipe} from 'src/app/shared/pipes/search-string.pipe';
import {ShowDescriptionPipe} from 'src/app/shared/pipes/show-description.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    NgIf,
  ],
  exports: [
    TranslateModule,
    ExportConfirmationDialog,
    ResizeColumnDirective,
    ValidateInputDirective,
    ShowDescriptionPipe,
    HorizontalOverflowDirective,
    SearchStringPipe,
  ],
  declarations: [
    ExportConfirmationDialog,
    ResizeColumnDirective,
    ValidateInputDirective,
    ShowDescriptionPipe,
    HorizontalOverflowDirective,
    SearchStringPipe,
  ],
})
export class AppSharedModule {}
