import { Component, OnInit } from '@angular/core';
import * as hljs from 'highlight.js';

@Component({
  selector: 'app-lesson1',
  templateUrl: './lesson1.component.html',
  styleUrls: ['./lesson1.component.scss']
})
export class Lesson1Component implements OnInit {

  materialTableCode = hljs.highlightAuto(`
    <!-- matSort applied here -->
    <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
      <ng-container matColumnDef="position">
        <th mat-header-cell *matHeaderCellDef mat-sort-header> No. </th>
        <td mat-cell *matCellDef="let element"> {{element.position}} </td>
      </ng-container>

      <!-- ... -->
    
    </table>
  `).value;

  ornstioTableCode = hljs.highlightAuto(`
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

      <ng-container *ngFor="let column of displayedColumns; let i = index;">
        <ng-container [matColumnDef]="column">
          <!-- matSort applied here -->
          <th mat-header-cell *matHeaderCellDef matSort [mat-sort-header]="column"
            (click)="dataSourceSubject.next(dataSource)">{{column}}</th>
          <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
        </ng-container>
      </ng-container>

      <!-- ... -->
    </table>
  `).value;

  constructor() { }

  ngOnInit() {
  }

}
