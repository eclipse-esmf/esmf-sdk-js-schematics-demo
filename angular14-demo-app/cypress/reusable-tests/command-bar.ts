export function commandBarTests() {
  describe('Command bar functionalities', (): void => {
    it('should load a toolbar', (): void => {
      cy.get('[data-test="toolbar"]').should('be.visible');
    });

    it('should load the number of items by default', (): void => {
      cy.get('.mat-paginator-range-label').should('be.visible');
    });

    it('should show the correct number of items', (): void => {
      cy.get('.mat-paginator-range-actions').then(
        (element: JQuery): void => {
          cy.get('[data-test="paginator"] .mat-paginator-range-label').then(
            (paginatorNumber) => {
              const totalNumberOfItems = parseInt(
                paginatorNumber.text().split('of')[1]
              );
              const firstGroup = element.text().split('of')[0].split(' ').join('');
              const currentItems = firstGroup.substring(firstGroup.length -1);
              expect(parseInt(currentItems)).to.eq(totalNumberOfItems);
            }
          );
        }
      );
    });

    it('should load the refresh data button', (): void => {
      cy.get('[data-test="refresh-data-button"]').scrollIntoView().should('be.visible');
    });

    it('should refresh the table', (): void => {
      cy.get('[data-test="refresh-data-button"]').scrollIntoView().click();
      cy.get('[data-test="table"]')
        .find('[data-test="table-row"]')
        .should('have.length.greaterThan', 0);
    });

    it('should load the export data button', (): void => {
      cy.get('[data-test="export-data-button"]').should('be.visible');
    });
  });
}
