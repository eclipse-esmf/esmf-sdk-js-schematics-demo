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

/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {Component, EventEmitter, Output} from '@angular/core';
import {Column} from './base-config.component';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {JSSdkLocalStorageService} from '../../../services/storage.service';

@Component({
    selector: 'base-config-column-menu',
    styleUrls: ['./base-config.component.scss'],
    template: `
        <div class="mat-h3 selection-title" (click)="$event.stopPropagation()">{{ 'columns' | translate }}</div>

        <mat-divider></mat-divider>
        <mat-selection-list cdkDropList (cdkDropListDropped)="columnDrop($event)" data-test="column-selection-list" class="selection-list">
            <mat-list-option
                cdkDrag
                data-test="column-list-option"
                *ngFor="let column of columns"
                [selected]="column.selected"
                (click)="columnClick($event, column)"
            >
                <div class="list-content">
                    <div class="list-text">
                        <div data-test="column-option-preferred-name">
                            {{ 'movement.v210.' + column.name + '.preferredName' | translate }}
                        </div>
                        <div class="mat-small" data-test="column-option-description">
                            {{ 'movement.v210.' + column.name + '.description' | translate }}
                        </div>
                    </div>
                    <mat-icon
                        data-test="drag-indicator-icon"
                        matTooltip="Draggable row"
                        class="material-icons"
                        style="color:rgba(0,0,0,.54);"
                        >drag_indicator</mat-icon
                    >
                </div>
            </mat-list-option>
        </mat-selection-list>

        <mat-divider></mat-divider>

        <div data-test="column-menu-actions-container" class="menu-actions-container" (click)="stopMenuClosing($event)">
            <button
                data-test="restore-to-defaults-button"
                class="column-menu-restore-btn"
                mat-stroked-button
                color="accent"
                (click)="resetStoredColumns($event)"
            >
                <mat-icon data-test="restore-to-defaults-icon" class="material-icons">settings_backup_restore</mat-icon>
                <span data-test="restore-to-defaults-text">{{ 'restoreDefaults' | translate }}</span>
            </button>
            <span class="spacer"></span>
            <button
                data-test="column-menu-cancel-button"
                mat-stroked-button
                color="accent"
                class="column-menu-cancel-btn"
                (click)="closeMenu()"
            >
                <mat-icon data-test="column-menu-cancel-icon" class="material-icons">close</mat-icon>
                <span data-test="column-menu-cancel-text">{{ 'cancel' | translate }}</span>
            </button>

            <button
                data-test="column-menu-apply-button"
                mat-raised-button
                color="primary"
                class="column-menu-apply-btn"
                (click)="storeColumns()"
            >
                <mat-icon data-test="column-menu-apply-icon" class="material-icons">check</mat-icon>
                <span data-test="column-menu-apply-text">{{ 'apply' | translate }}</span>
            </button>
        </div>
    `,
})
export class BaseConfigColumnMenuComponent {
    @Output() columnsChangedEvent = new EventEmitter<any>();

    columnsDefault: Array<Column> = [];
    columns: Array<Column> = [];
    closeColumnMenu: boolean = false;
    keyLocalStorage: string = '';

    constructor(private storageService: JSSdkLocalStorageService) {}

    closeMenu(): void {
        this.closeColumnMenu = true;
    }

    stopMenuClosing(event: MouseEvent): void {
        if (this.closeColumnMenu) {
            return;
        }
        event.stopPropagation();
    }

    columnClick(event: MouseEvent, column: Column): void {
        this.closeColumnMenu = false;
        column.selected = !column.selected;
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Reset columns to defaults which are all available columns
     */
    resetStoredColumns(event?: MouseEvent): void {
        event?.preventDefault();
        event?.stopPropagation();
        this.columns = [...this.columnsDefault];
    }

    /**
     * Store columns locally and update displayed columns afterwards
     */
    storeColumns(): void {
        this.closeColumnMenu = true;
        this.storageService.setItem(this.keyLocalStorage, this.columns);
        this.columnsChangedEvent.emit(this.columns);
    }

    /**
     * Order of a column is changed
     */
    columnDrop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }
}
