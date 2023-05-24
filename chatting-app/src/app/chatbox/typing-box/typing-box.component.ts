import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-typing-box',
  templateUrl: './typing-box.component.html',
  styleUrls: ['./typing-box.component.css']
})
export class TypingBoxComponent implements OnInit {
  username = 'ines';
  sendIcon = faPaperPlane;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit(frm: NgForm) {
    var content : string = frm.value.content;

    if(content.trim() != '') {
      this.messageService.sendMessage(this.username, content).subscribe({
        next: message => {
          console.log(message);
          frm.reset();
        }
      });
    }
  }
}
