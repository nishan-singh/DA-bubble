import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/firebase-services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  animationState: boolean = true;
  registerForm = this.fm.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isSubmitted = false;
  errorMsg: string | undefined;

  constructor(
    private router: Router,
    private fm: FormBuilder,
    private authService: AuthService
  ) {
    setTimeout(() => {
      this.animationState = false;
    }, 750);
  }

  signIn() {
    if (this.registerForm.invalid) return;
    this.authService
      .signIn(
        this.registerForm.value.email || '',
        this.registerForm.value.password || ''
      )
      .then(() => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        this.errorMsg = errorMessage;
      });
    this.isSubmitted = true;
  }

  guestLogin() {
    this.authService.signIn('guest@gmail.com', 'Password12345').then(() => {
      this.router.navigate(['/']);
    });
  }
}
