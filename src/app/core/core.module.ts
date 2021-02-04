import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { TabViewModule } from 'primeng/tabview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LessonFooterComponent } from './lesson-footer/lesson-footer.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';
import { DisqusModule } from "ngx-disqus";

@NgModule({
  declarations: [
    CodeSnippetComponent,
    LessonFooterComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    PanelModule,
    ButtonModule,
    ScrollPanelModule,
    TabViewModule,
    ClipboardModule,
    FormsModule,
    DisqusModule.forRoot('ornstio')
  ],
  exports: [
    CommonModule,
    CodeSnippetComponent,
    LessonFooterComponent,
    CardModule,
    PanelModule,
    ButtonModule,
    ScrollPanelModule,
    TabViewModule,
    ClipboardModule,
    FormsModule
  ]
})
export class CoreModule { }
