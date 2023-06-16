import {tableTests} from "../reusable-tests/table";
import {commandBarTests} from "../reusable-tests/command-bar";

describe('Command bar', (): void => {
    before((): void => {
        cy.visit('/');
        cy.get('[data-test="command-bar"]').click();
        cy.get('[data-test="table-header"]').first().click();
    })

    tableTests();

    commandBarTests();
})
