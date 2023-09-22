import { Component } from '@angular/core';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  togglePopUp = true;
  userInfosPopUp = false;
  editUserInfosPopUp = false;

  signOut() {
    const auth = getAuth();
    auth.signOut();
  }
}
