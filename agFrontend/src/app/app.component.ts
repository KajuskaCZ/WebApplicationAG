import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './users/model/user';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Role } from './users/model/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ag';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

get isAdmin() {
  return this.currentUser && this.currentUser.role === Role.Admin;
}

logout() {
  this.authenticationService.logout();
  this.router.navigate(['/login']);
}

}
