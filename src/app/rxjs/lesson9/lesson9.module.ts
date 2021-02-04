import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson9Component } from './lesson9.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { Example3Component } from './example3/example3.component';

@NgModule({
  declarations: [Lesson9Component, Example1Component, Example2Component, Example3Component],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '9', component: Lesson9Component }
    ])
  ], exports: [
    RouterModule
  ]
})
export class Lesson9Module { }
