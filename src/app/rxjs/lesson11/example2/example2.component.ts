import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil, bufferTime } from 'rxjs/operators';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit, OnDestroy {

  colors: Color[];
  subject = new Subject<Color>();
  destroy = new Subject<void>();

  label: string;

  constructor() { }

  ngOnInit() {
    this.subject.pipe(takeUntil(this.destroy), bufferTime(5000)).subscribe((colors) => {
      this.colors = colors;
    });
    var time = 0;
    setInterval(() => {
      var color = Color.FromHex(randomColor()) ;
      this.label = `Interval set color to: ${color.hex.toUpperCase()} at time ${time+=0.5}s`;
      this.subject.next(color);
    },500)
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
