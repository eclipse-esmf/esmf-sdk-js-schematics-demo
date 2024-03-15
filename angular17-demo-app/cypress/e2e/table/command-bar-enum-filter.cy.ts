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

import {commandBarTests} from '../../reusable-tests/command-bar';
import {tableTests} from '../../reusable-tests/table';

describe('Command bar with enum filter', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="command-bar-enum"]').click();
    cy.get('[data-test="table-header"]').first().click();
  });

  tableTests();

  commandBarTests();

  it('should show at least a dropdown selector', (): void => {
    cy.get('[data-test="form-field-select"]').its('length').should('be.at.least', 1);
  });
});
