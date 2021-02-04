import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'src/app/models/menu-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem;

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
