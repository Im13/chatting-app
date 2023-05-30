import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.css']
})
export class MessagesBoxComponent implements OnInit, OnDestroy {
  @Input() username: string;
  @Input() photoUrl: string;

  user : User = JSON.parse(localStorage.getItem('user'));
  messages: Message[] = [];

  constructor(public messageService: MessageService) { }

  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }

  ngOnInit(): void {
    if(this.user)
      this.messageService.createHubConnection(this.user, this.username);
    else
      this.messageService.stopHubConnection();
  }
}
