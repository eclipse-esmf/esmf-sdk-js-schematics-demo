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
import {AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validator} from '@angular/forms';
import {takeUntil} from 'rxjs';
import {mixinDestroyedSubject} from './destroyed-subject.mixin';

export abstract class FormGroupReusable extends mixinDestroyedSubject() implements ControlValueAccessor, Validator {
  abstract formGroup: FormGroup;
  abstract formControlName: string;

  protected constructor() {
    super();
  }

  registerOnChange(fn: any): void {
    if (!this.formGroup) return;

    this.formGroup.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    if (!this.formGroup) return;

    this.formGroup.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formGroup.disable() : this.formGroup.enable();
  }

  writeValue(value: any): void {
    this.formGroup.patchValue(value, {emitEvent: false});
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.formGroup.valid ? null : {[this.formControlName]: true};
  }
}
