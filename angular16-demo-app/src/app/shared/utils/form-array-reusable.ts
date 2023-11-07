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
import {AbstractControl, ControlValueAccessor, FormArray, ValidationErrors, Validator} from '@angular/forms';
import {takeUntil} from 'rxjs';
import {mixinDestroyedSubject} from './destroyed-subject.mixin';

export abstract class FormArrayReusable extends mixinDestroyedSubject() implements ControlValueAccessor, Validator {
  abstract formArray: FormArray;
  abstract formArrayName: string;

  protected constructor() {
    super();
  }

  registerOnChange(fn: any): void {
    if (!this.formArray) return;

    this.formArray.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    if (!this.formArray) return;

    this.formArray.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formArray.disable() : this.formArray.enable();
  }

  writeValue(value: any): void {
    this.formArray.patchValue(value, {emitEvent: false});
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.formArray.valid ? null : {[this.formArrayName]: true};
  }
}
