import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  member: Member;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data['member'];
    })
  }

}
