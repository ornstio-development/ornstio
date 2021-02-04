import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson6Component } from './lesson6.component';
import { Example1Component } from './example1/example1.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { Example2Component } from './example2/example2.component';

@NgModule({
  declarations: [Lesson6Component, Example1Component, Example2Component],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '6', component: Lesson6Component }
    ])
  ], exports: [
    RouterModule
  ]
})
export class Lesson6Module { }