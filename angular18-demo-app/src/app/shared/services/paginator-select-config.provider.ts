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
import {InjectionToken, Optional, Provider, SkipSelf} from '@angular/core';
import {MatPaginatorSelectConfig} from '@angular/material/paginator';

export const PaginatorSelectConfigInjector = new InjectionToken<MatPaginatorSelectConfig>('PaginatorSelectConfig');

export const PaginatorSelectConfigProvider: Provider = {
  provide: PaginatorSelectConfigInjector,
  useFactory: (customConfig?: MatPaginatorSelectConfig) => {
    return customConfig || {disableOptionCentering: true};
  },
  deps: [[new Optional(), new SkipSelf(), PaginatorSelectConfigInjector]],
};
