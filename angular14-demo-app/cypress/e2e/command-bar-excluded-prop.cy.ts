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

describe('Command bar with excluded properties', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="excluded-property"]').click();
  });

  it('should generate a table', (): void => {
    cy.get('[data-test="table"]').should('exist');
  });

  it('should not contain excluded columns', (): void => {
    const excludedProps = ['Moving', 'End Date', 'Start Date'];
    excludedProps.join('');

    cy.get('[data-test="table"]').within(() => {
      excludedProps.forEach(ep =>
        cy
          .get('[data-test="table-header-text"]')
          .contains('span', ep)
          .should(elem => {
            expect(elem.text()).to.not.equal(ep);
          })
      );
    });
  });
});
