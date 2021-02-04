import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  private subject = new BehaviorSubject<Color>(Color.FromHex(randomColor()));
  private destroy = new Subject<void>();
  private color$ = this.subject.asObservable();
  color: Color;
  previousColor: Color;

  constructor() { }

  ngOnInit() {
    this.color$.pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.previousColor = this.color;
        this.color = color;
      })
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  next(){
    this.subject.next(Color.FromHex(randomColor()));
  }

}
