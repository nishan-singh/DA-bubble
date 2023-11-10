import { Injectable } from '@angular/core';
import {
  Auth,
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(getAuth(), email, password);
  }
}
