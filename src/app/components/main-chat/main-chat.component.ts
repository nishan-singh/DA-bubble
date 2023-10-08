import { Component, Input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss'],
})
export class MainChatComponent {
  @Input() id: string = '';

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // console.log(this.id);
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      console.log(this.id);
      this.router.navigate([this.id]);
    });
    // console.log(this.route.snapshot.paramMap.get('id'));
  }
}
