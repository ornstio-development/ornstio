import { Component, OnInit } from '@angular/core';
import * as hljs from 'highlight.js';
@Component({
  selector: 'app-lesson3',
  templateUrl: './lesson3.component.html',
  styleUrls: ['./lesson3.component.scss']
})
export class Lesson3Component implements OnInit {

  takeUntilCode: string = hljs.highlightAuto(`
    this.observable$.pipe(takeUntil(this.destroy))
  `).value;

  onDestroyCode: string = hljs.highlightAuto(`
    ngOnDestroy() {
      this.destroy.next();
      this.destroy.unsubscribe();
    }
  `).value;

  constructor() { }

  ngOnInit() {
  }

}
