import {ElementRef} from "@angular/core";

export class Cursor<T> {
  protected readonly collection: T[];
  protected index: number;

  constructor(collection: T[], startIndex: number = 0) {
    this.collection = collection;
    this.index = startIndex < collection.length ? startIndex : 0;
  }

  next(): T {
    if (this.index < this.collection.length - 1) {
      this.index++;
    }
    return this.collection[this.index];
  }

  prev(): T {
    if (this.index > 0) {
      this.index--;
    }
    return this.collection[this.index];
  }

  current(): T {
    return this.collection[this.index];
  }
}

export class CursorHtmlElement extends Cursor<ElementRef<HTMLElement>> {
  nextFocus(timeout: number | undefined = undefined) {
    setTimeout(() => {
      this.next().nativeElement.focus();
    }, timeout);
  }

  prevFocus(timeout: number | undefined = undefined) {
    setTimeout(() => {
      this.prev().nativeElement.focus();
    }, timeout);
  }

  currentFocus(timeout: number | undefined = undefined) {
    setTimeout(() => {
      this.current().nativeElement.focus();
    }, timeout);
  }
}
