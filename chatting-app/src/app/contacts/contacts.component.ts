import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  photoUrl = 'https://randomuser.me/api/portraits/women/19.jpg';

  constructor() { }

  ngOnInit(): void {
  }

}
