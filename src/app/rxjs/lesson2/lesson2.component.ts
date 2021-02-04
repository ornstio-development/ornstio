import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson2',
  templateUrl: './lesson2.component.html',
  styleUrls: ['./lesson2.component.scss']
})
export class Lesson2Component implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
