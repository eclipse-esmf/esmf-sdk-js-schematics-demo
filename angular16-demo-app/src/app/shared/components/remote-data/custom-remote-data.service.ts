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
import {RemoteDataService} from './remote-data.service';

/**
 * Custom service which extend the original API service for fetching
 * ${this.options.selectedModelElement.name} data from the configured
 * remote API.
 *
 * If you need to override or to extend the current functionality,
 * this is the right place to do. All modifications are preserved while
 * generating the table component again, also in combination with
 * the cli parameter '--force'.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomRemoteDataService extends RemoteDataService {
  constructor(http: HttpClient, translationService: TranslateService) {
    super(http, translationService);
  }
}
