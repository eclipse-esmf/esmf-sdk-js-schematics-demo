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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControlReusable} from '../../../utils/form-control-reusable';

export const validators: {[key: string]: ValidatorFn} = {
  required: Validators.required,
};

export const isMovingFormControl = new FormControl(false, Object.values(validators));

@Component({
  selector: 'esmf-ui-is-moving',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './is-moving.component.html',
  styleUrls: ['./is-moving.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IsMovingComponent),
      multi: true,
    },
  ],
})
export class IsMovingComponent extends FormControlReusable {
  formControl = isMovingFormControl;

  constructor(@Attribute('formControlName') public formControlName: string) {
    super();
  }
}
