import { Component, OnInit, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { repeat, take, first } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { ISandbox } from './services/isandbox.interface';

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.scss']
})
export class SandboxComponent implements OnInit {

  title:string = 'No Service Loaded';

  constructor(private route: ActivatedRoute, private injector: Injector) {
  }

  ngOnInit() {
    this.route.data.pipe(first()).subscribe((data) => {
      let serviceName = data['service'];
      if(serviceName){
        this.title = this.injector.get<ISandbox>(serviceName).foo();
      }
    })
  }

}


