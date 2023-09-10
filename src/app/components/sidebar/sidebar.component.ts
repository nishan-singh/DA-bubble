import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  closeSidebar() {
    document.getElementById('sidebar')?.classList.toggle('sidebar-toggle');
  }
}
