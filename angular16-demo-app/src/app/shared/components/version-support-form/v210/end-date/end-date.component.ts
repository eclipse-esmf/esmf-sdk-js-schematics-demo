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

import {NGX_MAT_DATE_FORMATS, NgxMatDateAdapter, NgxMatDatetimePickerModule} from '@angular-material-components/datetime-picker';
import {
  NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  NGX_MAT_MOMENT_FORMATS,
  NgxMatMomentAdapter,
  NgxMatMomentModule,
} from '@angular-material-components/moment-adapter';
import {CommonModule} from '@angular/common';
import {Attribute, Component, Input, forwardRef} from '@angular/core';
import {FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DATE_LOCALE, ThemePalette} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {isMoment} from 'moment';
import {FormControlReusable} from '../../../../utils/form-control-reusable';

export const endDateFormControl = new FormControl(null, [Validators.required]);

@Component({
  selector: 'esmf-ui-end-date',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatMomentModule,
  ],
  templateUrl: './end-date.component.html',
  styleUrls: ['./end-date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EndDateComponent),
      multi: true,
    },
    {
      provide: NgxMatDateAdapter,
      useClass: NgxMatMomentAdapter,
      deps: [MAT_DATE_LOCALE, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: NGX_MAT_DATE_FORMATS, useValue: NGX_MAT_MOMENT_FORMATS},
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class EndDateComponent extends FormControlReusable {
  @Input() color: ThemePalette;

  formControl = endDateFormControl;

  constructor(@Attribute('formControlName') public formControlName: string) {
    super();
  }

  get errorMessage() {
    return this.formControl.hasError('required') ? 'The field is required' : 'The value is invalid or empty';
  }

  override set value(val: any) {
    this.val = isMoment(val) ? val.format('YYYY-MM-DDTHH:mm:ss') : val;
    this.onChange(this.val);
    this.onTouch(this.val);
  }
}
