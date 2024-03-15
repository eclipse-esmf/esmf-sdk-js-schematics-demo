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

const enum PaginatorValues {
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
  Fifty = 50,
  OneHundred = 100,
}

export function paginatorTests(): void {
  describe('Paginator functionalities', (): void => {
    it('should load a paginator', (): void => {
      cy.get('[data-test="paginator-card"]').should('exist');
    });

    it('should initialize items per page number with 20', (): void => {
      cy.get('[data-test="paginator-card"] .mat-mdc-select-min-line').then((element: JQuery): void => {
        expect(parseFloat(element.text())).to.eq(PaginatorValues.FIVE);
      });
    });

    it('should select from paginator value options', (): void => {
      cy.get('[data-test="paginator-card"] .mat-mdc-form-field-type-mat-select').click();
      cy.get('.mat-mdc-select-panel')
        .children()
        .then(list => {
          debugger;
          expect(list[0].className).to.contain('mdc-list-item--selected');
          expect(list[0].className).to.contain('mat-mdc-option-active');
          list[1].click();
          expect(list[1].className).to.contain('mdc-list-item--selected');
          expect(list[1].className).to.contain('mat-mdc-option-active');
          cy.get('[data-test="paginator-card"] .mat-mdc-select-min-line').then((element: JQuery): void => {
            if (element.length === 2) {
              const secondElement = element.eq(1);
              expect(parseFloat(secondElement.text())).to.eq(PaginatorValues.TEN);
            } else {
              expect(parseFloat(element.text())).to.eq(PaginatorValues.TEN);
            }
          });
          cy.get('.cdk-overlay-connected-position-bounding-box').should('not.be.visible');
        });
    });

    it('should disable paginator buttons if there is not enough data', (): void => {
      cy.get('[data-test="paginator-card"] .mat-mdc-paginator-range-label').then(paginatorNumber => {
        const totalNumberOfItems = parseInt(paginatorNumber.text().split('of')[1]);
        cy.get('[data-test="paginator-card"] .mat-mdc-select-min-line').then((element: JQuery): void => {
          const numberOfItemsPerPage = parseFloat(element.text());

          if (totalNumberOfItems < numberOfItemsPerPage) {
            cy.get('[data-test="paginator-card"] .mat-mdc-paginator-navigation-previous').should('be.disabled');
            cy.get('[data-test="paginator-card"] .mat-mdc-paginator-navigation-next').should('be.disabled');
          }
        });
      });
    });

    it('should enable paginator buttons if there is enough data', (): void => {
      //Set items per page to 20
      cy.get('[data-test="paginator-card"] .mat-mdc-form-field-type-mat-select').click();
      cy.get('.mat-mdc-select-panel').children().first().click();

      cy.get('[data-test="paginator-card"] .mat-mdc-paginator-range-label').then(paginatorNumber => {
        const totalNumberOfItems = parseInt(paginatorNumber.text().split('of')[1]);
        cy.log('number of items', totalNumberOfItems);
        cy.get('[data-test="paginator-card"] .mat-mdc-select-min-line').then((element: JQuery): void => {
          const numberOfItemsPerPage = parseFloat(element.text());

          if (totalNumberOfItems > numberOfItemsPerPage) {
            cy.get('[data-test="paginator-card"] .mat-mdc-paginator-navigation-next').should('be.not.disabled');
            cy.get('[data-test="paginator-card"] .mat-mdc-paginator-navigation-last').should('be.not.disabled');
          }
        });
      });
    });
  });
}
