import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flyInOutLeft } from './animations/flyInOut';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    flyInOutLeft
  ]
})
export class AppComponent implements OnInit {

  menuOpen: boolean = true;

  constructor(public router: Router) { }

  ngOnInit() { }
}
