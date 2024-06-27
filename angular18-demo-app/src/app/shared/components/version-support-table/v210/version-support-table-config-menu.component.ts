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

/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {Component, EventEmitter, Inject, Input, Optional, Output} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {JSSdkLocalStorageService} from '../../../services/storage.service';
import {Config} from './version-support-table.component';

@Component({
  selector: 'version-support-table-config-menu',
  templateUrl: './version-support-table-config-menu.component.html',
  styleUrls: ['./version-support-table.component.scss'],
})
export class VersionSupportTableConfigMenuComponent {
  @Output() configChangedEvent = new EventEmitter<Array<Config>>();
  @Input() isOpenedFromMatMenu = false;

  keyLocalStorage: string = '';
  closeConfigMenu: boolean = false;
  configs: Array<Config> = [];
  configsDefault: Array<Config> = [];

  constructor(
    private storageService: JSSdkLocalStorageService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {configs: Array<Config>; keyLocalStorage: string}
  ) {
    if (!data) {
      this.configsDefault = JSON.parse(JSON.stringify(this.configs));
    } else {
      this.configs = data.configs;
      this.configsDefault = JSON.parse(JSON.stringify(data.configs));
      this.keyLocalStorage = data.keyLocalStorage;
    }
  }

  closeMenu(): void {
    this.configs = JSON.parse(JSON.stringify(this.configsDefault));
    this.closeConfigMenu = true;
  }

  stopMenuClosing(event: MouseEvent): void {
    if (this.isOpenedFromMatMenu) {
      if (this.closeConfigMenu) {
        return;
      }
      event.stopPropagation();
    }
  }

  configClick(event: MouseEvent, config: Config): void {
    config.selected = !config.selected;
    event.preventDefault();
    event.stopPropagation();
  }

  colorChange(event: Event, config: Config) {
    config.color = (event.target as HTMLInputElement).value;
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Store columns locally and update displayed columns afterwards
   */
  storeConfig(): void {
    this.closeConfigMenu = true;
    this.storageService.setItem(this.keyLocalStorage, this.configs);
    this.configChangedEvent.emit(this.configs);
  }
}
