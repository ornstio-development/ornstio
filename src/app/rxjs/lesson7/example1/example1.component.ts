import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, of, Subject } from 'rxjs';
import { delay, first, mergeMap, takeUntil } from 'rxjs/operators';
import { randomColor } from 'src/app/functions/randomColor';
import { randomTime } from 'src/app/functions/randomTime';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  observables = new Array(16)
    .fill(null, 0, 16)
    .map(() => {
      return of(Color.FromHex(randomColor()))
        .pipe(first())
        .pipe(delay(randomTime()))
        .pipe(first());
    });
  colors: Color[] = [];
  private destroy = new Subject<void>();

  constructor() { }

  ngOnInit() {
  }

  begin(){
    from(this.observables)
      .pipe(mergeMap(o => o, null, 4))
      .pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.colors.push(color);
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
