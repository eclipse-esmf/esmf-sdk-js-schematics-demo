describe('Command bar with excluded properties', (): void => {
  before((): void => {
    cy.visit('/');
    cy.get('[data-test="excluded-property"]').click();
  });

  it('should generate a table', (): void => {
    cy.get('[data-test="table"]').should('exist');
  });

  it('should not contain excluded columns', (): void => {
    const excludedProps = ['Moving', 'End Date', 'Start Date'];
    excludedProps.join('');

    cy.get('[data-test="table"]').within(() => {
      excludedProps.forEach((ep) =>
        cy
          .get('[data-test="table-header-text"]')
          .contains('span', ep)
          .should((elem) => {
            expect(elem.text()).to.not.equal(ep);
          })
      );
    });
  });
});
