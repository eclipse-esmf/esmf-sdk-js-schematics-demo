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

/**  **/
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'searchString',
  pure: true,
})
export class SearchStringPipe implements PipeTransform {
  transform(value: any, searchString: string[]): boolean {
    if (typeof value === 'boolean') {
      value = value.toString();
    }
    if (value.constructor.name === 'Date') {
      value = value.toLocaleString();
    }
    if (typeof value !== 'string') {
      return false;
    }
    return searchString.length !== 0 && searchString.some(term => value?.includes(term));
  }
}
