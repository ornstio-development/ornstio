import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil } from 'rxjs/operators';
import { randomTime } from 'src/app/functions/randomTime';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  private behaviorSubject = new BehaviorSubject<string>(randomColor());
  private observable$ = this.behaviorSubject.asObservable();
  private destroy = new Subject<void>();
  color: string;

  constructor() { }

  ngOnInit() {
    this.observable$
      .pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.color = color;
        setTimeout(() => { this.behaviorSubject.next(randomColor()) }, randomTime())
      })
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
