import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson1Component } from './lesson1.component';
import { Example1Component } from './example1/example1.component';
import { Example2_1Component } from './example2/example2.1/example2.1.component';
import { Example2_2Component } from './example2/example2.2/example2.2.component';
import { Example2Service } from './example2/example2.service';
import { CoreModule } from 'src/app/core/core.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    Lesson1Component,
    Example1Component,
    Example2_1Component,
    Example2_2Component,
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild([
      { path: '1', component: Lesson1Component }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    Example2Service
  ],
})
export class Lesson1Module { }
