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
import { HttpClient } from '@angular/common/http';

import {Movement} from '../../types/movement/movement.types';

import {environment} from '../../../../environments/environment';

import {Injectable} from '@angular/core';
import {TranslocoService} from '@ngneat/transloco';

export interface MovementResponse {
  items: Movement[];
  totalItems?: number;
}

export interface GenericMovementPayload {
  [key: string]: string | number | boolean;
}

export type MovementPayload<T extends GenericMovementPayload = GenericMovementPayload> = T & {
  query: string;
};

const baseUrl = (environment as any).baseUrl || '';

@Injectable({
  providedIn: 'root',
})
export class CommandBarDateFilterCardService {
  constructor(protected http: HttpClient, private translateService: TranslocoService) {
    this.http
      .get(
        `${baseUrl}/assets/i18n/shared/components/command-bar-date-filter-card/${this.translateService.getActiveLang()}.command-bar-date-filter-card.translation.json`
      )
      .subscribe(translations => {
        this.translateService.setTranslation(translations, this.translateService.getActiveLang(), {merge: true});
      });
  }

  downloadCsv(csvArray: any): void {
    if (!csvArray.length) {
      throw new Error('Empty file. Please try again with data.');
    }
    const a = document.createElement('a');
    const blob = new Blob([csvArray], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'Movement.csv';
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
      if (typeof obj[key].constructor.isEnumeration === 'function' && obj[key]?.constructor?.isEnumeration()) {
        const enumerationValues = obj[key].constructor.values().find((v: any) => Object.keys(v).every(k => v[k] === obj[key][k]));

        result[key] = Object.values(enumerationValues).join('-');
      } else if (typeof obj[key] === 'object' && !(obj[key] instanceof Date)) {
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
