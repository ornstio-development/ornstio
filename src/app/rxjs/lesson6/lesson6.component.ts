import { Component, OnInit } from '@angular/core';
import * as hljs from 'highlight.js';

@Component({
  selector: 'app-lesson6',
  templateUrl: './lesson6.component.html',
  styleUrls: ['./lesson6.component.scss']
})
export class Lesson6Component implements OnInit {

  nestedCode: string = hljs.highlightAuto(`
    observable1$.subscribe((value1) => {
      //do something
      observable2$.subscribe((value2) => {
        //do something else
        observable3$.subscribe((value3) => {
          //do something else else
        })
      })
    })
  `).value;

  constructor() { }

  ngOnInit() {
  }

}
