import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {


  private destroy: Subject<void> = new Subject<void>();
  private colors = [
    'red',
    'blue',
    'green'
  ];
  private subject: Subject<string> = new Subject<string>();
  private subject$: Observable<string> = this.subject.asObservable();
  private behaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private behaviorSubject$: Observable<string> = this.behaviorSubject.asObservable();

  subjectColors: string[] = [];
  behaviorSubjectColors: string[] = [];

  constructor() { }

  ngOnInit() {
    var subjectIndex = 0;
    //Tell anyone listening to subject$ that they have a new value
    this.subject.next(this.colors[subjectIndex])
    //Start listening to subject$
    this.subject$.pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.subjectColors.push(color);
        //If we haven't gotten to the end of our array, shout out the next color in the array
        if (this.colors[++subjectIndex]) {
          this.subject.next(this.colors[subjectIndex]);
        }
      });

    var behaviorSubjectIndex = 0;
    //Tell anyone listening to behaviorSubject$ that they have a new value
    this.behaviorSubject.next(this.colors[behaviorSubjectIndex])
    //Start listening to behaviorSubject$
    this.behaviorSubject$.pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.behaviorSubjectColors.push(color);
        //If we haven't gotten to the end of our array, shout out the next color in the array
        if (this.colors[++behaviorSubjectIndex]) {
          this.behaviorSubject.next(this.colors[behaviorSubjectIndex]);
        }
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
