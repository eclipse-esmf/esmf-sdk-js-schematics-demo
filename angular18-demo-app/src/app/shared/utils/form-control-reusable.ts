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
import {ControlValueAccessor, FormControl} from '@angular/forms';
import {CustomControlValidationError} from './form-validators';

export abstract class FormControlReusable implements ControlValueAccessor {
  abstract formControl: FormControl<any>;
  abstract formControlName: string;
  val: any;

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val: any) {
    this.val = val;
    this.onChange(val);
    this.onTouch(val);
  }

  get value(): any {
    return this.val;
  }

  get error(): CustomControlValidationError {
    if (this.formControl.errors && this.formControl.errors['required']) {
      return {
        translationKey: 'validation.required',
        translationParams: {},
      };
    }

    const errors = Object.values(this.formControl.errors ?? []);
    const error = errors.find(value => !!value);

    return (
      error ?? {
        translationKey: 'validation.default',
        translationParams: {},
      }
    );
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
