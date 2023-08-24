/** Generated from ESMF JS SDK Angular Schematics - PLEASE DO NOT CHANGE IT **/
import {AfterContentInit, Directive, ElementRef, HostListener, Input, NgZone, OnDestroy} from '@angular/core';
import {MatChipListbox} from '@angular/material/chips';
import {Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[horizontalOverflow]',
  exportAs: 'horizontalOverflow',
})
export class HorizontalOverflowDirective implements AfterContentInit, OnDestroy {
  @Input('chipsObj') chips!: MatChipListbox;

  private readonly _destroyed$ = new Subject<void>();
  disableLeftBtn: boolean = true;
  disableRightBtn: boolean = true;
  left: number = 0;
  offsetWidth: number = 0;
  scrollWidth: number = 0;
  clientWidth: number = 0;
  scrollable: boolean = false;
  scrollValue: number = 200;

  constructor(private element: ElementRef, private zone: NgZone) {}

  ngAfterContentInit() {
    this.chips._chips.changes.pipe(takeUntil(this._destroyed$)).subscribe(() =>
      this.zone.onStable
        .asObservable()
        .pipe(take(1))
        .subscribe(() => {
          this.adjustValues();
        })
    );
  }

  @HostListener('wheel', ['$event'])
  public onScroll(event: WheelEvent) {
    let [x, y] = [event.deltaX, event.deltaY];
    let magnitude;

    if (x === 0) {
      magnitude = y > 0 ? this.scrollValue : -this.scrollValue;
    } else {
      magnitude = x;
    }

    this.element.nativeElement.scrollBy({
      left: magnitude,
      behavior: 'smooth',
    });
  }

  @HostListener('scroll') onScrollEvent() {
    this.adjustValues();
  }

  adjustValues() {
    this.left = this.element.nativeElement.scrollLeft;
    this.offsetWidth = this.element.nativeElement.offsetWidth;
    this.scrollWidth = this.element.nativeElement.scrollWidth;
    this.clientWidth = this.element.nativeElement.clientWidth;
    this.disableLeftBtn = this.left === 0;
    this.disableRightBtn = this.left >= this.scrollWidth - this.offsetWidth - 1;
    this.scrollable = this.scrollWidth > this.clientWidth;
  }

  scrollChipList(direction: string) {
    switch (direction) {
      case 'left':
        this.element.nativeElement.scrollLeft -= this.scrollValue;
        break;
      case 'right':
        this.element.nativeElement.scrollLeft += this.scrollValue;
        break;
    }
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
