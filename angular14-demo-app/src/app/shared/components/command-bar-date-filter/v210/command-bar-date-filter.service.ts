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

/** Generated from RBS JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movement} from '../../../types/movement/v210/movement.types';
import {Injectable} from '@angular/core';

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

@Injectable({
    providedIn: 'root',
})
export class CommandBarDateFilterService {
    constructor(protected http: HttpClient) {}

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
