import { paginatorTests } from './paginator.spec';
import { exportDialogTests } from './export-dialog.spec';

export function tableTests(
  includePaginator = true,
  includeExportDialog = true,
  hasRemoteDataCall = false
): void {
  describe('Table functionalities', (): void => {
    it('should load a table', (): void => {
      cy.get('[data-test="table"]').should('exist');
    });

    it('should copy content to clipboard', (): void => {
      cy.get('[data-test="copy-to-clipboard-button"]')
        .first()
        .invoke('show')
        .click({ force: true });

      cy.task('getClipboard').then((t) => {
        expect(t).to.exist;
        expect(t).not.to.eq('');
      });
    });
  });

  if (includePaginator) {
    paginatorTests();
  }

  if (includeExportDialog) {
    exportDialogTests(hasRemoteDataCall);
  }
}
