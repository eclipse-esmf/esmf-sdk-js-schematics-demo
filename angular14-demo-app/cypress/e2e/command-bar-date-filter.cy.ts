import { commandBarTests } from '../reusable-tests/command-bar';
import { tableTests } from '../reusable-tests/table';

describe('Command bar with date filter', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="command-bar-date-filter"]').click();
    cy.get('[data-test="table-header"]').first().click();
  });

  tableTests();

  commandBarTests();

  it('should show at least a date time picker', (): void => {
    cy.get('[data-test="form-field-date-time"]')
      .its('length')
      .should('be.at.least', 1);
  });

});
