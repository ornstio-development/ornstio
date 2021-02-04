import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, of } from 'rxjs';
import { Color } from 'src/app/models/color';
import { map, delay, flatMap, takeUntil, first } from 'rxjs/operators';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit, OnDestroy {

  red: Color;
  red$ = of(null)
    .pipe(
      map(() => {
        return Color.FromRgb(150, 0, 0);
      })
    );
  green: Color;
  green$ = of(null)
    .pipe(delay(2500))
    .pipe(
      map(() => {
        return Color.FromRgb(0, 50, 0);
      })
    );
  blue: Color;
  blue$ = of(null)
    .pipe(delay(2500))
    .pipe(
      map(() => {
        return Color.FromRgb(0, 0, 150);
      })
    );

  color: Color;

  private destroy = new Subject<void>();

  constructor() { }

  ngOnInit() { }

  begin() {
    this.red$
      .pipe(takeUntil(this.destroy))
      .pipe(
        flatMap((red) => {
          this.red = red;
          return this.green$;
        }, (red, green) => {
          var redGreen = Color.FromRgb(red.rgb[0], green.rgb[1], 0);
          this.green = redGreen;
          return redGreen;
        })
      ).pipe(
        flatMap((redGreen) => {
          return this.blue$;
        }, (redGreen, blue) => {
          var redGreenBlue = Color.FromRgb(redGreen.rgb[0], redGreen.rgb[1], blue.rgb[2]);
          this.blue = redGreenBlue;
          return redGreenBlue;
        })
      ).pipe(first())
      .subscribe((redGreenBlue) => {
        this.color = redGreenBlue;
      })
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
