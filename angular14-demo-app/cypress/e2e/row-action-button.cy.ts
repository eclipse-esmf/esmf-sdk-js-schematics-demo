import { tableTests } from '../reusable-tests/table';

describe('Row custom actions', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="row-action-button"]').click();
    cy.get('[data-test="table-header"]').first().click();
  });

  tableTests(true, false);

  it('should show at least one custom action item', (): void => {
    cy.get('[data-test="custom-actions-row"]')
      .its('length')
      .should('be.at.least', 1);
  });
});
