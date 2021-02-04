import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil, pairwise } from 'rxjs/operators';


@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit, OnDestroy {

  private subject = new BehaviorSubject<Color>(null);
  private destroy = new Subject<void>();
  private color$ = this.subject.asObservable();
  color: Color;
  previousColor: Color;

  constructor() { }

  ngOnInit() {
    this.color$.pipe(pairwise(),takeUntil(this.destroy))
      .subscribe((colors) => {
        this.previousColor = colors[0];
        this.color = colors[1];
      })
    this.subject.next(Color.FromHex(randomColor()));
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  next(){
    this.subject.next(Color.FromHex(randomColor()));
  }

}
