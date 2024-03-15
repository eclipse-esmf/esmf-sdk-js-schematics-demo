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

import {AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';
import * as charsetDetector from 'charset-detector';

export interface CustomControlValidationError {
  translationKey: string;
  translationParams: {[key: string]: any};
}

type BoundDefinition = 'OPEN' | 'AT_LEAST' | 'GREATER_THAN' | 'LESS_THAN' | 'AT_MOST';
type Encoding = 'US-ASCII' | 'ISO-8859-1' | 'UTF-8' | 'UTF-16' | 'UTF-16BE' | 'UTF-16LE';

export class FormValidators {
  static applyToChildren(validator: ValidatorFn): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const controls = Object.values(group.controls);

      const validationErrors = controls
        .map(c => {
          const errors = validator(c);

          if (errors) {
            c.setErrors(errors);
          }

          return errors;
        })
        .filter(c => !!c);

      return validationErrors[0] ?? null;
    };
  }

  static uniqueValuesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;

      if (!group.value) {
        return null;
      }

      const values = Object.values(group.value).filter(value => !!value);
      const isUnique = new Set(values).size === values.length;

      return !isUnique
        ? {
            lengthMin: {
              translationKey: 'validation.group_unique_values',
              translationParams: {},
              isGroupSpecificError: true,
            },
          }
        : null;
    };
  }

  static listLengthValidator(min: number | undefined, max: number | undefined): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const array = control as FormArray;

      if (!array.value) {
        return null;
      }

      const length = array.value.length;
      const minStatement = min !== undefined ? length >= min : true;
      const maxStatement = max !== undefined ? length <= max : true;

      return !minStatement
        ? {
            lengthMin: {
              translationKey: 'validation.list_length_min',
              translationParams: {
                min,
              },
              isGroupSpecificError: true,
            },
          }
        : !maxStatement
        ? {
            lengthMax: {
              translationKey: 'validation.list_length_max',
              translationParams: {
                max,
              },
              isGroupSpecificError: true,
            },
          }
        : null;
    };
  }

  static deconstructionRuleValidator(rules: {name: string; rule: RegExp}[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;

      if (!group.value) {
        return null;
      }

      const validationErrors = rules
        .map(({name, rule}) => {
          const control = group.get(name);

          if (!control) {
            return null;
          }

          const validator = FormValidators.regularExpression(rule);
          const errors = validator(control);

          if (errors) {
            control.setErrors(errors);
          }

          return errors;
        })
        .filter(c => !!c);

      return validationErrors[0] ?? null;
    };
  }

  static encodingValidator(encoding: Encoding): ValidatorFn {
    const error = {
      encoding: {
        translationKey: 'validation.encoding',
        translationParams: {
          encoding,
        },
      },
    };

    const utf16Validator = (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(value);

      const charsetMatch = charsetDetector(uint8Array);
      const utf16BeCharsetMatch = charsetMatch.find(charset => charset.charsetName === 'UTF-16BE');
      const utf16LeCharsetMatch = charsetMatch.find(charset => charset.charsetName === 'UTF-16LE');
      const isMatch = utf16BeCharsetMatch && utf16LeCharsetMatch;

      return isMatch ? null : error;
    };

    const usAsciiValidator = (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[\x00-\x7F]*$/;
      const isMatch = pattern.test(value);

      return isMatch ? null : error;
    };

    const iso88591Validator = (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[\x00-\xFF]*$/;
      const isMatch = pattern.test(value);

      return isMatch ? null : error;
    };

    const defaultValidator = (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(value);

      const charsetMatch = charsetDetector(uint8Array);
      const isMatch = !!charsetMatch.find(charset => charset.charsetName === encoding);

      return isMatch ? null : error;
    };

    return encoding === 'UTF-16'
      ? utf16Validator
      : encoding === 'US-ASCII'
      ? usAsciiValidator
      : encoding === 'ISO-8859-1'
      ? iso88591Validator
      : defaultValidator;
  }

  static fixedPointValidator(integerLength: number, scaleLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const stringValue = typeof value === 'string' ? value : value.toString ? value.toString() : JSON.stringify(value);

      const chunks = stringValue.split('.');
      const integerValueLength = chunks[0]?.length ?? 0;
      const scaleValueLength = chunks[1]?.length ?? 0;

      return chunks.length !== 2
        ? {
            fixedPoint: {
              translationKey: 'validation.fixed_point_parts',
              translationParams: {},
            },
          }
        : integerValueLength !== integerLength
        ? {
            fixedPoint: {
              translationKey: 'validation.fixed_point_integer',
              translationParams: {
                integerLength,
              },
            },
          }
        : scaleValueLength !== scaleLength
        ? {
            fixedPoint: {
              translationKey: 'validation.fixed_point_scale',
              translationParams: {
                scaleLength,
              },
            },
          }
        : null;
    };
  }

  static lengthValidator(min: number | undefined, max: number | undefined): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const length = value.length;
      const minStatement = min !== undefined ? length >= min : true;
      const maxStatement = max !== undefined ? length <= max : true;

      return !minStatement
        ? {
            lengthMin: {
              translationKey: 'validation.length_min',
              translationParams: {
                min,
              },
            },
          }
        : !maxStatement
        ? {
            lengthMax: {
              translationKey: 'validation.length_max',
              translationParams: {
                max,
              },
            },
          }
        : null;
    };
  }

  static rangeValidator(
    min: number | undefined | null,
    lowerBoundDefinition: BoundDefinition,
    max: number | undefined | null,
    upperBoundDefinition: BoundDefinition
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value && value !== 0) {
        return null;
      }

      let minStatement = true;
      if (min !== undefined && min !== null) {
        minStatement = lowerBoundDefinition === 'AT_LEAST' ? value >= min : lowerBoundDefinition === 'GREATER_THAN' ? value > min : true;
      }

      let maxStatement = true;
      if (max !== undefined && max !== null) {
        maxStatement = upperBoundDefinition === 'AT_MOST' ? value <= max : upperBoundDefinition === 'LESS_THAN' ? value < max : true;
      }

      return !minStatement
        ? {
            rangeMin: {
              translationKey: lowerBoundDefinition === 'AT_LEAST' ? 'validation.range_min_inclusive' : 'validation.range_min',
              translationParams: {
                min,
              },
            },
          }
        : !maxStatement
        ? {
            rangeMax: {
              translationKey: upperBoundDefinition === 'AT_MOST' ? 'validation.range_max_inclusive' : 'validation.range_max',
              translationParams: {
                max,
              },
            },
          }
        : null;
    };
  }

  static regularExpression(pattern: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value && value !== 0) {
        return null;
      }

      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            regularExpression: {
              translationKey: 'validation.regular_expression',
              translationParams: {
                pattern: pattern.source,
              },
            },
          };
    };
  }

  static byteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[-+]?[0-9]+$/;
      const maxInclusive = 127;
      const minInclusive = -128;

      const isMatch = pattern.test(value) && value >= minInclusive && value <= maxInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.byte',
              translationParams: {},
            },
          };
    };
  }

  static floatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^\s*([-+]?(?:\d+\.\d+|\.\d+|\d+)(?:[eE][-+]?\d+)?|([-+]?)INF|NaN)\s*$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.float',
              translationParams: {},
            },
          };
    };
  }

  static decimalValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^\s*([-+]?\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?\s*$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.decimal',
              translationParams: {},
            },
          };
    };
  }

  static doubleValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^\s*([-+]?(?:\d+\.\d+|\.\d+|\d+)(?:[eE][-+]?\d+)?|([-+]?)INF|NaN)\s*$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.double',
              translationParams: {},
            },
          };
    };
  }

  static integerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.integer',
              translationParams: {},
            },
          };
    };
  }

  static intValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const maxInclusive = 2147483647;
      const minInclusive = -2147483648;

      const isMatch = pattern.test(value) && value >= minInclusive && value <= maxInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.int',
              translationParams: {},
            },
          };
    };
  }

  static positiveIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const minInclusive = 1;
      const isMatch = pattern.test(value) && value >= minInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.positive_integer',
              translationParams: {},
            },
          };
    };
  }

  static longValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const error = {
        byte: {
          translationKey: 'validation.long',
          translationParams: {},
        },
      };

      if (!+value && +value !== 0) {
        return error;
      }

      const pattern = /^[+-]?\d+$/;
      const isPatternMatch = pattern.test(value);

      if (!isPatternMatch) {
        return error;
      }

      const maxInclusive = BigInt('9223372036854775807');
      const minInclusive = BigInt('-9223372036854775808');
      const bigIntValue = BigInt(value);

      const isMatch = isPatternMatch && bigIntValue >= minInclusive && bigIntValue <= maxInclusive;

      return isMatch ? null : error;
    };
  }

  static negativeIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const maxInclusive = -1;
      const isMatch = pattern.test(value) && value <= maxInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.negative_integer',
              translationParams: {},
            },
          };
    };
  }

  static nonPositiveIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const maxInclusive = 0;
      const isMatch = pattern.test(value) && value <= maxInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.non_positive_integer',
              translationParams: {},
            },
          };
    };
  }

  static nonNegativeIntegerValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const minInclusive = 0;
      const isMatch = pattern.test(value) && value >= minInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.non_negative_integer',
              translationParams: {},
            },
          };
    };
  }

  static shortValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const maxInclusive = 32767;
      const minInclusive = -32768;

      const isMatch = pattern.test(value) && value >= minInclusive && value <= maxInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.short',
              translationParams: {},
            },
          };
    };
  }

  static unsignedIntValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const maxInclusive = 4294967295;
      const minInclusive = 0;

      const isMatch = pattern.test(value) && value >= minInclusive && value <= maxInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.unsigned_int',
              translationParams: {},
            },
          };
    };
  }

  static unsignedByteValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const maxInclusive = 255;
      const minInclusive = 0;

      const isMatch = pattern.test(value) && value >= minInclusive && value <= maxInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.unsigned_byte',
              translationParams: {},
            },
          };
    };
  }

  static unsignedLongValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const error = {
        byte: {
          translationKey: 'validation.unsigned_long',
          translationParams: {},
        },
      };

      if (!+value && +value !== 0) {
        return error;
      }

      const pattern = /^[+-]?\d+$/;
      const isPatternMatch = pattern.test(value);

      if (!isPatternMatch) {
        return error;
      }

      const maxInclusive = BigInt('18446744073709551615');
      const minInclusive = BigInt('0');
      const bigIntValue = BigInt(value);

      const isMatch = isPatternMatch && bigIntValue >= minInclusive && bigIntValue <= maxInclusive;

      return isMatch ? null : error;
    };
  }

  static unsignedShortValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^[+-]?\d+$/;
      const maxInclusive = 65535;
      const minInclusive = 0;

      const isMatch = pattern.test(value) && value >= minInclusive && value <= maxInclusive;

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.unsigned_short',
              translationParams: {},
            },
          };
    };
  }

  static numberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^-?\d*\.?\d+$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.number',
              translationParams: {},
            },
          };
    };
  }

  static gDayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^---(0[1-9]|[12][0-9]|3[01])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.g_day',
              translationParams: {},
            },
          };
    };
  }

  static gMonthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^--(0[1-9]|1[0-2])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.g_month',
              translationParams: {},
            },
          };
    };
  }

  static gMonthDayValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^--(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.g_month_day',
              translationParams: {},
            },
          };
    };
  }

  static gYearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^-?([1-9][0-9]{3,}|0[0-9]{3})(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.g_year',
              translationParams: {},
            },
          };
    };
  }

  static gYearMonthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.g_year_month',
              translationParams: {},
            },
          };
    };
  }

  static durationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^-?P(\d+Y)?(\d+M)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.duration',
              translationParams: {},
            },
          };
    };
  }

  static dayTimeDurationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^-?P(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.day_time_duration',
              translationParams: {},
            },
          };
    };
  }

  static yearMonthDurationValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^-?P((\d+Y\d+M)|(\d+Y)|(\d+M))$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.year_month_duration',
              translationParams: {},
            },
          };
    };
  }

  static timeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern =
        /^(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.time',
              translationParams: {},
            },
          };
    };
  }

  static hexBinaryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^([0-9a-fA-F]{2})*$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.hex_binary',
              translationParams: {},
            },
          };
    };
  }

  static base64BinaryValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern =
        /^(([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}[A-Za-z0-9+/=]|([A-Za-z0-9+/]{2}[AEIMQUYcgkosw048]=)|([A-Za-z0-9+/]{1}[AQgw]=?=?)))?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.base64_binary',
              translationParams: {},
            },
          };
    };
  }

  static anyUriValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^(?!.*#.*#.*$)(?!.*%[^A-Fa-f0-9]|%[A-Fa-f0-9]{1}$)[^\s]+$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.any_URI',
              translationParams: {},
            },
          };
    };
  }

  static curieValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^(?:\[[\w-]+:[^\[\]]+\]|(?::[\w-]+)|(?:[\w-]+:)?[\w'"#+-]+)$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.curie',
              translationParams: {},
            },
          };
    };
  }

  static langStringValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const pattern = /^".+"@[a-zA-Z]+(-[a-zA-Z0-9]+)?$/;
      const isMatch = pattern.test(value);

      return isMatch
        ? null
        : {
            byte: {
              translationKey: 'validation.lang_string',
              translationParams: {},
            },
          };
    };
  }
}
