import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/auth';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isLoggedIn: boolean = false
  isAdmin: boolean = false

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.isAdmin = this.auth.getRole() === "admin"

  }
  logout() {
    this.auth.loggeOut();

    this.isLoggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/'])
  }
}
