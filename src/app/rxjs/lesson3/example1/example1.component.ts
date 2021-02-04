import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { randomColor } from 'src/app/functions/randomColor';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  colors: string[] = [];

  private colorSubjects: BehaviorSubject<string>[] = [
    new BehaviorSubject<string>(randomColor()),
    new BehaviorSubject<string>(randomColor()),
    new BehaviorSubject<string>(randomColor())
  ];
  private colors$: Observable<string>[] = this.colorSubjects.map((colorSubject) => {
    return colorSubject.asObservable();
  })

  destroy = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.colors$.forEach((color$, i) => {
      color$.pipe(debounceTime(1000))
      .pipe(takeUntil(this.destroy))
        .subscribe((color) => {
          this.colors[i] = color;
          this.colorSubjects[i].next(randomColor());
        })
    })

  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
