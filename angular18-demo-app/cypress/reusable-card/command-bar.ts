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

export function commandBarTests() {
  describe('Command bar functionalities', (): void => {
    it('should load a toolbar', (): void => {
      cy.get('[data-test="toolbar"]').should('be.visible');
    });

    it('should load the number of items by default', (): void => {
      cy.get('[data-test="paginator-card"] .mat-mdc-paginator-range-label').scrollIntoView().should('be.visible');
    });

    it('should show the correct number of items', (): void => {
      cy.get('.mat-mdc-paginator-range-actions').then((element: JQuery): void => {
        cy.get('[data-test="paginator-card"] .mat-mdc-paginator-range-label').then(paginatorNumber => {
          const totalNumberOfItems = parseInt(paginatorNumber.text().split('of')[1]);
          const firstGroup = element.text().split('of')[0].split(' ').join('');
          const currentItems = firstGroup.substring(firstGroup.length - 1);
          expect(parseInt(currentItems)).to.eq(totalNumberOfItems);
        });
      });
    });

    it('should load the refresh data button', (): void => {
      checkAndClickMenuTrigger();
    });

    it('should refresh the card', (): void => {
      checkAndClickMenuClick();
    });

    it('should load the export data button', (): void => {
      checkAndClickExportMenuTrigger();
    });

    function checkAndClickMenuTrigger() {
      cy.get('body').then($body => {
        if ($body.find('.mat-mdc-menu-trigger.mdc-icon-button > .mat-icon').length) {
          cy.get('.mat-mdc-menu-trigger.mdc-icon-button > .mat-icon').eq(0).click();
          cy.get('[data-test="refresh-data-icon-collapsed"]').should('exist');
        } else {
          cy.get('[data-test="refresh-data-button-card"]').scrollIntoView().should('be.visible');
        }
      });
    }

    function checkAndClickMenuClick() {
      cy.get('body').then($body => {
        if ($body.find('.mat-mdc-menu-trigger.mdc-icon-button > .mat-icon').length) {
          cy.get('[data-test="refresh-data-icon-collapsed"]').click();
        } else {
          cy.get('[data-test="refresh-data-button-card"]').scrollIntoView().click();
        }
      });
    }

    function checkAndClickExportMenuTrigger() {
      cy.get('body').then($body => {
        if ($body.find('.mat-mdc-menu-trigger.mdc-icon-button > .mat-icon').length) {
          cy.get('.mat-mdc-menu-trigger.mdc-icon-button > .mat-icon').click();
          cy.get('[data-test="export-data-button-card-collapsed"]').should('exist');
        } else {
          cy.get('[data-test="export-data-button-card"]').should('exist');
        }
      });
    }
  });
}
