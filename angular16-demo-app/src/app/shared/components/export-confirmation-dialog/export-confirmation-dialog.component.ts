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
import {AfterViewInit, ChangeDetectorRef, Component, Inject, ViewChild} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';

export enum Action {
  export = 'export',
  cancel = 'cancel',
}

@Component({
  selector: 'export-confirmation-dialog',
  templateUrl: './export-confirmation-dialog.component.html',
  styleUrls: ['./export-confirmation-dialog.component.scss'],
})
export class ExportConfirmationDialogComponent implements AfterViewInit {
  @ViewChild('exportAllPages') exportAllPages!: MatCheckbox;
  @ViewChild('exportAllColumns') exportAllColumns!: MatCheckbox;

  action = Action;
  dialogDescription = '';
  showAllColumnsBox = true;

  constructor(
    public dialogRef: MatDialogRef<ExportConfirmationDialogComponent>,
    private translateService: TranslateService,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      allColumns: number;
      displayedColumns: number;
      maxExportRows: number;
    }
  ) {}

  ngAfterViewInit() {
    this.showAllColumnsBox = this.data.displayedColumns === this.data.allColumns;

    this.setDialogDescription();
    this.cdRef.detectChanges();
  }

  setDialogDescription() {
    const {maxExportRows, allColumns, displayedColumns} = this.data;
    const isExportAllPagesChecked = this.exportAllPages.checked;
    const isExportAllColumnsChecked = this.exportAllColumns?.checked;

    let translationKey = 'exportData.description.default';

    if (isExportAllPagesChecked && isExportAllColumnsChecked) {
      translationKey = 'exportData.description.caseOne';
    } else if (isExportAllPagesChecked) {
      translationKey = displayedColumns > 1 ? 'exportData.description.caseTwo.plural' : 'exportData.description.caseTwo.singular';
    } else if (!isExportAllColumnsChecked) {
      translationKey = displayedColumns > 1 ? 'exportData.description.caseThree.plural' : 'exportData.description.caseThree.singular';
    } else if (isExportAllColumnsChecked) {
      translationKey = 'exportData.description.caseFour';
    }

    this.dialogDescription = this.translateService.instant(translationKey, {maxExportRows, allColumns, displayedColumns});
  }

  exportData() {
    this.dialogRef.close({
      action: Action.export,
      exportAllPages: this.exportAllPages.checked,
      exportAllColumns: this.exportAllColumns?.checked,
    });
  }
}
