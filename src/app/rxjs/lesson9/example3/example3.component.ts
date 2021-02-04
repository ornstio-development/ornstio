import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.scss']
})
export class Example3Component implements OnInit, OnDestroy {

  private subject = new ReplaySubject<Color>(3);
  private destroy = new Subject<void>();
  firstColors: Color[] = [];
  secondColors: Color[] = [];

  constructor() { }

  ngOnInit() {
    this.subject.next(Color.FromHex(randomColor()));
    this.subject.next(Color.FromHex(randomColor()));
    this.subject.next(Color.FromHex(randomColor()));
    this.subject.pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.firstColors.push(color);
      })
    
    this.subject.next(Color.FromHex(randomColor()));
    this.subject.next(Color.FromHex(randomColor()));

    this.subject.pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.secondColors.push(color);
      })
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}