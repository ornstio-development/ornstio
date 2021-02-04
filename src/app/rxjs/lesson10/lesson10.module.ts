import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson10Component } from './lesson10.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';

@NgModule({
  declarations: [Lesson10Component, Example1Component, Example2Component],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '10', component: Lesson10Component }
    ])
  ], exports: [
    RouterModule
  ]
})
export class Lesson10Module { }
