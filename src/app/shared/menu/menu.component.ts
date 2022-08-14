import { Component } from '@angular/core';

interface MenuItem {
  route: string
  name: string
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class MenuComponent {

  menuItem: MenuItem[] = [
    {
      route: '/maps/fullscreen',
      name: 'Full Screen'
    },
    {
      route: '/maps/zoom-range',
      name: 'Zoom Range'
    },
    {
      route: '/maps/markers',
      name: 'Markers'
    },
    {
      route: '/maps/properties',
      name: 'Properties'
    },
  ];

}
