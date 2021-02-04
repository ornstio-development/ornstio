import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, takeWhile } from 'rxjs/operators';
import { partition } from 'src/app/functions/partition';

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.scss']
})
export class Example3Component implements OnInit {
  public get step(): number { return 10; }
  partitions: Color[][] = [];

  colorsSubject: BehaviorSubject<{ step: number, colors: Color[] }> = new BehaviorSubject<{ step: number, colors: Color[] }>({
    step: 1,
    colors: new Array(50)
      .fill(null, 0, 50)
      .map(() => {
        return Color.FromRgb(Math.random() * 1000 % 255, Math.random() * 1000 % 255, Math.random() * 1000 % 255);
      })
  });
  colors$ = this.colorsSubject.asObservable();
  private destroy = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.colors$
      .pipe(takeUntil(this.destroy))
      .pipe(takeWhile((colorStep) => {
        return colorStep.colors.length > 0;
      }))
      .subscribe((colorStep) => {
        var parts = partition(colorStep.colors, (color: Color) => {
          return color.luminosity < colorStep.step * this.step;
        })
        this.partitions.push(parts[0].sort((a, b) => {
          return a.luminosity < b.luminosity ? -1 : 1;
        }));
        this.colorsSubject.next({ step: ++colorStep.step, colors: parts[1] });
      })
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
