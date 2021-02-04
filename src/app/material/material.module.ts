import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material.component';
import { MaterialRoutingModule } from './material-routing.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { Lesson1Module } from './lesson1/lesson1.module';

@NgModule({
  declarations: [MaterialComponent],
  imports: [
    CommonModule,
    CoreModule,
    MaterialRoutingModule,
    Lesson1Module
  ], exports: [
    RouterModule
  ]
})
export class MaterialModule { }
