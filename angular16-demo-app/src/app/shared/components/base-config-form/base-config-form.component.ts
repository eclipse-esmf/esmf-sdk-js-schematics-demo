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

import {Component, EventEmitter, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Movement} from '../../types/movement/movement.types';
import {isMovingFormControl} from './is-moving/is-moving.component';
import {positionFormControl} from './position/position.component';
import {speedLimitWarningFormControl} from './speed-limit-warning/speed-limit-warning.component';
import {speedFormControl} from './speed/speed.component';

export const MovementForm = new FormGroup({
  isMoving: isMovingFormControl,
  position: positionFormControl,
  speed: speedFormControl,
  speedLimitWarning: speedLimitWarningFormControl,
});

@Component({
  selector: 'esmf-ui-base-config-form',
  templateUrl: './base-config-form.component.html',
  styleUrls: ['./base-config-form.component.scss'],
})
export class BaseConfigFormComponent {
  @Output() formSubmit: EventEmitter<Movement> = new EventEmitter();
  @Output() formCancel: EventEmitter<void> = new EventEmitter();

  form: FormGroup = MovementForm;

  onCancel(): void {
    this.formCancel.emit();
  }

  onSubmit(form: FormGroup): void {
    this.formSubmit.emit(form.value);
  }
}
