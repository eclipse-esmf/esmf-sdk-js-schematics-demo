const enum PaginatorValues {
    FIVE = 5,
    Default = 20,
    Fifty = 50,
    OneHundred = 100
}

export function paginatorTests(): void {
    describe('Paginator functionalities', (): void => {

        it('should load a paginator', (): void => {
            cy.get('[data-test="paginator"]').should('exist');
        })

        it('should initialize items per page number with 20', (): void => {
            cy.get('[data-test="paginator"] .mat-select-min-line').then((element: JQuery): void => {
                expect(parseFloat(element.text())).to.eq(PaginatorValues.Default);
            });
        })

        it('should select from paginator value options', (): void => {
            cy.get('[data-test="paginator"] .mat-form-field-type-mat-select').click();
            cy.get('.mat-select-panel').children().then((list) => {
                expect(list[1].className).to.contain('mat-selected');
                expect(list[1].className).to.contain('mat-active');
                list[0].click();
                expect(list[0].className).to.contain('mat-selected');
                expect(list[0].className).to.contain('mat-active');
                cy.get('.mat-select-min-line').then((element: JQuery): void => {
                    expect(parseFloat(element.text())).to.eq(PaginatorValues.FIVE);
                });
                cy.get('.cdk-overlay-connected-position-bounding-box').should('not.be.visible');
            });
        })

        it('should disable paginator buttons if there is not enough data', (): void => {
            cy.get('[data-test="paginator"] .mat-paginator-range-label').then(paginatorNumber => {
                const totalNumberOfItems = parseInt(paginatorNumber.text().split('of')[1]);
                cy.get('[data-test="paginator"] .mat-select-min-line').then((element: JQuery): void => {
                    const numberOfItemsPerPage = parseFloat(element.text());

                    if (totalNumberOfItems < numberOfItemsPerPage) {
                        cy.get('[data-test="paginator"] .mat-paginator-navigation-first').should('be.disabled');
                        cy.get('[data-test="paginator"] .mat-paginator-navigation-previous').should('be.disabled');
                        cy.get('[data-test="paginator"] .mat-paginator-navigation-next').should('be.disabled');
                        cy.get('[data-test="paginator"] .mat-paginator-navigation-last').should('be.disabled');
                    }
                });
            });
        })

        it('should enable paginator buttons if there is enough data', (): void => {
            //Set items per page to 20
            cy.get('[data-test="paginator"] .mat-form-field-type-mat-select').click();
            cy.get('.mat-select-panel').children().first().click();

            cy.get('[data-test="paginator"] .mat-paginator-range-label').then(paginatorNumber => {
                const totalNumberOfItems = parseInt(paginatorNumber.text().split('of')[1]);
                cy.log('number of items', totalNumberOfItems);
                cy.get('[data-test="paginator"] .mat-select-min-line').then((element: JQuery): void => {
                    const numberOfItemsPerPage = parseFloat(element.text());

                    if (totalNumberOfItems > numberOfItemsPerPage) {
                        cy.get('[data-test="paginator"] .mat-paginator-navigation-next').should('be.not.disabled');
                        cy.get('[data-test="paginator"] .mat-paginator-navigation-last').should('be.not.disabled');
                    }
                });
            });
        })
    })
}
