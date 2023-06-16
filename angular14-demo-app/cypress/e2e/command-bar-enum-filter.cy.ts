import {commandBarTests} from "../reusable-tests/command-bar";
import {tableTests} from "../reusable-tests/table";

describe('Command bar with enum filter', (): void => {
    before((): void => {
        cy.visit('/');
        cy.get('[data-test="command-bar-enum"]').click();
        cy.get('[data-test="table-header"]').first().click();
    })

    tableTests();

    commandBarTests();

    it('should show at least a dropdown selector', (): void => {
        cy.get('[data-test="form-field-select"]').its('length').should('be.at.least', 1);
    })
})