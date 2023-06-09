import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chatting application';

  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user : User = JSON.parse(localStorage.getItem('user'));
    if(user)
    {
      this.accountService.setCurrentUser(user);
      console.log('s');
    }
  }
}
