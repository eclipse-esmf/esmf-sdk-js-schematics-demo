import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommandBarActionsService} from './command-bar-actions.service';

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
export class CustomCommandBarActionsService extends CommandBarActionsService {
    constructor(http: HttpClient) {
        super(http);
    }
}
