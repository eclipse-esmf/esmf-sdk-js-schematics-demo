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

// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api

/**
 * @type {Cypress.PluginConfig}
 */
import {read} from 'clipboardy';

export default (
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
) => {
    on('task', {
        // Clipboard test plugin
        getClipboard: () => {
            return read();
        }
    })
}
