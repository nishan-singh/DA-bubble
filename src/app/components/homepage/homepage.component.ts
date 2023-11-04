import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  checkForFullWidth: any;

  constructor(private router: Router) {
    // this.timeInterval();
  }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.router.navigate(['/sign-in']);
      }
    });
  }

  checkIfSidebarClosed($event: boolean) {
    console.log($event);
  }
}
