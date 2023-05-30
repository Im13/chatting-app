import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { AuthGuard } from './_guards/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './_guards/admin.guard';
import { ContactsComponent } from './contacts/contacts.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'message', component: ChatboxComponent},
      { path: 'contacts', component: ContactsComponent},
      { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
