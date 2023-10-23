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

  closeSidebar() {
    document.getElementById('sidebar')?.classList.toggle('sidebar-toggle');
    this.toggleSidebar = !this.toggleSidebar;
    return this.closedSidebar.emit(this.toggleSidebar);
  }

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.getChannelsData();
      }
    });
  }

  async getChannelsData() {
    const channelsRef = collection(this.firestore, 'chatRooms');
    const channelsSnapshot = await getDocs(channelsRef);
    // q: how to get the uid of chatRooms?
    this.channels = channelsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
  }
}
