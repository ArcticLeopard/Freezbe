import {ElementRef, QueryList} from "@angular/core";
import {Subscription} from "rxjs";

export class Cursor<T> {
  protected readonly collection: QueryList<T>;
  protected index: number;
  private subscription: Subscription;

  constructor(collection: QueryList<T>, startIndex: number = 0) {
    this.collection = collection;
    this.subscription = collection.changes.subscribe(() => {
      this.index = -1;
    });
    this.index = startIndex < collection.length ? startIndex : 0;
  }

  next(): T | null {
    if (this.index < this.collection.length - 1) {
      this.index++;
    }
    return this.collection.get(this.index) || null;
  }

  prev(): T | null {
    if (this.index > 0) {
      this.index--;
    }
    return this.collection.get(this.index) || null;
  }

  current(): T | null {
    return this.collection.get(this.index) || null;
  }
}

export class CursorHtmlElement extends Cursor<ElementRef<HTMLElement>> {
  nextFocus(timeout: number | undefined = undefined) {
    setTimeout(() => {
      this.next()?.nativeElement.focus();
    }, timeout);
  }

  prevFocus(timeout: number | undefined = undefined) {
    setTimeout(() => {
      this.prev()?.nativeElement.focus();
    }, timeout);
  }

  currentFocus(timeout: number | undefined = undefined) {
    setTimeout(() => {
      this.current()?.nativeElement.focus();
    }, timeout);
  }
}
