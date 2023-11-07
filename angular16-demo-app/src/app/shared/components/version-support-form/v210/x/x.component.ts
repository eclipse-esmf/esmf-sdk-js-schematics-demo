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

import {CommonModule} from '@angular/common';
import {Attribute, Component, forwardRef} from '@angular/core';
import {FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControlReusable} from '../../../../utils/form-control-reusable';

export const xFormControl = new FormControl(null, [Validators.required]);

@Component({
  selector: 'esmf-ui-x',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './x.component.html',
  styleUrls: ['./x.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XComponent),
      multi: true,
    },
  ],
})
export class XComponent extends FormControlReusable {
  formControl = xFormControl;

  constructor(@Attribute('formControlName') public formControlName: string) {
    super();
  }

  get errorMessage() {
    return this.formControl.hasError('required') ? 'The field is required' : 'The value is invalid or empty';
  }
}
