import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example2',
  templateUrl: './example2.component.html',
  styleUrls: ['./example2.component.scss']
})
export class Example2Component implements OnInit, OnDestroy {


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

    //Start listening to subject$
    this.subject$.pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.subjectColors.push(color);
        //If we haven't gotten to the end of our array, shout out the next color in the array
        if (this.colors[++subjectIndex]) {
          this.subject.next(this.colors[subjectIndex]);
        }
      });

    //I moved this line
    this.subject.next(this.colors[subjectIndex])

    var behaviorSubjectIndex = 0;
    //Tell anyone listening to behaviorSubject$ that they have a new value

    //Start listening to behaviorSubject$
    this.behaviorSubject$.pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        //Since this runs asynchronously, we're going to intentially 
        //slow it down by 50ms to ensure that we get expected results
        setTimeout(() => {
          this.behaviorSubjectColors.push(color);
          //If we haven't gotten to the end of our array, shout out the next color in the array
          if (this.colors[++behaviorSubjectIndex]) {
            this.behaviorSubject.next(this.colors[behaviorSubjectIndex]);
          }
        }, 50)
      });

    //I moved this line
    this.behaviorSubject.next(this.colors[behaviorSubjectIndex])
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
