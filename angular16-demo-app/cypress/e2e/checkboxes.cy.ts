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

import {tableTests} from '../reusable-tests/table';

describe('Checkbox', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="checkboxes"]').click();
    cy.get('[data-test="table-header"]').first().click();
  });

  tableTests(true, false);

  it('should display checkboxes header row', (): void => {
    cy.get('[data-test="table"]').find('[data-test="table-header-checkbox"]').should('have.length', 1);
  });

  it('should display checkboxes cells', (): void => {
    cy.get('[data-test="table"]').find('[data-test="table-cell-checkbox"]').should('have.length.at.least', 1);
  });

  it('should select all rows', (): void => {
    cy.get('[data-test="header-checkbox"]').click();
    cy.get('[data-test="header-checkbox"]').should('have.class', 'mat-mdc-checkbox-checked');
    cy.get('[data-test="cell-checkbox"]').each(checkbox => {
      cy.wrap(checkbox).should('have.class', 'mat-mdc-checkbox-checked');
    });
  });

  it('should unselect all rows', (): void => {
    cy.get('[data-test="header-checkbox"]').click();
    cy.get('[data-test="header-checkbox"]').should('not.have.class', 'mat-mdc-checkbox-checked');
    cy.get('[data-test="cell-checkbox"]').each(checkbox => {
      cy.wrap(checkbox).should('not.have.class', 'mat-mdc-checkbox-checked');
    });
  });

  it('should select one row', (): void => {
    cy.get('[data-test="cell-checkbox"]').first().click();
    cy.get('[data-test="header-checkbox"]').should('have.attr', 'ng-reflect-indeterminate', 'true')
    cy.get('[data-test="cell-checkbox"]').first().should('have.class', 'mat-mdc-checkbox-checked');
    cy.get('[data-test="cell-checkbox"]').first().click();
  });
});
