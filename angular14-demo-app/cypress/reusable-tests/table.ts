/*
 * Copyright (c) 2023 Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import {exportDialogTests} from './export-dialog.spec';
import {paginatorTests} from './paginator.spec';

export function tableTests(includePaginator = true, includeExportDialog = true, hasRemoteDataCall = false): void {
  describe('Table functionalities', (): void => {
    it('should load a table', (): void => {
      cy.get('[data-test="table"]').should('exist');
    });

    it('should copy content to clipboard', (): void => {
      cy.get('[data-test="copy-to-clipboard-button"]').first().invoke('show').click({force: true});

      cy.task('getClipboard').then(t => {
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
