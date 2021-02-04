import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { randomColor } from 'src/app/functions/randomColor';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit, OnDestroy {

  color: string;
  seizureEnabled: boolean = false;

  private subject: BehaviorSubject<string> = new BehaviorSubject<string>(randomColor());
  private observable$: Observable<string> = this.subject.asObservable();
  private destroy: Subject<void> = new Subject<void>();
  constructor() { }

  ngOnInit() {
    this.observable$
      .pipe(takeUntil(this.destroy)).subscribe((color) => {
      if(this.seizureEnabled)
        this.color = color;
      setTimeout(() => { this.subject.next(randomColor()) });
    })
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
