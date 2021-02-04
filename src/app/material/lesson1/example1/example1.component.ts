import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { firstBy } from 'thenby';
import { Color } from 'src/app/models/color';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  @ViewChildren(MatSort) sorts: QueryList<MatSort>;
  displayedColumns: string[] = ['hue', 'saturation', 'luminosity', 'hex'];

  hues = new Array(5)
    .fill(0, 0, 5)
    .map(() => {
      return Math.floor(Math.random() * 1000 % 256);
    })

  saturations = new Array(5)
    .fill(0, 0, 5)
    .map(() => {
      return Math.floor(Math.random() * 1000 % 100);
    })

  luminosities = new Array(5)
    .fill(0, 0, 5)
    .map(() => {
      return Math.floor(Math.random() * 1000 % 100);
    })

  dataSource: Color[] = new Array(25)
    .fill(null, 0, 25)
    .map(() => {
      return new Color(
        this.hues[Math.floor(Math.random() * 1000 % this.hues.length)],
        this.saturations[Math.floor(Math.random() * 1000 % this.saturations.length)],
        this.luminosities[Math.floor(Math.random() * 1000 % this.luminosities.length)]
      )
    })

  dataSourceSubject = new BehaviorSubject<Color[]>(this.dataSource);
  dataSource$ = this.dataSourceSubject.asObservable();
  private destroy = new Subject<void>();
  constructor() { }

  ngOnInit() {
    this.dataSource$
      .pipe(takeUntil(this.destroy))
      .subscribe((dataSource) => {
        if (this.sorts) {
          var sortArray = this.sorts.toArray()
          var sortBy: IThenBy<Color> = null;
          sortArray.filter((sort) => {
            return sort.direction == 'asc' || sort.direction == 'desc';
          }).forEach((sort, i) => {
            if (i == 0) {
              sortBy = firstBy((a, b) => {
                return this.sortBy(sort.active, a, b);
              }, this.sortDirection(sort));
            } else {
              sortBy = sortBy.thenBy((a, b) => {
                return this.sortBy(sort.active, a, b);
              }, this.sortDirection(sort))
            }
          });
          if (sortBy != null)
            dataSource = dataSource.sort(sortBy);
        }
        this.dataSource = dataSource.slice();
      });
  }

  sortDirection(sort: MatSort) {
    switch (sort.direction) {
      case 'asc': return 1;
      case 'desc': return -1;
      default: return 0;
    }
  }

  sortBy(property: string, a: Color, b: Color) {
    if (typeof (a[property]) == 'string' && typeof (b[property]) == 'string') {
      return this.stringSort(a[property], b[property]);
    }
    else if (typeof (a[property]) == 'number' && typeof (b[property]) == 'number') {
      return this.numericSort(a[property], b[property]);
    }
    else if (typeof (a[property]) == 'boolean' && typeof (b[property]) == 'boolean') {
      return this.numericSort(+a[property], +b[property]);
    }
    else if (a[property] instanceof Date && b[property] instanceof Date) {
      return this.dateSort(a[property], b[property]);
    } else {
      return 0;
    }
  }

  stringSort(a: string, b: string) {
    var a_property: string = a == null ? '' : a;
    var b_property: string = b == null ? '' : b;
    return new Intl.Collator().compare(a_property, b_property);
  }

  numericSort(a: number, b: number) {
    var a_property = isNaN(a) ? -Math.pow(2, 31) : a;
    var b_property = isNaN(b) ? -Math.pow(2, 31) : b;
    return a_property < b_property ? -1 :
      (a_property > b_property) ? 1 : 0;
  }

  dateSort(a: Date, b: Date) {
    var a_property: Date = a == null ? new Date() : a;
    var b_property: Date = b == null ? new Date() : b;
    return a_property < b_property ? -1 :
      (a_property > b_property) ? 1 : 0;
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
