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

import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {BaseConfigTableModule} from './shared/components/base-config-table/base-config-table.module';
import {CommandBarActionsTableModule} from './shared/components/command-bar-actions-table/command-bar-actions-table.module';
import {CommandBarDateFilterTableModule} from './shared/components/command-bar-date-filter-table/command-bar-date-filter-table.module';
import {CommandBarEnumFilterTableModule} from './shared/components/command-bar-enum-filter-table/command-bar-enum-filter-table.module';
import {CommandBarSearchTableModule} from './shared/components/command-bar-search-table/command-bar-search-table.module';
import {CommandBarTableModule} from './shared/components/command-bar-table/command-bar-table.module';
import {ComplexPropSelectedTableModule} from './shared/components/complex-prop-selected-table/complex-prop-selected-table.module';
import {CustomColumnTableModule} from './shared/components/custom-column-table/custom-column-table.module';
import {DefaultSortingTableModule} from './shared/components/default-sorting-table/default-sorting-table.module';
import {ExcludedPropertyTableModule} from './shared/components/excluded-property-table/excluded-property-table.module';
import {RemoteDataTableModule} from './shared/components/remote-data-table/remote-data-table.module';
import {RowActionButtonTableModule} from './shared/components/row-action-button-table/row-action-button-table.module';
import {VersionSupportTableModule} from './shared/components/version-support-table/v210/version-support-table.module';

import {SidenavComponent} from './components/sidenav/sidenav.component';
import {BaseConfigCardModule} from './shared/components/base-config-card/base-config-card.module';
import {BaseConfigFormModule} from './shared/components/base-config-form/base-config-form.module';
import {CheckboxesCardModule} from './shared/components/checkboxes-card/checkboxes-card.module';
import {CheckboxesTableModule} from './shared/components/checkboxes-table/checkboxes-table.module';
import {CommandBarActionsCardModule} from './shared/components/command-bar-actions-card/command-bar-actions-card.module';
import {CommandBarCardModule} from './shared/components/command-bar-card/command-bar-card.module';
import {CommandBarDateFilterCardModule} from './shared/components/command-bar-date-filter-card/command-bar-date-filter-card.module';
import {CommandBarEnumFilterCardModule} from './shared/components/command-bar-enum-filter-card/command-bar-enum-filter-card.module';
import {CommandBarSearchCardModule} from './shared/components/command-bar-search-card/command-bar-search-card.module';
import {ComplexPropSelectedCardModule} from './shared/components/complex-prop-selected-card/complex-prop-selected-card.module';
import {DefaultSortingCardModule} from './shared/components/default-sorting-card/default-sorting-card.module';
import {ExcludedPropertyCardModule} from './shared/components/excluded-property-card/excluded-property-card.module';
import {ExcludedPropertyFormModule} from './shared/components/excluded-property-form/excluded-property-form.module';
import {VersionSupportCardModule} from './shared/components/version-support-card/v210/version-support-card.module';
import {VersionSupportFormModule} from './shared/components/version-support-form/v210/version-support-form.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, SidenavComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatTabsModule,
    MatSnackBarModule,
    FormsModule,
    RouterModule,
    BaseConfigTableModule,
    CommandBarTableModule,
    CommandBarActionsTableModule,
    CommandBarDateFilterTableModule,
    CommandBarEnumFilterTableModule,
    CommandBarSearchTableModule,
    ComplexPropSelectedTableModule,
    CustomColumnTableModule,
    DefaultSortingTableModule,
    ExcludedPropertyTableModule,
    RemoteDataTableModule,
    RowActionButtonTableModule,
    VersionSupportTableModule,
    BaseConfigTableModule,
    CheckboxesTableModule,
    CommandBarTableModule,
    CommandBarActionsTableModule,
    CommandBarDateFilterTableModule,
    CommandBarEnumFilterTableModule,
    CommandBarSearchTableModule,
    ComplexPropSelectedTableModule,
    CustomColumnTableModule,
    DefaultSortingTableModule,
    ExcludedPropertyTableModule,
    RemoteDataTableModule,
    RowActionButtonTableModule,
    VersionSupportTableModule,
    BaseConfigCardModule,
    CommandBarCardModule,
    CommandBarActionsCardModule,
    CommandBarDateFilterCardModule,
    CommandBarEnumFilterCardModule,
    CommandBarSearchCardModule,
    ComplexPropSelectedCardModule,
    DefaultSortingCardModule,
    ExcludedPropertyCardModule,
    VersionSupportCardModule,
    BaseConfigFormModule,
    VersionSupportFormModule,
    ExcludedPropertyFormModule,
    CheckboxesCardModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
