import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CheckboxesService} from './checkboxes.service';

/**
 * Custom service which extend the original API service for fetching
 * Movement data from the configured
 * remote API.
 *
 * If you need to override or to extend the current functionality,
 * this is the right place to do. All modifications are preserved while
 * generating the table component again, also in combination with
 * the cli parameter '--force'.
 */
@Injectable({
    providedIn: 'root',
})
export class CustomCheckboxesService extends CheckboxesService {
    constructor(http: HttpClient) {
        super(http);
    }
}
