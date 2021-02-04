import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson3Component } from './lesson3.component';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';
import { Example1Component } from './example1/example1.component';

@NgModule({
  declarations: [Lesson3Component, Example1Component],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '3', component: Lesson3Component }
    ])
  ],
  exports:[
    RouterModule
  ]
})
export class Lesson3Module { }
