import { Component, OnInit, Input } from '@angular/core';
import { LessonType } from 'src/app/enums/lesson-type';

@Component({
  selector: 'app-lesson-footer',
  templateUrl: './lesson-footer.component.html',
  styleUrls: ['./lesson-footer.component.scss']
})
export class LessonFooterComponent implements OnInit {

  @Input() lessonType: LessonType;
  @Input() lesson: number;

  src: string;
  categoryId: string;
  pageId: string;
  constructor() { }

  ngOnInit() {
    this.src = `https://github.com/ornstio-development/ornstio/tree/master/src/app/${this.lessonType}/lesson${this.lesson}`;
    this.pageId = `${this.lessonType}_${this.lesson}`;
    this.categoryId = this.lessonType;
  }

}
