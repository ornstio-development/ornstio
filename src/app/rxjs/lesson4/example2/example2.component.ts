import { Component, OnInit, AfterViewInit } from '@angular/core';
import { randomColor } from 'src/app/functions/randomColor';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit, AfterViewInit {

  searchCriteria: string;
  colors = new Array<string>(500)
    .fill(null, 0, 500)
    .map(() => {
      return randomColor();
    });
  filteredColors = [...this.colors];

  private subject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.filteredColors);
  private observable$: Observable<string[]> = this.subject.asObservable();
  private destroy: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.observable$.pipe(takeUntil(this.destroy)).subscribe((colors) => {
      this.filteredColors = colors;
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
