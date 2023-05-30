import { Component, Input, OnInit } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { Member } from 'src/app/_models/member';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  xMark = faXmark;
  minus = faMinus;
  @Input() member: Member;

  constructor(public presenceService: PresenceService) { }

  ngOnInit(): void {
  }

}
