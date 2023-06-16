import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {SidenavComponent} from './components/sidenav/sidenav.component';
import {AppSharedModule} from "./shared/app-shared.module";
import {BaseConfigModule} from 'src/app/shared/components/base-config/base-config.module';
import { CheckboxesModule } from 'src/app/shared/components/checkboxes/checkboxes.module';
import { CommandBarModule } from 'src/app/shared/components/command-bar/command-bar.module';
import { CommandBarActionsModule } from 'src/app/shared/components/command-bar-actions/command-bar-actions.module';
import { CommandBarDateFilterModule } from 'src/app/shared/components/command-bar-date-filter/command-bar-date-filter.module';
import { CommandBarEnumFilterModule } from 'src/app/shared/components/command-bar-enum-filter/command-bar-enum-filter.module';
import { CommandBarSearchModule } from 'src/app/shared/components/command-bar-search/command-bar-search.module';
import { ComplexPropSelectedModule } from 'src/app/shared/components/complex-prop-selected/complex-prop-selected.module';
import { CustomColumnModule } from 'src/app/shared/components/custom-column/custom-column.module';
import { DefaultSortingModule } from 'src/app/shared/components/default-sorting/default-sorting.module';
import { ExcludedPropertyModule } from 'src/app/shared/components/excluded-property/excluded-property.module';
import { RemoteDataModule } from 'src/app/shared/components/remote-data/remote-data.module';
import { RowActionButtonModule } from 'src/app/shared/components/row-action-button/row-action-button.module';
import { VersionSupportModule } from 'src/app/shared/components/version-support/v210/version-support.module';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import { MovementTableModule } from 'src/app/shared/components/movement-table/v210/movement-table.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    RouterModule,
    AppSharedModule,
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
    MovementTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
