/*
 * Copyright (c) 2024 Robert Bosch Manufacturing Solutions GmbH
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

const glob = require('glob');
const fs = require('fs-extra');

const newDate = new Date().getFullYear();

const copyrightHeaderTS = `/*
 * Copyright (c) ${newDate} Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */\n\n`;

const copyrightHeaderCSS = `/*!
 * Copyright (c) ${newDate} Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */\n\n`;

const copyrightHeaderHTML = `<!--
 * Copyright (c) ${newDate} Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 -->\n\n`;

const files = [
  ...glob.sync('./src/**/*.{ts,css,scss,html}'),
  ...glob.sync('./cypress/e2e/**/*.{ts,css,scss,html}'),
  ...glob.sync('./cypress/plugins/**/*.{ts,css,scss,html}'),
  ...glob.sync('./cypress/reusable-tests/**/*.{ts,css,scss,html}'),
];

if (files.length === 0) {
  console.error('No files found');
  process.exit(1);
}

files.forEach(file => {
  fs.readFile(file, 'utf8')
    .then(content => {
      let copyrightHeader = '';

      if (file.endsWith('.ts')) {
        copyrightHeader = copyrightHeaderTS;
      } else if (file.endsWith('.css') || file.endsWith('.scss')) {
        copyrightHeader = copyrightHeaderCSS;
      } else {
        copyrightHeader = copyrightHeaderHTML;
      }

      // Check if the copyright notice is already in the file
      if (!content.includes(`Copyright (c) ${newDate} Robert Bosch Manufacturing Solutions GmbH`)) {
        // Prepend copyright notice
        const newContent = copyrightHeader + content;

        return fs.writeFile(file, newContent, 'utf8');
      }
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
});
