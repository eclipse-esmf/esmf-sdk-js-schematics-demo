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
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

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
export class RemoteDataTableService {
  constructor(protected http: HttpClient, private translateService: TranslocoService) {
    this.http
      .get(
        `${baseUrl}/assets/i18n/shared/components/remote-data-table/${this.translateService.getActiveLang()}.remote-data-table.translation.json`
      )
      .subscribe(translations => {
        this.translateService.setTranslation(translations, this.translateService.getActiveLang(), {merge: true});
      });
  }

  requestData(remoteAPI: string, body: MovementPayload): Observable<MovementResponse> {
    const strippedUrlParts: string[] = remoteAPI.split('?');
    if (strippedUrlParts && strippedUrlParts.length === 2) {
      const queryParams = new URLSearchParams(strippedUrlParts[1]);
      queryParams.forEach((value, key) => {
        body[key] = value;
      });
    }
    return this.http.post<MovementResponse>(strippedUrlParts[0], body);
  }
}
