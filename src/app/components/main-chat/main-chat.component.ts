import { Component } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    private router: Router
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
  }

  showChannelComp(channelId: string) {
    this.router.navigate([channelId]);
  }

  getMessages(channelId: string): void {
    const channelRef = collection(this.firestore, 'chatRooms');
    const docSnap = getDocs(channelRef);
    docSnap.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data);
        return (this.messages$ = {
          id: doc.id,
          ...doc.data(),
        });
      });
    });
  }
}
