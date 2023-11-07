/*
 * Copyright (c) 2023 Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import {exportDialogTests} from './export-dialog.spec';
import {paginatorTests} from './paginator.spec';

export function cardTests(includePaginator = true, includeExportDialog = true, hasRemoteDataCall = false): void {
  describe('Card functionalities', (): void => {
    it('should load a card', (): void => {
      cy.get('.data-card-header').should('exist');
    });
  });

  if (includePaginator) {
    paginatorTests();
  }

  if (includeExportDialog) {
    exportDialogTests(hasRemoteDataCall);
  }
}
