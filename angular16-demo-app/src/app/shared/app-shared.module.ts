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
import {HttpClient} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {ExportConfirmationDialogComponent} from './components/export-confirmation-dialog/export-confirmation-dialog.component';
import {HorizontalOverflowDirective} from './directives/horizontal-overflow.directive';
import {ResizeColumnDirective} from './directives/resize-column.directive';
import {ValidateInputDirective} from './directives/validate-input.directive';
import {ShowDescriptionPipe} from './pipes/show-description.pipe';
import {SearchStringPipe} from './pipes/search-string.pipe';

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
    ExportConfirmationDialogComponent,
    HorizontalOverflowDirective,
    ResizeColumnDirective,
    ValidateInputDirective,
    ShowDescriptionPipe,
    SearchStringPipe,
  ],
  declarations: [
    ExportConfirmationDialogComponent,
    HorizontalOverflowDirective,
    ResizeColumnDirective,
    ValidateInputDirective,
    ShowDescriptionPipe,
    SearchStringPipe,
  ],
})
export class AppSharedModule {}
