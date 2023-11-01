import { Component, EventEmitter, Output } from '@angular/core';
import { Firestore, getDocs, collection } from '@angular/fire/firestore';
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

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.getChannelsData();
      }
    });
  }

  closeSidebar() {
    document.getElementById('sidebar')?.classList.toggle('sidebar-toggle');
    this.toggleSidebar = !this.toggleSidebar;
    this.closedSidebar.emit(this.toggleSidebar);
  }

  async getChannelsData() {
    const channelsRef = collection(this.firestore, 'chatRooms');
    const channelsSnapshot = await getDocs(channelsRef);
    this.channels = channelsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }
}
