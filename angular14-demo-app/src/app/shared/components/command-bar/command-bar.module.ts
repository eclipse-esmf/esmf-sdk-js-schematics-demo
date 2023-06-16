/** Generated from RBS SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {NgModule} from '@angular/core';
import {CommandBarComponent} from './command-bar.component';
import {CommandBarColumnMenuComponent} from './command-bar-column-menu.component';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
    declarations: [CommandBarComponent, CommandBarColumnMenuComponent],
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
        MatToolbarModule,
        MatFormFieldModule,
        FormsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatMomentDateModule,
    ],
    providers: [],
    exports: [CommandBarComponent],
})
export class CommandBarModule {}
