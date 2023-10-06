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

import {Attribute, Component, forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {FormControlReusable} from '../../../../utils/form-control-reusable';

export const speedLimitWarningFormControl = new FormControl(null, [Validators.required]);

@Component({
  selector: 'esmf-ui-speed-limit-warning',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './speed-limit-warning.component.html',
  styleUrls: ['./speed-limit-warning.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SpeedLimitWarningComponent),
      multi: true,
    },
  ],
})
export class SpeedLimitWarningComponent extends FormControlReusable {
  formControl = speedLimitWarningFormControl;

  constructor(@Attribute('formControlName') public formControlName: string) {
    super();
  }

  get errorMessage() {
    return this.formControl.hasError('required') ? 'The field is required' : 'The value is invalid or empty';
  }
}
