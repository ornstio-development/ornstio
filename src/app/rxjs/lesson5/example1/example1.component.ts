import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { randomColor } from 'src/app/functions/randomColor';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  public get len(): number {
    return 3;
  }

  color: Color = Color.FromHex(randomColor());
  private colorSubject = new BehaviorSubject<Color>(this.color);
  private color$ = this.colorSubject.asObservable();

  private subjects = new Array<Color>(this.len)
    .fill(null, 0, this.len)
    .map(() => {
      return new Subject<Color>();
    });
  private observables$ = this.subjects.map((subject) => {
    return subject.asObservable();
  })
  colors = new Array<Color>(this.len)
    .fill(null, 0, this.len);

  private destroy = new Subject<void>();
  constructor() { }

  ngOnInit() {
    this.observables$.forEach((observable, i) => {
      var index = i;
      observable.pipe(takeUntil(this.destroy)).subscribe((color) => {
        this.colors[index] = color;
      })
    })

    this.color$.pipe(takeUntil(this.destroy)).pipe(debounceTime(1000)).subscribe((color) => {
      this.subjects.forEach((subject, i) => {
        var arr = new Array(this.len)
          .fill(0, 0, this.len);
        arr[i] = Math.floor(color.rgb[i]);
        subject.next(Color.FromRgb(arr[0], arr[1], arr[2]));
      })
      this.colorSubject.next(this.color = Color.FromHex(randomColor()));
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
