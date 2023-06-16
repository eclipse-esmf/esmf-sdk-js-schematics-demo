import { tableTests } from '../reusable-tests/table';

describe('Base config table', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="basic-config"]').click();
    cy.get('[data-test="table-header"]').first().click();
  });

  tableTests(true, false);
});
