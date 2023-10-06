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
import {FormControl, FormGroup, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule} from '@angular/forms';
import {FormGroupReusable} from '../../../../utils/form-group-reusable';
import {XComponent, xFormControl} from '../x/x.component';
import {YComponent, yFormControl} from '../y/y.component';
import {ZComponent, zFormControl} from '../z/z.component';

export interface position {
  x: FormControl<any | null>;
  y: FormControl<any | null>;
  z: FormControl<any | null>;
}

export const positionFormControl = new FormControl<position | null>(null);
export const positionFormGroup = new FormGroup<position>({
  x: xFormControl,
  y: yFormControl,
  z: zFormControl,
});

@Component({
  selector: 'esmf-ui-position',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, XComponent, YComponent, ZComponent],
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PositionComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PositionComponent),
      multi: true,
    },
  ],
})
export class PositionComponent extends FormGroupReusable {
  formGroup: FormGroup<position> = positionFormGroup;

  constructor(@Attribute('formControlName') public formControlName: string) {
    super();
  }
}
