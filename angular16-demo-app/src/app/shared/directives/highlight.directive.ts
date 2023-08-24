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
import {Directive, ElementRef, Input, OnChanges, OnInit, SecurityContext, SimpleChange, SimpleChanges} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

interface HighlightSimpleChanges extends SimpleChanges {
  highlight: SimpleChange;
  caseSensitive: SimpleChange;
}

interface HighlightRange {
  from: number;
  to: number;
}

const threeDigitsRegExp = new RegExp('^#?\\d{3}$');
const sixDigitsRegExp = new RegExp('^#?\\d{6}$');

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective implements OnChanges, OnInit {
  @Input() highlightSource: string | null = null;
  @Input() set highlight(value: string | string[]) {
    this._highlight = Array.isArray(value) ? value : [value];
  }

  @Input() set highlightColor(value: string | undefined) {
    if (value) {
      if (value.match(threeDigitsRegExp) || value.match(sixDigitsRegExp)) {
        this._color = value.padStart(value.length + 1, '#');
      } else {
        this._color = value;
      }
    }
  }

  @Input() set caseSensitive(value: boolean) {
    this.regExpFlags = value ? 'g' : 'gi';
  }

  private regExpFlags = 'gi';
  private _highlight: string[] = [];
  private _color: string | undefined = undefined;

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: HighlightSimpleChanges) {
    if ((changes.highlight && !changes.highlight.firstChange) || (changes.caseSensitive && !changes.caseSensitive.firstChange)) {
      this.transformText();
    }
  }

  ngOnInit(): void {
    this.transformText();
  }

  private transformText(): void {
    if (this.canHighlightText()) {
      const allRanges = this.calcRangesToReplace();
      const rangesToHighlight = this.mergeRangeIntersections(allRanges);
      const content = this.sanitizer.sanitize(SecurityContext.STYLE, this.replaceHighlights(rangesToHighlight));

      if (content?.length) {
        (this.el.nativeElement as HTMLElement).innerHTML = content;
      }
    }
  }

  private canHighlightText(): boolean {
    return (
      this.el?.nativeElement &&
      this._highlight &&
      typeof this.highlightSource === 'string' &&
      this.highlightSource.length > 0 &&
      !!this._color
    );
  }

  private calcRangesToReplace(): HighlightRange[] {
    return this._highlight
      .map(highlightString => {
        const len = highlightString.length;
        const matches = this.highlightSource?.matchAll(new RegExp(highlightString.toLowerCase(), this.regExpFlags));
        if (!matches) {
          return [];
        }

        return [...matches]
          .filter((a: RegExpMatchArray) => a && a.index !== undefined)
          .map<HighlightRange>(a => ({from: a.index!, to: a.index! + len}));
      })
      .filter(match => match.length > 0)
      .flat()
      .sort((a, b) => a.from - b.from);
  }

  private mergeRangeIntersections(allRanges: HighlightRange[]): HighlightRange[] {
    if (allRanges.length === 0) {
      return [];
    }

    const rangesToHighlight = [allRanges[0]];

    allRanges.forEach(range => {
      const currentRange = rangesToHighlight[rangesToHighlight.length - 1];

      if (range.from <= currentRange.from) {
        currentRange.from = range.from;

        if (range.to > currentRange.to) {
          currentRange.to = range.to;
        }
      } else if (range.from <= currentRange.to && range.to >= currentRange.to) {
        currentRange.to = range.to;
      } else {
        rangesToHighlight.push(range);
      }
    });

    return rangesToHighlight;
  }

  private replaceHighlights(rangesToHighlight: HighlightRange[]): string {
    if (!this.highlightSource?.length || rangesToHighlight.length === 0) {
      return '';
    }

    const resultStringParts: string[] = [];
    let index = 0;

    rangesToHighlight.forEach(({from, to}) => {
      if (from > index) {
        resultStringParts.push(this.highlightSource!.substring(index, from));
      }

      const strPart = this.highlightSource!.substring(from, to);
      resultStringParts.push('<mark style="background-color: ' + this._color + ';">' + strPart + '</mark>');
      index = to;
    });

    if (index < this.highlightSource!.length) {
      resultStringParts.push(this.highlightSource!.substring(index));
    }

    return resultStringParts.join('');
  }
}
