import { Component } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent {
  constructor(
    private firestore: Firestore,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const channelIdUnique = params.get('id') || '';
      const channelId = 'channel/' + channelIdUnique;
      this.router.navigate([channelId]);
      let chatHistory = collection(this.firestore, 'chats', channelIdUnique);
      const getSnapshot = collectionData(chatHistory);
      getSnapshot.subscribe((data) => console.log(data));
    });
  }
}
