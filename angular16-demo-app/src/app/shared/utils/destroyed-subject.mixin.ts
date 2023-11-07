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
import {OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

export type Constructor<T = object> = new (...args: any[]) => T;

export const mixinDestroyedSubject = <T extends Constructor>(base: T = class {} as T) =>
  class extends base implements OnDestroy {
    destroyed$ = new Subject<void>();

    ngOnDestroy(): void {
      this.destroyed$.next();
    }
  };
