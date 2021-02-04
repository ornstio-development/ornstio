import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson5Component } from './lesson5.component';
import { Example1Component } from './example1/example1.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';

@NgModule({
  declarations: [Lesson5Component, Example1Component, Example2Component, Example3Component],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '5', component: Lesson5Component }
    ])
  ], exports: [
    RouterModule
  ]
})
export class Lesson5Module { }
