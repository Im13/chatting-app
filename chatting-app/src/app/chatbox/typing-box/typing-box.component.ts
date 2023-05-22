import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-typing-box',
  templateUrl: './typing-box.component.html',
  styleUrls: ['./typing-box.component.css']
})
export class TypingBoxComponent implements OnInit {
  sendIcon = faPaperPlane;

  constructor() { }

  ngOnInit(): void {
  }

}
