import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lesson1Module } from './lesson1/lesson1.module';
import { CoreModule } from '../core/core.module';
import { RouterModule } from '@angular/router';
import { RxjsComponent } from './rxjs.component';
import { Lesson2Module } from './lesson2/lesson2.module';
import { Lesson3Module } from './lesson3/lesson3.module';
import { Lesson4Module } from './lesson4/lesson4.module';
import { RxjsRoutingModule } from './rxjs-routing.module';
import { Lesson5Module } from './lesson5/lesson5.module';
import { Lesson6Module } from './lesson6/lesson6.module';
import { Lesson7Module } from './lesson7/lesson7.module';
import { Lesson8Module } from './lesson8/lesson8.module';
import { Lesson9Module } from './lesson9/lesson9.module';
import { Lesson10Module } from './lesson10/lesson10.module';
import { Lesson11Module } from './lesson11/lesson11.module';

@NgModule({
  declarations: [
    RxjsComponent
  ],
  imports: [
    CoreModule,
    RxjsRoutingModule,
    CommonModule,
    Lesson1Module,
    Lesson2Module,
    Lesson3Module,
    Lesson4Module,
    Lesson5Module,
    Lesson6Module,
    Lesson7Module,
    Lesson8Module,
    Lesson9Module,
    Lesson10Module,
    Lesson11Module
  ], exports: [RouterModule]
})
export class RxJSModule { }
