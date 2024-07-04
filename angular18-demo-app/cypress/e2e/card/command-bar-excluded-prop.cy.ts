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

describe('Command bar with excluded properties', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="excluded-property"]').click();
    cy.get('#mat-tab-label-0-1').first().click();
  });

  it('should generate a card', (): void => {
    cy.get('#mat-tab-label-0-1').should('exist');
  });

  it('should not contain excluded columns', (): void => {
    const excludedProps = ['Moving', 'End Date', 'Y'];
    excludedProps.join('');
    const cardField = cy.get(':nth-child(1) > .data-card-header > .data-card-content > .mat-mdc-card-content');

    excludedProps.forEach(ep => {
      cardField.should('not.contain', ep);
    });
  });
});
