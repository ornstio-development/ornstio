import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  destroy = new Subject<void>();
  subjects = new Array(16).fill(null,0,16)
    .map(() => {
      return new BehaviorSubject<number>(0)
    });
  numbers = new Array(16);
  
  constructor() { }

  ngOnInit() {
    this.subjects.map((subject) => {
      return subject.pipe(takeUntil(this.destroy));
    }).forEach((observable,i) => {
      observable.subscribe((n) => {
        this.numbers[i] = n;
      });
    })
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  increment(i:number){
    this.subjects[i].next(this.subjects[i].value+1);
  }
}
