import { Component, DoCheck, OnInit } from '@angular/core';
import { HandleNavBarService } from '../../../user/services/handle-nav-bar.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, DoCheck {
  isUserLogged: boolean = false;
  isUserAdmin: boolean = AuthService.isAdmin();

  constructor(
    private handleNavBarService: HandleNavBarService,
    private authService: AuthService
  ) {}
  ngDoCheck(): void {
    // console.log(this.isUserAdmin);
  }
  ngOnInit(): void {
    // this.isUserLogged=this.handleNavBarService.isUserLogged();          //not updated always due to the changes in the userLogin component
    this.authService.isAuthenticated$.subscribe((adminAuth) => {
      this.isUserAdmin = adminAuth;
    });
    this.handleNavBarService.getLoggedStatus().subscribe((status) => {
      //updated always due to the changes in the userLogin component

      if (sessionStorage.getItem('token')) {
        this.isUserLogged = true;
      } else {
        this.isUserLogged = status;
      }
    });
  }
}
