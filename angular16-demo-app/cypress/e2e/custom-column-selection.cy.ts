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

describe('Command bar with custom column selection and deselection', (): void => {
  // we are using the excluded properties demo example for this
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="custom-column"]').click();
  });

  const columns = ['Moving', 'Speed Limit Warning', 'Start Date', 'End Date', 'Custom Column'];

  let tableColumnsProcessed: string[] = [];

  it('should deselect columns and check that they are no longer displayed', (): void => {
    // select the menu button
    cy.get('[data-test="mat-table-menu-button"]').click();
    // get the list of available columns to hide/show

    const columnsToDisplay = cy.get('mat-selection-list mat-list-option [data-test="column-option-preferred-name"]');

    columnsToDisplay
      .each((prop: JQuery<HTMLElement>, index: number, arr: any) => {
        cy.wrap(prop)
          .invoke('text')
          .then(text => {
            if (columns.find(c => text === c)) {
              cy.wrap(prop).click({force: true});
              cy.get('[data-test="column-menu-apply-button"]').click();
              tableColumnsProcessed.push(text);
              cy.get('[data-test="mat-table-menu-button"]').click();
            }
          });
      })
      .then(() => {
        cy.get('[data-test="table"]').within(() => {
          cy.get('[data-test="table-header-text"]').should('not.exist');
        });
      });
  });

  it('should reselect all columns and check', (): void => {
    const columnsToDisplay = cy.get('mat-selection-list mat-list-option [data-test="column-option-preferred-name"]');

    columnsToDisplay
      .each((prop: JQuery<HTMLElement>, index: number, arr: any) => {
        cy.wrap(prop)
          .invoke('text')
          .then(text => {
            cy.wrap(prop).click({force: true});
            cy.get('[data-test="column-menu-apply-button"]').click();
            cy.get('[data-test="mat-table-menu-button"]').click();
          });
      })
      .then(() => {
        cy.get('[data-test="table"]').within(() => {
          cy.get('[data-test="table-header-text"]').should('have.length', 4);
        });
      });
  });

  it('should deselect all columns and restore default', (): void => {
    const columnsToDisplay = cy.get('mat-selection-list mat-list-option [data-test="column-option-preferred-name"]');

    columnsToDisplay.each((prop: JQuery<HTMLElement>, index: number, arr: any) => {
      cy.wrap(prop)
        .invoke('text')
        .then(text => {
          if (columns.find(c => text === c)) {
            cy.wrap(prop).click({force: true});
            cy.get('[data-test="column-menu-apply-button"]').click();
            tableColumnsProcessed.push(text);
            cy.get('[data-test="mat-table-menu-button"]').click();
          }
        });
    });

    cy.get('[data-test="table"]').within(() => {
      cy.get('[data-test="table-header-text"]').should('not.exist');
    });

    cy.get('[data-test="column-menu-apply-button"]').click({multiple: true});
    cy.get('[data-test="mat-table-menu-button"]').click();
    cy.get('[data-test="restore-to-defaults-button"]').click();
    cy.get('[data-test="column-menu-apply-button"]').click();
    cy.get('[data-test="table"]').within(() => {
      cy.get('[data-test="table-header-text"]').should('have.length', 4);
    });
  });
});
