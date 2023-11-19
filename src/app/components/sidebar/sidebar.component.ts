import { Component } from '@angular/core';
import { Firestore, getDocs, collection } from '@angular/fire/firestore';
import { VariableUtilityService } from 'src/app/services/variable-utility.service';
import { AuthService } from 'src/app/firebase-services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  toggleSidebar = false;
  toggleChannels = true;
  toggleDirectMessages = false;
  channels: any[] | undefined;

  constructor(
    private firestore: Firestore,
    private globalVariables: VariableUtilityService,
    private auth: AuthService
  ) {}

  ngAfterViewInit() {
    this.auth.getAuthState(this.getChannelsData.bind(this));
  }

  closeSidebar() {
    this.toggleSidebar = !this.toggleSidebar;
    document.getElementById('sidebar')?.classList.toggle('sidebar-toggle');
    this.globalVariables.trackSidebar = this.toggleSidebar;
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
