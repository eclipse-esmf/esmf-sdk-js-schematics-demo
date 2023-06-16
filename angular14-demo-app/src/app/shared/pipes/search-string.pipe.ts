/** Generated from RBS JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {Pipe, PipeTransform} from '@angular/core';
import {FormControl} from '@angular/forms';
@Pipe({
    name: 'searchString',
    pure: true,
})
export class SearchStringPipe implements PipeTransform {
    transform(value: any, searchString: string[]): boolean {
        if (typeof value === 'boolean') {
            value = value.toString();
        }
        if (value.constructor.name === 'Date') {
            value = value.toLocaleString();
        }
        if (typeof value !== 'string') {
            return false;
        }
        return searchString.length !== 0 && searchString.some(term => value?.includes(term));
    }
}
