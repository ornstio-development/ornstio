import { Component, OnInit, AfterViewInit } from '@angular/core';
import { randomColor } from 'src/app/functions/randomColor';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.scss']
})
export class Example3Component implements OnInit, AfterViewInit {

  searchCriteria: string;
  colors = new Array<string>(1000)
    .fill(null, 0, 1000)
    .map(() => {
      return randomColor();
    });
  filteredColors = [...this.colors]

  private subject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.filteredColors);
  private observable$: Observable<string[]> = this.subject.asObservable();
  private destroy: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.observable$.pipe(takeUntil(this.destroy))
      .pipe(debounceTime(250))
      .subscribe((colors) => {
        requestAnimationFrame(() => { this.filteredColors = colors; });
      })
  }

  search(searchCriteria: string) {
    if (!searchCriteria.startsWith('#'))
      searchCriteria = `#${searchCriteria}`;
    this.subject.next(this.colors.filter((color) => {
      return color.toLowerCase().trim().startsWith(searchCriteria.toLowerCase().trim());
    }));
  }
}
