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
import {AfterViewInit, ChangeDetectorRef, Component, Inject, ViewChild} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslocoService} from '@jsverse/transloco';

export enum Action {
  export = 'export',
  cancel = 'cancel',
}

@Component({
  selector: 'export-card-dialog',
  templateUrl: './export-card-dialog.component.html',
  styleUrls: ['./export-card-dialog.component.scss'],
})
export class ExportCardDialogComponent implements AfterViewInit {
  @ViewChild('exportFirstPage') exportFirstPage!: MatCheckbox;

  action = Action;
  dialogDescription = '';
  showAllColumnsBox = true;

  constructor(
    public dialogRef: MatDialogRef<ExportCardDialogComponent>,
    private translateService: TranslocoService,
    private cdRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      maxExportRows: number;
    }
  ) {}

  ngAfterViewInit() {
    this.setDialogDescription();
    this.cdRef.detectChanges();
  }

  setDialogDescription() {
    const {maxExportRows} = this.data;
    const isExportAllPagesChecked = this.exportFirstPage.checked;

    let translationKey = 'exportData.description.default';

    if (isExportAllPagesChecked) {
      translationKey = 'exportData.description.exportOnlyFirstPage';
    }

    this.dialogDescription = this.translateService.translate(translationKey, {
      maxExportRows,
    });
  }

  exportData() {
    this.dialogRef.close({
      action: Action.export,
      exportFirstPage: this.exportFirstPage.checked,
    });
  }
}
