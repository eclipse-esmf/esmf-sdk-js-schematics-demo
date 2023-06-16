/** Generated from RBS JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'showDescription'})
export class ShowDescriptionPipe implements PipeTransform {
    transform(value: any, getByValueFn: any, onlyDesc?: boolean): any {
        return onlyDesc
            ? `${getByValueFn(value.toString())?.description}` || ''
            : `${value} - ${getByValueFn(value.toString())?.description}` || '';
    }
}
