/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {HttpClient} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from 'src/environments/environment';
import {Movement} from '../../types/movement/movement.types';

export interface MovementResponse {
  items: Movement[];
  totalItems?: number;
}

export interface GenericMovementPayload {
  [key: string]: string | number | boolean;
}

export type MovementPayload<T extends GenericMovementPayload = GenericMovementPayload> = T & {
  query: string;
};

const baseUrl = (environment as any).baseUrl || '';

@Injectable({
  providedIn: 'root',
})
export class CheckboxesTableService {
  constructor(protected http: HttpClient, private translateService: TranslateService) {
    this.http
      .get(
        `${baseUrl}/assets/i18n/shared/components/checkboxes-table/${this.translateService.currentLang}.checkboxes-table.translation.json`
      )
      .subscribe(translations => {
        this.translateService.setTranslation(this.translateService.currentLang, translations, true);
      });
  }
}
