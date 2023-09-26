import { Component } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  toggleChannels = false;
  toggleDirectMessages = false;
  channelsList: any;
  channels: any[] = [];

  constructor(private firestore: Firestore) {}

  closeSidebar() {
    document.getElementById('sidebar')?.classList.toggle('sidebar-toggle');
  }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user: any) => {
      if (user) {
        const userDoc = doc(this.firestore, 'channelsList', user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          this.channelsList = userSnapshot.data();
        }
      }
    });
  }
}
