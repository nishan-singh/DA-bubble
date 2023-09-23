import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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

  constructor(private router: Router, private fm: FormBuilder) {
    setTimeout(() => {
      this.animationState = false;
    }, 750);
  }

  signIn() {
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      this.registerForm.value.email || '',
      this.registerForm.value.password || ''
    )
      .then((userCredential) => {
        // Signed in
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    this.isSubmitted = true;
  }

  guestLogin() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, 'guest@gmail.com', 'Password12345')
      .then((userCredential) => {
        // Signed in
        this.router.navigate(['/']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
