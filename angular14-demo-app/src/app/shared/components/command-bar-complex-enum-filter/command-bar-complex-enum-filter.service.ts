/*
 * Copyright (c) 2023 Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

/** Generated from SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Movement} from '../../types/movement/movement.types';

export interface MovementResponse {
  items: Movement[];
  totalItems?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CommandBarComplexEnumFilterService {
  constructor(private http: HttpClient) {}

  downloadCsv(csvArray: any): void {
    if (!csvArray.length) {
      throw new Error('Empty file. Please try again with data.');
    }
    const a = document.createElement('a');
    const blob = new Blob([csvArray], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'movement.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  flatten(csvArray: Movement[]): Movement[] {
    return csvArray.map((item: Movement): Movement => {
      return this.flattenObj(item);
    });
  }

  private flattenObj(obj: any): any {
    const result: any = {};

    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        const childObj = this.flattenObj(obj[key]);

        for (let childObjKey in childObj) {
          result[`${key}.${childObjKey}`] = childObj[childObjKey];
        }
      } else {
        result[key] = obj[key];
      }
    }
    return result;
  }
}
