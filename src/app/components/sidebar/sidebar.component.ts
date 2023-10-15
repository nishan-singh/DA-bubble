import { Component, EventEmitter, Output } from '@angular/core';
import { Firestore, doc, getDocs, collection } from '@angular/fire/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Output() closedSidebar = new EventEmitter<boolean>();

  toggleSidebar = false;
  toggleChannels = true;
  toggleDirectMessages = false;
  channels: any[] | undefined;

  constructor(private firestore: Firestore) {}

  closeSidebar() {
    document.getElementById('sidebar')?.classList.toggle('sidebar-toggle');
    this.toggleSidebar = !this.toggleSidebar;
    return this.closedSidebar.emit(this.toggleSidebar);
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
