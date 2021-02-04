import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  color = Color.FromHex(randomColor());
  subject = new BehaviorSubject<Color>(this.color);
  destroy = new Subject<void>();

  subjectEmissions = 0;
  distinctSubjectEmissions = 0;
  label: string;

  constructor() { }

  ngOnInit() {
    this.subject.pipe(takeUntil(this.destroy)).subscribe((color) => {
      this.label = 'Same color was emitted';
      this.color = color;
      this.subjectEmissions += 1;
    });
    this.subject.pipe(takeUntil(this.destroy), distinctUntilChanged()).subscribe((color) => {
      this.label = 'New color was emitted';
      this.color = color;
      this.distinctSubjectEmissions += 1;
    });
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  change(color: Color){
    this.subject.next(color == null ? Color.FromHex(randomColor()) : color);
  }

}
