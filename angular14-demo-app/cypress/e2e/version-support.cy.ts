import { checkboxTests } from 'cypress/reusable-tests/checkbox';
import { tableTests } from 'cypress/reusable-tests/table';
import { commandBarTests } from '../reusable-tests/command-bar';

describe.skip('Version support test', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="version-support"]').click();
    cy.get('[data-test="table-header"]').first().click();
  });

  tableTests(false, false);
  commandBarTests();
  checkboxTests();
});
