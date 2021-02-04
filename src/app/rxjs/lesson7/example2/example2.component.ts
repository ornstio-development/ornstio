import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, from, Observable, of, Subject } from 'rxjs';
import { delay, first, map, mergeMap, takeUntil } from 'rxjs/operators';
import { randomColor } from 'src/app/functions/randomColor';
import { randomTime } from 'src/app/functions/randomTime';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit, OnDestroy {

  label: string = 'Begin';
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

  begin() {
    this.label = 'Working...';
    forkJoin(
      from(this.observables)
        .pipe(mergeMap(o => this.callback(o), null, 4))
    )
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.label = 'Done';
      });
  }

  callback(observable: Observable<Color>){
    return observable.pipe(map(color => this.colors.push(color)))
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
