import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserLogoutComponent } from './components/user-logout/user-logout.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [UserEditComponent,UserLoginComponent,UserLogoutComponent,UserRegisterComponent,UserProfileComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UserModule { }
