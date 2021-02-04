import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson7Component } from './lesson7.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';

@NgModule({
  declarations: [Lesson7Component, Example1Component, Example2Component],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '7', component: Lesson7Component }
    ])
  ], exports: [
    RouterModule
  ]
})
export class Lesson7Module { }
