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

/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {Component, EventEmitter, Output} from '@angular/core';
import {JSSdkLocalStorageService} from '../../services/storage.service';
import {Config} from './command-bar-search.component';

@Component({
  selector: 'command-bar-search-config-menu',
  templateUrl: './command-bar-search-config-menu.component.html',
  styleUrls: ['./command-bar-search.component.scss'],
})
export class CommandBarSearchConfigMenuComponent {
  @Output() configChangedEvent = new EventEmitter<Array<Config>>();

  keyLocalStorage: string = '';
  closeConfigMenu: boolean = false;
  configs: Array<Config> = [];

  constructor(private storageService: JSSdkLocalStorageService) {}

  closeMenu(): void {
    this.closeConfigMenu = true;
  }

  stopMenuClosing(event: MouseEvent): void {
    if (this.closeConfigMenu) {
      return;
    }
    event.stopPropagation();
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
