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
import {HttpClient} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'src/environments/environment';
import {Movement} from '../../types/movement/movement.types';

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
export class ComplexPropSelectedTableService {
  constructor(protected http: HttpClient, private translateService: TranslateService) {
    this.http
      .get(
        `${baseUrl}/assets/i18n/shared/components/complex-prop-selected-table/${this.translateService.currentLang}.complex-prop-selected-table.translation.json`
      )
      .subscribe(translations => {
        this.translateService.setTranslation(this.translateService.currentLang, translations, true);
      });
  }
}
