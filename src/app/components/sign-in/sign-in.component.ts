import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  animationState: boolean = true;

  constructor() {
    setTimeout(() => {
      this.animationState = false;
    }, 1200);
  }
}
