import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { randomColor } from 'src/app/functions/randomColor';

@Injectable({
  providedIn: 'root'
})
export class Example2Service {

  private behaviorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(randomColor());
  color$ = this.behaviorSubject.asObservable();
  
  constructor() { }

  next(color: string): void {
    this.behaviorSubject.next(color);
  }
}