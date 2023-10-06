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
import {Movement} from '../../../types/movement/v210/movement.types';
import {movingFormControl} from './moving/moving.component';
import {speedLimitWarningFormControl} from './speed-limit-warning/speed-limit-warning.component';
import {positionFormControl} from './position/position.component';
import {startDateFormControl} from './start-date/start-date.component';
import {endDateFormControl} from './end-date/end-date.component';

export const VersionSupportForm = new FormGroup({
  moving: movingFormControl,
  speedLimitWarning: speedLimitWarningFormControl,
  position: positionFormControl,
  startDate: startDateFormControl,
  endDate: endDateFormControl,
});

@Component({
  selector: 'esmf-ui-version-support-form',
  templateUrl: './version-support-form.component.html',
  styleUrls: ['./version-support-form.component.scss'],
})
export class VersionSupportFormComponent {
  @Output() formSubmit: EventEmitter<Movement> = new EventEmitter();
  @Output() formCancel: EventEmitter<void> = new EventEmitter();

  form: FormGroup = VersionSupportForm;

  onCancel(): void {
    this.formCancel.emit();
  }

  onSubmit(form: FormGroup): void {
    this.formSubmit.emit(form.value);
  }
}
