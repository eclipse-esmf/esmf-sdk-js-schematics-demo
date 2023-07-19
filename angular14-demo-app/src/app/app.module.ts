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

import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {BaseConfigModule} from 'src/app/shared/components/base-config/base-config.module';
import {CheckboxesModule} from 'src/app/shared/components/checkboxes/checkboxes.module';
import {CommandBarActionsModule} from 'src/app/shared/components/command-bar-actions/command-bar-actions.module';
import {CommandBarDateFilterModule} from 'src/app/shared/components/command-bar-date-filter/command-bar-date-filter.module';
import {CommandBarEnumFilterModule} from 'src/app/shared/components/command-bar-enum-filter/command-bar-enum-filter.module';
import {CommandBarSearchModule} from 'src/app/shared/components/command-bar-search/command-bar-search.module';
import {CommandBarModule} from 'src/app/shared/components/command-bar/command-bar.module';
import {ComplexPropSelectedModule} from 'src/app/shared/components/complex-prop-selected/complex-prop-selected.module';
import {CustomColumnModule} from 'src/app/shared/components/custom-column/custom-column.module';
import {DefaultSortingModule} from 'src/app/shared/components/default-sorting/default-sorting.module';
import {ExcludedPropertyModule} from 'src/app/shared/components/excluded-property/excluded-property.module';
import {RemoteDataModule} from 'src/app/shared/components/remote-data/remote-data.module';
import {RowActionButtonModule} from 'src/app/shared/components/row-action-button/row-action-button.module';
import {VersionSupportModule} from 'src/app/shared/components/version-support/v210/version-support.module';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SidenavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatSnackBarModule,
    FormsModule,
    RouterModule,
    BaseConfigModule,
    CheckboxesModule,
    CommandBarModule,
    CommandBarActionsModule,
    CommandBarDateFilterModule,
    CommandBarEnumFilterModule,
    CommandBarSearchModule,
    ComplexPropSelectedModule,
    CustomColumnModule,
    DefaultSortingModule,
    ExcludedPropertyModule,
    RemoteDataModule,
    RowActionButtonModule,
    VersionSupportModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
