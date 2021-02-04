import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson2Component } from './lesson2.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';

@NgModule({
  declarations: [
    Lesson2Component,
    Example1Component,
    Example2Component,
    Example3Component
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '2', component: Lesson2Component }
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class Lesson2Module { }
