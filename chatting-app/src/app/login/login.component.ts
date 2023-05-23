import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private toastr: ToastrService, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    var formValue = form.value;

    if(formValue.username.trim() == '') {
      this.toastr.error("Please input username!");
      return;
    } 

    if(formValue.password.trim() == '') {
      this.toastr.error("Please input password");
      return;
    }

    this.model.username = formValue.username;
    this.model.password = formValue.password;

    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('message');
      }
    })
  }
}
