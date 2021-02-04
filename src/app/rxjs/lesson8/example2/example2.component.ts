import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, from } from 'rxjs';
import { takeUntil, combineAll } from 'rxjs/operators';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit {

  destroy = new Subject<void>();
  subjects = new Array(16).fill(null, 0, 16)
    .map(() => {
      return new BehaviorSubject<number>(0)
    });
  numbers = new Array(16);

  constructor() { }

  ngOnInit() {
    from(
      this.subjects.map((subject) => {
        return subject.pipe(takeUntil(this.destroy));
      }))
      .pipe(combineAll())
      .pipe(takeUntil(this.destroy))
      .subscribe((numbers) => {
        this.numbers = numbers;
      })
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  increment(i: number) {
    this.subjects[i].next(this.subjects[i].value + 1);
  }

}
