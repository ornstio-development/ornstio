import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, from, BehaviorSubject } from 'rxjs';
import { combineAll, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example3',
  templateUrl: './example3.component.html',
  styleUrls: ['./example3.component.scss']
})
export class Example3Component implements OnInit, OnDestroy {

  destroy = new Subject<void>();
  subjects = Array(16).fill(null,0,16)
    .map(() => {
      return new BehaviorSubject<number>(1)
    });
  numbers = [];
  constructor() { }

  ngOnInit() {
    from(this.subjects.map((s) => {
      return s.pipe(takeUntil(this.destroy))
    }))
    .pipe(combineAll(this.sum))
    .pipe(takeUntil(this.destroy))
    .subscribe((numbers) => {
      this.numbers = numbers;
    });
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  increment(i:number){
    this.subjects[i].next(this.subjects[i].value+1);
  }

  sum(...numbers: number[]){
    for(var i = 1; i < numbers.length; i++){
      numbers[i] += numbers.slice(0,i).reduce((val,total) => { return val + total; })
    }
    return numbers;
  }
}
