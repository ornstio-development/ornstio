import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson1Component } from './lesson1.component';
import { Example1Component } from './example1/example1.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatSortModule } from '@angular/material';
@NgModule({
  declarations: [
    Lesson1Component,
    Example1Component,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '1', component: Lesson1Component }
    ]),
    MatTableModule,
    MatSortModule
  ],
  exports: [
    RouterModule
  ]
})
export class Lesson1Module { }
