import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson11Component } from './lesson11.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';

@NgModule({
  declarations: [Lesson11Component, Example1Component, Example2Component],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '11', component: Lesson11Component }
    ])
  ], exports: [
    RouterModule
  ]
})
export class Lesson11Module { }
