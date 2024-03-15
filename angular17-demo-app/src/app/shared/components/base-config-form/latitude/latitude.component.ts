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

import {CommonModule} from '@angular/common';
import {Attribute, Component, forwardRef} from '@angular/core';
import {FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidatorFn, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslocoModule} from '@ngneat/transloco';
import {FormControlReusable} from '../../../utils/form-control-reusable';
import {FormValidators} from '../../../utils/form-validators';

export const validators: {[key: string]: ValidatorFn} = {
  required: Validators.required,

  decimal: FormValidators.decimalValidator(),
};

export const latitudeFormControl = new FormControl(null, Object.values(validators));

@Component({
  selector: 'esmf-ui-latitude',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: './latitude.component.html',
  styleUrls: ['./latitude.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LatitudeComponent),
      multi: true,
    },
  ],
})
export class LatitudeComponent extends FormControlReusable {
  formControl = latitudeFormControl;

  constructor(@Attribute('formControlName') public formControlName: string) {
    super();
  }
}
