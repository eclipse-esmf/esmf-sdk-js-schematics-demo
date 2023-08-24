/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'showDescription'})
export class ShowDescriptionPipe implements PipeTransform {
  transform(value: any, getByValueFn: any, onlyDesc?: boolean): any {
    value = value?.toString();

    const resultParts: string[] = value && !onlyDesc ? [value] : [];
    resultParts.push(getByValueFn(value)?.description);

    return resultParts.join(' - ');
  }
}
