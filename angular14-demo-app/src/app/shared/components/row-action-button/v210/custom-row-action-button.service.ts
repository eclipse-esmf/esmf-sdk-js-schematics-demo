import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RowActionButtonService} from './row-action-button.service';

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
export class CustomRowActionButtonService extends RowActionButtonService {
    constructor(http: HttpClient) {
        super(http);
    }
}
