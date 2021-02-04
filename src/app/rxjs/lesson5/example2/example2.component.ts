import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color } from 'src/app/models/color';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { partition } from '../../../functions/partition';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit, OnDestroy {

  colors: Color[]

  colorsSubject: BehaviorSubject<Color[]> = new BehaviorSubject<Color[]>(new Array(50)
    .fill(null, 0, 50)
    .map(() => {
      return Color.FromRgb(Math.random()*1000%255,Math.random()*1000%255,Math.random()*1000%255);
    }));
  colors$ = this.colorsSubject.asObservable();

  lights: Color[];
  lightsSubject: Subject<Color[]> = new Subject<Color[]>();
  lights$ = this.lightsSubject.asObservable();

  mediums: Color[];
  mediumsSubject: Subject<Color[]> = new Subject<Color[]>();
  mediums$ = this.mediumsSubject.asObservable();

  darks: Color[]
  darksSubject: Subject<Color[]> = new Subject<Color[]>();
  darks$ = this.darksSubject.asObservable();

  private destroy = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.darks$
      .pipe(takeUntil(this.destroy))
      .subscribe((colors) => {
        this.darks = colors;
      })

    this.mediums$
      .pipe(takeUntil(this.destroy))
      .subscribe((colors) => {
        var parts = partition(colors, (color: Color) => {
          return color.luminosity > 33;
        });
        this.mediums = parts[0];
        this.darksSubject.next(parts[1]);
      })

    this.lights$
      .pipe(takeUntil(this.destroy))
      .subscribe((colors) => {
        var parts = partition(colors, (color: Color) => {
          return color.luminosity > 66;
        });
        this.lights = parts[0];
        this.mediumsSubject.next(parts[1]);
      });

    this.colors$
      .pipe(takeUntil(this.destroy))
      .subscribe((colors) => {
        this.colors = colors;
        this.lightsSubject.next(colors);
      })
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
