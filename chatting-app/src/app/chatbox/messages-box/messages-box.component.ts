import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.css']
})
export class MessagesBoxComponent implements OnInit {
  //Username and photoUrl of target member to send message
  username = 'ines';
  photoUrl = 'https://randomuser.me/api/portraits/women/19.jpg';

  user : User = JSON.parse(localStorage.getItem('user'));
  messages: Message[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    if(this.username) {
      this.messageService.getMessageThread(this.username).subscribe({
        next: messages => {
          this.messages = messages;
        }
      });
    }
  }
}
