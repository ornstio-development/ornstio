import { Component, OnInit, OnDestroy } from '@angular/core';
import { Example2Service } from '../example2.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-example2-2',
  templateUrl: './example2.2.component.html',
  styleUrls: ['./example2.2.component.scss']
})
export class Example2_2Component implements OnInit, OnDestroy {

  private destroy = new Subject<void>();
  color: string;

  constructor(private example2Service: Example2Service) { }

  ngOnInit() {
    this.example2Service.color$
      .pipe(takeUntil(this.destroy))
      .subscribe((color) => {
        this.color = color;
      })
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
