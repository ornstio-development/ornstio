import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { MenuItem } from '../models/menu-item';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  menuItems = [
    new MenuItem([''], 'Home', 'pi-home'),
    new MenuItem(['rxjs'], 'NG RxJS', 'pi-arrow-right', [
      new MenuItem(['rxjs','1'], 'Lesson 1: Elementary Observations',null),
      new MenuItem(['rxjs','2'], 'Lesson 2: Subject to Change',null),
      new MenuItem(['rxjs','3'], 'Lesson 3: Destruction Junction',null),
      new MenuItem(['rxjs','4'], 'Lesson 4: Hold Your Horses',null),
      new MenuItem(['rxjs','5'], 'Lesson 5: The Ol\' Ball and Chain',null),
      new MenuItem(['rxjs','6'], 'Lesson 6: Empty Nesters',null),
      new MenuItem(['rxjs','7'], 'Lesson 7: Drinking from the Fire Hose', null),
      new MenuItem(['rxjs','8'], 'Lesson 8: Come Together, Right Now', null),
      new MenuItem(['rxjs','9'], 'Lesson 9: Remember Who You Are', null),
      new MenuItem(['rxjs','10'], 'Lesson 10: An Important Distinction', null),
      new MenuItem(['rxjs','11'], 'Lesson 11: Ping. Ping. Ping.', null)
    ]),
    new MenuItem(['material'], 'NG Material', 'pi-arrow-right', [
      new MenuItem(['material','1'], 'Lesson 1: Custom/Chain Sorting',null)
    ])
  ];

  constructor(public router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
          this.menuItems.forEach((menuItem) => {
            menuItem.active = menuItem.route[0] == event.url.split('#')[0].split('/')[1];
            if(menuItem.children != null){
              menuItem.children.forEach((child) => {
                child.active = child.route[1] == event.url.split('#')[0].split('/')[2];
              });
            }
          })
      }
    })
  }
}
