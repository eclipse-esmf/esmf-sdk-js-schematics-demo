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
import {DOCUMENT} from '@angular/common';
import {Directive, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[resizeColumn]',
})
export class ResizeColumnDirective implements OnInit {
  @Input('resizeColumn') resizable: boolean = false;
  @Input() index: number = 0;
  @Input() minWidth: number = 50;
  @Input() initialWidth: number = 200;

  @Output() dragging = new EventEmitter<any>();

  private startX!: number;
  private startWidth!: number;
  private readonly column!: HTMLElement;
  private table!: HTMLElement;
  private pressed!: boolean;
  private handle!: HTMLElement;

  private mouseMoveListener!: () => void;
  private mouseUpListener!: () => void;
  private mouseEnterListener!: () => void;
  private mouseLeaveListener!: () => void;

  constructor(private renderer: Renderer2, private el: ElementRef, @Inject(DOCUMENT) private document: Document) {
    this.column = this.el.nativeElement;
  }

  ngOnInit() {
    if (this.resizable) {
      this.setTable();
      this.setListeners();
      this.createHandle();
    }
  }

  createHandle(): void {
    this.handle = this.renderer.createElement('div');
    this.renderer.appendChild(this.column, this.handle);
    this.renderer.addClass(this.handle, 'handle');
  }

  setTable(): void {
    const row = this.renderer.parentNode(this.column);
    const thead = this.renderer.parentNode(row);
    this.table = this.renderer.parentNode(thead);
    this.renderer.setStyle(this.column, 'min-width', `${this.initialWidth}px`);
  }

  setListeners(): void {
    this.mouseEnterListener = this.renderer.listen(this.column, 'mouseenter', this.onMouseEnter);
    this.mouseLeaveListener = this.renderer.listen(this.column, 'mouseleave', this.onMouseLeave);
  }

  onMouseEnter = (): void => {
    this.renderer.setStyle(this.handle, 'opacity', '1');
    this.renderer.listen(this.handle, 'mousedown', this.onMouseDown);
  };

  onMouseLeave = (): void => {
    this.renderer.setStyle(this.handle, 'opacity', '0');
  };

  onMouseDown = (event: MouseEvent) => {
    this.pressed = true;
    this.mouseEnterListener();
    this.mouseLeaveListener();
    this.dragging.emit(true);
    this.startX = event.pageX;
    this.startWidth = this.column.offsetWidth;
    this.renderer.addClass(this.document.body, 'resizing');
    this.mouseMoveListener = this.renderer.listen(this.table, 'mousemove', this.onMouseMove);
    this.mouseUpListener = this.renderer.listen('document', 'mouseup', this.onMouseUp);
  };

  onMouseMove = (event: MouseEvent): void => {
    if (this.pressed && event.buttons) {
      // Calculate width of column
      const distance = event.pageX - this.startX;
      const targetWidth = this.startWidth + distance;
      const width = targetWidth >= this.minWidth ? targetWidth : this.minWidth;

      // Set column width explicitly (cells are getting resized automatically)
      this.renderer.setStyle(this.column, 'min-width', `${width}px`);
      this.renderer.setStyle(this.column, 'width', `${width}px`);
    }
  };

  onMouseUp = (): void => {
    if (this.pressed) {
      this.mouseMoveListener();
      this.mouseUpListener();
      this.setListeners();
      this.pressed = false;

      // setTimeout is used in order to ensure that the click will only trigger the resize event and not the
      // sorting one as well, since both of the events are triggered on the same cell. This is the only way it
      // worked. If you have another idea, please feel free to change it.
      setTimeout((): void => {
        this.dragging.emit(false);
        this.renderer.removeClass(this.document.body, 'resizing');
        this.renderer.setStyle(this.handle, 'opacity', '0');
      }, 0);
    }
  };
}
