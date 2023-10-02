import { Component, inject } from '@angular/core';
import {
  getFirestore,
  Firestore,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  collectionData,
} from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  toggleChannels = true;
  toggleDirectMessages = false;
  channels: any[] | undefined;

  constructor(private firestore: Firestore) {}

  closeSidebar() {
    document.getElementById('sidebar')?.classList.toggle('sidebar-toggle');
  }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        this.getChannelsData(user);
      }
    });
  }

  async getChannelsData(user: { uid: string }) {
    const userDoc = doc(this.firestore, 'users', user.uid);
    const userSnapshot = await getDocs(collection(userDoc, 'channels'));
    this.channels = userSnapshot.docs.map((doc) => {
      return {
        uid: doc.id,
        ...doc.data(),
      };
    });
  }
}
