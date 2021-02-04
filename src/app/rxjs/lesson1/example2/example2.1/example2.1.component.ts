import { Component, OnInit } from '@angular/core';
import { Example2Service } from '../example2.service';
import { randomColor } from 'src/app/functions/randomColor';

@Component({
  selector: 'app-example2-1',
  templateUrl: './example2.1.component.html',
  styleUrls: ['./example2.1.component.scss']
})
export class Example2_1Component implements OnInit {

  constructor(private example2Service: Example2Service) { }

  ngOnInit() {
  }

  next(){
    this.example2Service.next(randomColor());
  }
}
