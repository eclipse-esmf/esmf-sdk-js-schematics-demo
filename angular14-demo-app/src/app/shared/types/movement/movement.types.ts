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

/** Generated form RBS SDK JS Angular Schematics - PLEASE DO NOT CHANGE IT **/

export interface MultiLanguageText {
    /** key defines the locale. Value is the translated text for that locale. */
    [key: string]: string;
}

/**
 * Aspect for movement information
 */
export interface Movement {
    /**
     * Flag indicating if the position is changing
     */
    moving: boolean;
    /**
     * Indicates if speed limit is adhered to.
     */
    speedLimitWarning: WarningLevel;
    /**
     * Indicates a position
     */
    position: SpatialPosition;
    /**
     * Date, when the batch was started
     */
    startDate: Date;
    /**
     * Date, when the last part of the batch was produced
     */
    endDate: Date;
}

/**
 * Represents if speed of position change is within specification (green), within tolerance (yellow), or outside specification (red).
 */
export enum WarningLevel {
    Green = 'green',
    Yellow = 'yellow',
    Red = 'red',
}

/**
 * Position in space, described along three axis, with the third axis optional, if all positions are in a plane.
 */
export interface SpatialPosition {
    /**
     * x coordinate in space
     */
    x: number;
    /**
     * y coordinate in space
     */
    y: number;
    /**
     * z coordinate in space
     */
    z: number;
}
