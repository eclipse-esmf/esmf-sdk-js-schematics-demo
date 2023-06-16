describe('Command bar with custom column selection and deselection', (): void => {
  // we are using the excluded properties demo example for this
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="excluded-property"]').click();
  });

  let tableColumnsProcessed: string[] = [];

  it('should deselect columns and check that they are no longer displayed', (): void => {
    // select the menu button
    cy.get('[data-test="mat-table-menu-icon"]').click();
    // get the list of available columns to hide/show

    const tableHeaders = cy.get('[data-test="table-header"]').children();
    const columnsToDisplay = cy
      .get('[data-test="column-list-option"]')
      .children();

    columnsToDisplay.each((prop, index, arr) => {
      cy.wrap(prop).click();
      cy.get('[data-test="column-menu-apply-button"]').click();
      // add title to excluded props list
      tableColumnsProcessed.push(prop[0].innerText.split('\n')[0]);
      // check if column was hidden
      if (index + 1 < arr.length) {
        cy.get('[data-test="table"]').within(() => {
          tableColumnsProcessed.forEach((tcp) =>
            cy
              .get('[data-test="table-header-text"]')
              .contains('span', tcp)
              .should((elem) => {
                expect(elem.text()).to.not.equal(tcp);
              })
          );
        });
      } else {
        cy.get('[data-test="table-header-text"]').should('not.exist');
      }

      cy.get('[data-test="mat-table-menu-icon"]').click();
    });
  });

  it('should reselect all columns and check', (): void => {
    const columnsToDisplay = cy
      .get('[data-test="column-list-option"]')
      .children();
    columnsToDisplay.each((prop) => {
      cy.wrap(prop).click();
      cy.get('[data-test="column-menu-apply-button"]').click();
      cy.get('[data-test="mat-table-menu-icon"]').click();
    });
    cy.get('[data-test="table"]').within(() => {
      tableColumnsProcessed.forEach((tcp) =>
        cy
          .get('[data-test="table-header-text"]')
          .contains('span', tcp)
          .should((elem) => {
            expect(elem.text().trim()).to.equal(tcp);
          })
      );
    });
  });

  it('should deselect all columns and restore default', (): void => {
    const columnsToDisplay = cy
      .get('[data-test="column-list-option"]')
      .children();
    columnsToDisplay.click({ multiple: true });
    cy.get('[data-test="column-menu-apply-button"]').click({ multiple: true });
    cy.get('[data-test="mat-table-menu-icon"]').click();
    cy.get('[data-test="restore-to-defaults-button"]').click();
    cy.get('[data-test="column-menu-apply-button"]').click();
    cy.get('[data-test="table"]').within(() => {
      tableColumnsProcessed.forEach((tcp) =>
        cy
          .get('[data-test="table-header-text"]')
          .contains('span', tcp)
          .should((elem) => {
            expect(elem.text().trim()).to.equal(tcp);
          })
      );
    });
  });
});
