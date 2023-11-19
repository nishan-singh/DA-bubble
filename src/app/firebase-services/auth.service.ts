import { Injectable } from '@angular/core';
import {
  User,
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

  getAuthState(getChannels: () => void): void {
    onAuthStateChanged(getAuth(), (user: User | null) => {
      if (user) {
        getChannels();
        return user;
      } else {
        return null;
      }
    });
  }
}
