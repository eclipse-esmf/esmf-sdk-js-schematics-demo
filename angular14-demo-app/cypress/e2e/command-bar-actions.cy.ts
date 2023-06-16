import {commandBarTests} from "../reusable-tests/command-bar";
import {tableTests} from "../reusable-tests/table";

describe('Command bar with actions', (): void => {
    before((): void => {
        cy.visit('/');
        cy.get('[data-test="command-bar-actions"]').click();
        cy.get('[data-test="table-header"]').first().click();
    })


    tableTests();

    commandBarTests();

    it('should show custom actions on the command bar', (): void => {
        cy.get('[data-test="toolbar-custom-action-icon"]').its('length').should('be.at.least', 1);
    })
})