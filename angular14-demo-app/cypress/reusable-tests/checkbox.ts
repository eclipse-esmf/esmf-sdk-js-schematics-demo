export function checkboxTests(): void {
  describe('Checkbox functionalities', (): void => {
    it('should display checkboxes header row', (): void => {
      cy.get('[data-test="table"]')
        .find('[data-test="table-header-checkbox"]')
        .should('have.length', 1);
    });

    it('should display checkboxes cells', (): void => {
      cy.get('[data-test="table"]')
        .find('[data-test="table-cell-checkbox"]')
        .should('have.length.at.least', 1);
    });

    it('should select all rows', (): void => {
      cy.get('[data-test="header-checkbox"]').click();
      cy.get('[data-test="header-checkbox"]').should(
        'have.class',
        'mat-checkbox-checked'
      );
      cy.get('[data-test="cell-checkbox"]').each((checkbox) => {
        cy.wrap(checkbox).should('have.class', 'mat-checkbox-checked');
      });
    });

    it('should unselect all rows', (): void => {
      cy.get('[data-test="header-checkbox"]').click();
      cy.get('[data-test="header-checkbox"]').should(
        'not.have.class',
        'mat-checkbox-checked'
      );
      cy.get('[data-test="cell-checkbox"]').each((checkbox) => {
        cy.wrap(checkbox).should('not.have.class', 'mat-checkbox-checked');
      });
    });

    it('should select one row', (): void => {
      cy.get('[data-test="cell-checkbox"]').first().click();
      cy.get('[data-test="header-checkbox"]').should(
        'have.class',
        'mat-checkbox-indeterminate'
      );
      cy.get('[data-test="cell-checkbox"]')
        .first()
        .should('have.class', 'mat-checkbox-checked');
      cy.get('[data-test="cell-checkbox"]').first().click();
    });
  });
}
