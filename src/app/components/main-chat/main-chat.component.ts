import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VariableUtilityService } from '../../services/variable-utility.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent {
  messages$: any;
  routeSub: Subscription | undefined;

  constructor(
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public globalVariables: VariableUtilityService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.paramMap.subscribe((params) => {
      const channelIdUnique = params.get('id') || '';
      const channelId = 'channel/' + channelIdUnique;
      this.getMessages(channelId);
      this.showChannelComp(channelId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
    this.messages$.unsubscribe();
  }

  showChannelComp(channelId: string) {
    this.router.navigate([channelId]);
  }

  async getMessages(channelId: string) {
    const channelsRef = collection(this.firestore, 'chats');
    //const chatQuery = query(channelsRef, where('message', '==', 'Hi there!'));
    //const channelsSnapshot = await getDocs(chatQuery);
    const channelsSnapshot = await getDocs(channelsRef);
    console.log(channelsSnapshot);
    // q: how to get the uid of chatRooms?
    this.messages$ = channelsSnapshot.docs.map((doc) => {
      return {
        //id: doc.id,
        ...doc.data(),
      };
    });
  }
}
