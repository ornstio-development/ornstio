import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil, auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  color = Color.FromHex(randomColor());
  subject = new BehaviorSubject<Color>(this.color);
  destroy = new Subject<void>();

  label: string;

  constructor() { }

  ngOnInit() {
    this.subject.pipe(takeUntil(this.destroy), auditTime(5000)).subscribe((color) => {
      this.color = color;
    });
    var time = 0;
    setInterval(() => {
      var color = Color.FromHex(randomColor()) ;
      this.label = `Interval set color to: ${color.hex.toUpperCase()} at time ${++time}s`;
      this.subject.next(color);
    },1000)
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}