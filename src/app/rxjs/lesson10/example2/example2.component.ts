import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Color } from 'src/app/models/color';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil, distinctUntilKeyChanged, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit, OnDestroy {

  color = Color.FromHex(randomColor());
  subject = new BehaviorSubject<Color>(this.color);
  destroy = new Subject<void>();

  subjectEmissions = 0;
  distinctSubjectEmissions = 0;
  distinctKeySubjectEmissions = 0;
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
    this.subject.pipe(takeUntil(this.destroy), distinctUntilKeyChanged('hue')).subscribe((color) => {
      this.label = 'New hue was emitted';
      this.color = color;
      this.distinctKeySubjectEmissions += 1;
    });
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

  change(color: Color){
    var nextColor = color == null ? new Color((this.subject.value.hue+10)%255, this.subject.value.saturation, this.subject.value.luminosity) : color;
    this.subject.next(nextColor);
  }

  nextColor(){
    var color = Color.FromHex(randomColor());
    color.hue = this.subject.value.hue;
    return color;
  }

}
