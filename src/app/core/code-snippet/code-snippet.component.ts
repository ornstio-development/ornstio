import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import * as hljs from 'highlight.js';
import { forkJoin, of, Subject } from 'rxjs';
import { catchError, first, map, takeUntil } from 'rxjs/operators';
import { FileType } from 'src/app/enums/fileType';
import { LessonType } from 'src/app/enums/lesson-type';

@Component({
  selector: 'app-code-snippet',
  templateUrl: './code-snippet.component.html',
  styleUrls: ['./code-snippet.component.scss']
})
export class CodeSnippetComponent implements OnInit, OnDestroy {

  @ViewChild('ts') tsHost: ElementRef;
  @ViewChild('scss') scssHost: ElementRef;
  @ViewChild('html') htmlHost: ElementRef;
  @Input() lessonType: LessonType;
  @Input() lesson: number;
  @Input() subLesson: number
  @Input() example: number;
  @Input() fileType: FileType;
  loaded: boolean = false;
  @Input() ts: boolean = false;
  @Input() html: boolean = false;
  @Input() scss: boolean = false;
  private destroy: Subject<void> = new Subject<void>();

  rawTs: string;
  rawHtml: string;
  rawScss: string;

  constructor(private http: Http) { }

  ngOnInit() {
    var observables = [
      { extension: 'ts', enabled: this.ts },
      { extension: 'scss', enabled: this.scss },
      { extension: 'html', enabled: this.html }
    ].map((extension) => {
      return extension.enabled ? this.http.get(`https://raw.githubusercontent.com/ornstio-development/ornstio/master/src/app/${this.lessonType}/lesson${this.lesson}/example${this.example}${this.subLesson ? `/example${this.example}.${this.subLesson}` : ''}/example${this.example}${this.subLesson ? `.${this.subLesson}` : ''}.${this.fileType}.${extension.extension}`)
      .pipe(first())
      .pipe(map((response) => {
        return response.text();
      }))
      .pipe(catchError(() => {
        return of('');
      })) : of(null);
    });
    forkJoin(observables)
      .pipe(takeUntil(this.destroy))
      .subscribe((results) => {
        this.rawTs = results[0];
        this.rawScss = results[1];
        this.rawHtml = results[2];
        this.loaded = true;
        requestAnimationFrame(() => {
          if (this.ts)
            this.tsHost.nativeElement.innerHTML = hljs.highlightAuto(results[0]).value;
          if (this.scss)
            this.scssHost.nativeElement.innerHTML = hljs.highlightAuto(results[1]).value;
          if (this.html) {
            this.htmlHost.nativeElement.innerHTML = hljs.highlightAuto(results[2]).value;
          }
        });
      })
  }
  ngOnDestroy() {
    this.tsHost = null;
    this.scssHost = null;
    this.htmlHost = null;
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
