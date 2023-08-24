/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {Directive, Input} from '@angular/core';
import {AbstractControl, FormControl, FormGroupDirective, NG_VALIDATORS, NgForm, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Directive({
  selector: '[validateInput]',
  providers: [
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: ValidateInputDirective,
    },
  ],
})
export class ValidateInputDirective {
  /** Pass here the regex pattern as string, e.g. '^[a-zA-Z0-9-_.,+ ]+$' */
  @Input() validateInput: string = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return validateInputsValidator(new RegExp(this.validateInput))(control);
  }
}

export class ValidationErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!((control && control.invalid && control.touched) || control?.dirty);
  }
}

function validateInputsValidator(pattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const allowedCharacters = pattern;

    //trigger error if input has blank space
    if (value?.indexOf(' ') === 0 || value?.endsWith(' ')) {
      return {blankSpace: true};
    }

    //allow input to be empty
    if (value?.length === 0) {
      return null;
    }

    //trigger error if input does not meet the pattern criteria
    if (value?.length > 0 && !value?.match(allowedCharacters)) {
      return {invalidInput: true};
    }

    return null;
  };
}
