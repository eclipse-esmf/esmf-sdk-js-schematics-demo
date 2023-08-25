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

import {cardTests} from '../../reusable-card/card';

describe('Base config table', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="basic-config"]').click();
    cy.get('#mat-tab-label-0-1').first().click();
  });

  cardTests(true, false);
});
