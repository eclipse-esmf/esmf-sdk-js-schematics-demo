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

import {cardTests} from '../../reusable-card/card';
import {commandBarTests} from '../../reusable-card/command-bar';

describe('Command bar with search filter', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="command-bar-search"]').click();
    cy.get('#mat-tab-label-0-1').first().click();
  });

  cardTests();

  commandBarTests();

  it('should show one search input', (): void => {
    cy.get('[data-test="search-form-field-card"]').its('length').should('eq', 1);
  });

  it('should update card-data based on speed limit warning', (): void => {
    cy.get('[data-test="search-form-field-card"]').type('yellow{enter}');
    cy.get('.data-card-header').should('have.length', 1);
    cy.focused().clear();

    cy.get('[data-test="mat-chip-remove"]').click();

    cy.get('[data-test="search-form-field-card"]').type('green{enter}');
    cy.get('.data-card-header').should('have.length', 1);
    cy.focused().clear();

    cy.get('[data-test="mat-chip-remove"]').click();

    cy.get('[data-test="search-form-field-card"]').type('true{enter}');
    cy.get('.data-card-header').should('have.length', 0);
    cy.focused().clear();

    // reset search and show all entries
    cy.get('[data-test="mat-chip-remove"]').click();
  });
});
