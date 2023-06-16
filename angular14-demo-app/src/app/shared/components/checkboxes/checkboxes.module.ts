/** Generated from RBS SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {NgModule} from '@angular/core';
import {CheckboxesComponent} from './checkboxes.component';
import {CheckboxesColumnMenuComponent} from './checkboxes-column-menu.component';
import {AppSharedModule} from 'src/app/shared/app-shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
    declarations: [CheckboxesComponent, CheckboxesColumnMenuComponent],
    imports: [
        AppSharedModule,
        BrowserAnimationsModule,
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
        MatCheckboxModule,
        MatDialogModule,
        MatMomentDateModule,
    ],
    providers: [],
    exports: [CheckboxesComponent],
})
export class CheckboxesModule {}
