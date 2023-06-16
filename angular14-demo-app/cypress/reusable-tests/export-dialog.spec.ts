export function exportDialogTests(hasRemoteDataCall: boolean): void {
  describe('Export dialog functionalities', (): void => {
    it('should load export dialog', (): void => {
      cy.get('[data-test="export-data-icon"]').should('exist');
    });

    it('should open export dialog', (): void => {
      cy.get('[data-test="export-data-icon"]').click();
      cy.get('[data-test="dialogDescription"]').then((element) =>
        expect(element.text()).to.eq(
          'Export all data from the selected 4 columns of the current page.'
        )
      );
    });

    it('should change cases for exporting', (): void => {
      if (hasRemoteDataCall) {
        cy.get('[data-test="exportAllPages"]')
          .then((element) =>
            expect(element.text().trim()).to.eq(
              'export the maximum of 5000 pages'
            )
          )
          .then(() =>
            cy
              .get(
                '[data-test="exportAllPages"] > .mat-checkbox-layout > .mat-checkbox-inner-container'
              )
              .click()
          )
          .then(() => cy.get('[data-test="dialogDescription"]'))
          .then((element) =>
            expect(element.text()).to.eq(
              'Export the maximum of 5000 pages from all 4 columns.'
            )
          )

          .then(() => cy.get('[data-test="closeDialog"]').click());
      } else {
        cy.get('[data-test="closeDialog"]').click();
      }
    });
  });
}
