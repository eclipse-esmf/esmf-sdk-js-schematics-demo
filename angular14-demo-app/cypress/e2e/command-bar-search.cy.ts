import { commandBarTests } from '../reusable-tests/command-bar';
import { tableTests } from '../reusable-tests/table';

describe('Command bar with search filter', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="command-bar-search"]').click();
    cy.get('[data-test="table-header"]').first().click();
  });

  tableTests();

  commandBarTests();

  it('should show one search input', (): void => {
    cy.get('[data-test="search-form-field"]').its('length').should('eq', 1);
  });

  it('should update table-data based on speed limit warning', (): void => {
    cy.get('[data-test="search-form-field"]').type('yellow{enter}');
    cy.get('[data-test="table"]')
      .find('[data-test="table-row"]')
      .should('have.length', 2);
    cy.focused().clear();

    cy.get('[data-test="mat-chip-remove"]').click();

    cy.get('[data-test="search-form-field"]').type('green{enter}');
    cy.get('[data-test="table"]')
      .find('[data-test="table-row"]')
      .should('have.length', 1);
    cy.focused().clear();

    cy.get('[data-test="mat-chip-remove"]').click();

    cy.get('[data-test="search-form-field"]').type('true{enter}');
    cy.get('[data-test="table"]')
      .find('[data-test="table-row"]')
      .should('have.length', 0);
    cy.focused().clear();

    // reset search and show all entries
    cy.get('[data-test="mat-chip-remove"]').click();

  });
});
