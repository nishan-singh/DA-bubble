import { Component } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent {
  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const userDoc = doc(this.firestore, 'channelsList', user.uid);
        const userSnapshot = await getDoc(userDoc);
        console.log(userSnapshot.data());
      }
    });
  }
}
