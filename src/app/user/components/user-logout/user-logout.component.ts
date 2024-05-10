import { Component } from '@angular/core';
import { HandleNavBarService } from '../../services/handle-nav-bar.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrl: './user-logout.component.css',
})
export class UserLogoutComponent {
  constructor(
    private handleNavBarService: HandleNavBarService,
    private router: Router,
    private authService: AuthService
  ) {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('role');
    this.handleNavBarService.isLoggedSubject.next(false);
    this.authService.setAuthenticationStatus(false);
    router.navigate(['']);
  }
}
